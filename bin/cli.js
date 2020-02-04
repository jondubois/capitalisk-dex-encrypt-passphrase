#!/usr/bin/env node

const crypto = require('crypto');
const ALGORITHM = 'aes-192-cbc';

let password = process.argv[2];
let passphrase = process.argv[3];
let tooManyArguments = !!process.argv[4];

if (tooManyArguments) {
  console.error('Too many arguments provided. Usage: lisk-dex-encrypt-passphrase ${password} "${passphrase}"');
  process.exit(1);
}

if (!password || !passphrase) {
  console.error('Too few arguments provided. Usage: lisk-dex-encrypt-passphrase ${password} "${passphrase}"');
  process.exit(1);
}

let key = crypto.scryptSync(password, 'salt', 24);
let iv = Buffer.alloc(16, 0);
let cipher = crypto.createCipheriv(ALGORITHM, key, iv);

let encrypted = cipher.update(passphrase, 'utf8', 'hex');
encrypted += cipher.final('hex');

console.log(encrypted);
