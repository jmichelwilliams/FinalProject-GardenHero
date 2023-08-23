const fetch = require('node-fetch');
require('dotenv').config({ path: '../.env' });
const jwksUrl =
  'https://dev-simrw8xejcxeakm8.us.auth0.com/.well-known/jwks.json';

const getAuth0PublicKey = async (kid) => {
  try {
    console.log('kidPublic: ', kid);
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

module.exports = {
  getAuth0PublicKey,
};
