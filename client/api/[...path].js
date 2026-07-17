/** Read request body into a Buffer. */
function readBody(req) {
  return new Promise(function (resolve, reject) {
    const chunks = [];
    req.on('data', function (chunk) {
      chunks.push(chunk);
    });
    req.on('end', function () {
      resolve(Buffer.concat(chunks));
    });
    req.on('error', reject);
  });
}

/** Resolve configured backend URL. */
function getBackendUrl() {
  const url = process.env.BACKEND_URL || process.env.API_URL || '';
  let cleanUrl = String(url);
  while (cleanUrl.endsWith('/')) cleanUrl = cleanUrl.slice(0, -1);
  return cleanUrl;
}

/** Proxy Vercel API request to backend. */
module.exports = async function handler(req, res) {
  const backendUrl = getBackendUrl();
  if (!backendUrl) {
    res.status(500).json({ msg: 'BACKEND_URL is not configured in Vercel.' });
    return;
  }

  const path = Array.isArray(req.query.path) ? req.query.path.join('/') : req.query.path || '';
  const target = new URL(`/${path}`, `${backendUrl}/`);
  const incomingUrl = new URL(req.url, `http://${req.headers.host}`);
  incomingUrl.searchParams.forEach(function (value, key) {
    target.searchParams.append(key, value);
  });

  const headers = { ...req.headers};
  delete headers.host;
  delete headers['content-length'];

  const method = req.method || 'GET';
  const options = { method: method, headers: headers };
  if (method !== 'GET' && method !== 'HEAD') {
    options.body = await readBody(req);
  }

  try {
    const upstream = await fetch(target, options);
    upstream.headers.forEach(function (value, key) {
      const lower = key.toLowerCase();
      if (
        lower !== 'content-encoding' &&
        lower !== 'transfer-encoding' &&
        lower !== 'content-length'
      ) {
        res.setHeader(key, value);
      }
    });

    const body = Buffer.from(await upstream.arrayBuffer());
    res.status(upstream.status).send(body);
  } catch (error) {
    res.status(502).json({ msg: 'Backend request failed.', error: error.message });
  }
};
