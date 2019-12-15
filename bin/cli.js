const crypto = require('crypto');

const algorithm = 'aes-192-cbc';

const password = process.argv[2];

const key = crypto.scryptSync(password, 'salt', 24);

const iv = Buffer.alloc(16, 0);

const cipher = crypto.createCipheriv(algorithm, key, iv);

const plaintext = process.argv[3];

let encrypted = cipher.update(plaintext, 'utf8', 'hex');
encrypted += cipher.final('hex');

console.log(encrypted);

