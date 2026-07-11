function readBody(req) {
  return new Promise(function (resolve, reject) {
    var chunks = [];
    req.on('data', function (chunk) {
      chunks.push(chunk);
    });
    req.on('end', function () {
      resolve(Buffer.concat(chunks));
    });
    req.on('error', reject);
  });
}

function getBackendUrl() {
  var url = process.env.BACKEND_URL || process.env.API_URL || '';
  return url.replace(/\/+$/, '');
}

module.exports = async function handler(req, res) {
  var backendUrl = getBackendUrl();
  if (!backendUrl) {
    res.status(500).json({ msg: 'BACKEND_URL is not configured in Vercel.' });
    return;
  }

  var path = Array.isArray(req.query.path) ? req.query.path.join('/') : req.query.path || '';
  var target = new URL('/' + path, backendUrl + '/');
  var incomingUrl = new URL(req.url, 'http://' + req.headers.host);
  incomingUrl.searchParams.forEach(function (value, key) {
    target.searchParams.append(key, value);
  });

  var headers = Object.assign({}, req.headers);
  delete headers.host;
  delete headers['content-length'];

  var method = req.method || 'GET';
  var options = { method: method, headers: headers };
  if (method !== 'GET' && method !== 'HEAD') {
    options.body = await readBody(req);
  }

  try {
    var upstream = await fetch(target, options);
    upstream.headers.forEach(function (value, key) {
      var lower = key.toLowerCase();
      if (lower !== 'content-encoding' && lower !== 'transfer-encoding' && lower !== 'content-length') {
        res.setHeader(key, value);
      }
    });

    var body = Buffer.from(await upstream.arrayBuffer());
    res.status(upstream.status).send(body);
  } catch (error) {
    res.status(502).json({ msg: 'Backend request failed.', error: error.message });
  }
};
