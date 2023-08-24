const fetch = require('node-fetch');
require('dotenv').config({ path: '../.env' });
const jwt = require('jsonwebtoken');
const jwksUrl = process.env.JWKS_URL;

// Function to get Auth0 Public key, used to validate access token
const getAuth0PublicKey = async (kid) => {
  try {
    const response = await fetch(jwksUrl);

    const jwks = await response.json();

    const publicKey = jwks.keys.find((key) => key.kid === kid);

    if (!publicKey) {
      throw new Error('Public key not found for kid');
    }

    return publicKey;
  } catch (error) {
    console.error('Error fetching Auth0 public key:', error);
    throw error;
  }
};

// Function to validate access token
const validateAccessToken = async (req, res, next) => {
  try {
    const accessToken = req.headers?.authorization?.split(' ')[1];

    if (!accessToken) {
      throw new Error('Access Token not defined');
    }

    const decodedToken = jwt.decode(accessToken, { complete: true });
    if (!decodedToken) {
      throw new Error('Access token is invalid');
    }

    const publicKey = await getAuth0PublicKey(decodedToken.header.kid);
    const x509Certificate = publicKey.x5c[0];
    const certificatePem = `-----BEGIN CERTIFICATE-----\n${x509Certificate}\n-----END CERTIFICATE-----`;

    const verifiedToken = jwt.verify(accessToken, certificatePem, {
      algorithms: ['RS256'],
    });

    if (verifiedToken && verifiedToken.sub) {
      req.verifiedToken = verifiedToken;
      next();
    } else {
      res.status(401).json({ status: 401, error: 'Invalid token format' });
    }
  } catch (error) {
    console.log('error: ', error);
    res
      .status(500)
      .json({ status: 500, error: error.message || 'Internal Server Error' });
  }
};

module.exports = {
  getAuth0PublicKey,
  validateAccessToken,
};
