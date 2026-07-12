'use strict';

const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const { spawn } = require('node:child_process');

const rootDir = path.resolve(__dirname, '..');
const collectionDir = path.join(rootDir, 'bruno', 'server');
const reportsDir = path.join(rootDir, 'bruno', 'reports');
const port = Number(process.env.BRUNO_PORT || process.env.PORT || 3000);
const baseUrl = process.env.BRUNO_BASE_URL || `http://127.0.0.1:${port}`;
const externalServer = process.env.BRUNO_EXTERNAL_SERVER === 'true';
const isWindows = process.platform === 'win32';
const bruBin = path.join(rootDir, 'node_modules', '.bin', isWindows ? 'bru.cmd' : 'bru');

function waitFor(url, timeoutMs = 30_000) {
  const deadline = Date.now() + timeoutMs;

  return new Promise((resolve, reject) => {
    function attempt() {
      const req = http.get(url, (res) => {
        res.resume();
        if (res.statusCode && res.statusCode < 500) return resolve();
        retry();
      });

      req.on('error', retry);
      req.setTimeout(2_000, () => {
        req.destroy();
        retry();
      });
    }

    function retry() {
      if (Date.now() > deadline) {
        return reject(new Error(`Timed out waiting for ${url}`));
      }
      setTimeout(attempt, 500);
    }

    attempt();
  });
}

function run(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const spawnCommand =
      isWindows && command.endsWith('.cmd') ? process.env.ComSpec || 'cmd.exe' : command;
    const spawnArgs = isWindows && command.endsWith('.cmd') ? ['/d', '/c', command, ...args] : args;

    const child = spawn(spawnCommand, spawnArgs, {
      cwd: rootDir,
      stdio: 'inherit',
      shell: false,
      ...options,
    });

    child.on('error', reject);
    child.on('exit', (code) => {
      if (code === 0) return resolve();
      reject(new Error(`${command} ${args.join(' ')} exited with ${code}`));
    });
  });
}

async function main() {
  fs.mkdirSync(reportsDir, { recursive: true });

  let server;
  if (!externalServer) {
    server = spawn(process.execPath, ['index.js'], {
      cwd: rootDir,
      stdio: 'inherit',
      env: {
        ...process.env,
        PORT: String(port),
        NODE_ENV: process.env.NODE_ENV || 'test',
        JWT_SECRET: process.env.JWT_SECRET || 'bruno-test-secret',
      },
    });
  }

  try {
    await waitFor(`${baseUrl}/api-docs.json`);
    await run(
      bruBin,
      [
        'run',
        '--env-var',
        `baseUrl=${baseUrl}`,
        '--reporter-json',
        path.join(reportsDir, 'results.json'),
        '--reporter-junit',
        path.join(reportsDir, 'results.xml'),
      ],
      { cwd: collectionDir }
    );
  } finally {
    if (server && !server.killed) {
      server.kill('SIGTERM');
    }
  }
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
