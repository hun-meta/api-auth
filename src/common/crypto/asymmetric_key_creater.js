const crypto = require('crypto');
const fs = require('fs');

// 비대칭키 생성 함수
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

  // 키를 파일로 저장 (선택사항)
  fs.writeFileSync('public_key.pem', publicKey);
  fs.writeFileSync('private_key.pem', privateKey);

  return { publicKey, privateKey };
}

const { publicKey, privateKey } = generateKeyPair();
console.log('pub: %o', publicKey);
console.log('secret: %o', privateKey);