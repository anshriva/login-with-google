// helper/googlePublicKeyHelper.js
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
const NodeCache = require('node-cache'); // Add this line

// Your Google Sign-In client ID
const googleClientId = '97133589647-rdt7v2rcpujtsk4ldbcanlb85vb1dffg.apps.googleusercontent.com';

// Create an in-memory cache with a TTL (time-to-live) of 1 hour
const cache = new NodeCache({ stdTTL: 3600 });

const getGooglePublicKey = async (header, callback) => {
  const cacheKey = header.kid;

  // Check if the public key is already in the cache
  const cachedKey = cache.get(cacheKey);

  if (cachedKey) {
    return callback(null, cachedKey);
  }

  // If not in the cache, fetch the public key from the JWKS endpoint
  const client = jwksClient({
    jwksUri: 'https://www.googleapis.com/oauth2/v3/certs',
  });

  client.getSigningKey(header.kid, (err, key) => {
    if (err) {
      return callback(err);
    }

    const signingKey = key.publicKey || key.rsaPublicKey;

    // Store the public key in the cache with the same TTL as the JWKS response
    cache.set(cacheKey, signingKey, key.expiresIn || 3600);

    callback(null, signingKey);
  });
};

const verifyToken = async (credential) => {
  return new Promise((resolve, reject) => {
    jwt.verify(credential, getGooglePublicKey, { algorithms: ['RS256'], audience: googleClientId }, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};

module.exports = { getGooglePublicKey, verifyToken };
