#!/usr/bin/env node

const crypto = require('crypto');
const algorithm = 'aes-192-cbc';
const password = process.argv[2];

if (!password) {
  console.error('Usage: lisk-dex-encrypt-passphrase ${password} "${passphrase}"');
  process.exit(1);
}

const key = crypto.scryptSync(password, 'salt', 24);
const iv = Buffer.alloc(16, 0);
const cipher = crypto.createCipheriv(algorithm, key, iv);
const passphrase = process.argv[3];

let encrypted = cipher.update(passphrase, 'utf8', 'hex');
encrypted += cipher.final('hex');

console.log(encrypted);
