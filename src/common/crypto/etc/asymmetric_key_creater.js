const crypto = require('crypto');
const fs = require('fs');

// asymmetric key creater function
function generateKeyPair() {
  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem'
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem'
    }
  });

  fs.writeFileSync('public_key.pem', publicKey);
  fs.writeFileSync('private_key.pem', privateKey);

  return { publicKey, privateKey };
}

const { publicKey, privateKey } = generateKeyPair();
console.log('pub: %o', publicKey);
console.log('secret: %o', privateKey);