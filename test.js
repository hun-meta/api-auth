const bcrypt = require('bcrypt');

async function main(){

    const plain = 'testaccount2@';
    const saltRounds = 10;

    const password = await bcrypt.hash(plain, saltRounds);

    console.log('end: %o', password);
}

main();