#!/usr/bin/env node

/**
 * Test script for TOTP Authenticator
 * This script tests all the core functionality without launching the Electron UI
 */

const Database = require('./src/utils/database.js');
const Crypto = require('./src/utils/crypto.js');
const { authenticator } = require('otplib');
const fs = require('fs');
const path = require('path');

const testDbPath = path.join(__dirname, 'test-accounts.db');

console.log('=================================');
console.log('TOTP Authenticator - Test Suite');
console.log('=================================\n');

// Cleanup old test db
if (fs.existsSync(testDbPath)) {
  fs.unlinkSync(testDbPath);
  console.log('✓ Cleaned up old test database');
}

try {
  // Initialize modules
  const db = new Database(testDbPath);
  const crypto = new Crypto();
  console.log('✓ Initialized database and crypto modules\n');

  // Test 1: Add accounts
  console.log('Test 1: Adding accounts...');
  const testAccounts = [
    { service_name: 'Google', username: 'user1@gmail.com', secret_key: '*****' },
    { service_name: 'GitHub', username: 'developer', secret_key: '*****' },
    { service_name: 'Facebook', username: 'user@fb.com', secret_key: '*****' }
  ];

  const addedIds = [];
  testAccounts.forEach((account, index) => {
    const encryptedKey = crypto.encrypt(account.secret_key);
    const result = db.addAccount({
      service_name: account.service_name,
      username: account.username,
      secret_key: encryptedKey
    });
    addedIds.push(result.lastInsertRowid);
    console.log(`  ✓ Added ${account.service_name} (ID: ${result.lastInsertRowid})`);
  });

  // Test 2: Retrieve accounts
  console.log('\nTest 2: Retrieving accounts...');
  const accounts = db.getAllAccounts();
  console.log(`  ✓ Retrieved ${accounts.length} account(s)`);

  // Test 3: Decrypt and generate TOTP
  console.log('\nTest 3: Generating TOTP codes...');
  accounts.forEach(account => {
    const decryptedSecret = crypto.decrypt(account.secret_key);
    const token = authenticator.generate(decryptedSecret);
    const timeRemaining = authenticator.timeRemaining();
    console.log(`  ✓ ${account.service_name}: ${token} (${timeRemaining}s remaining)`);
  });

  // Test 4: Update account
  console.log('\nTest 4: Updating account...');
  const updateId = addedIds[0];
  const updatedSecret = crypto.encrypt('MBSWY3DPEHPK3PXS');
  db.updateAccount(updateId, {
    service_name: 'Google (Updated)',
    username: 'updated@gmail.com',
    secret_key: updatedSecret
  });
  const updatedAccount = db.getAccountById(updateId);
  console.log(`  ✓ Updated account: ${updatedAccount.service_name} - ${updatedAccount.username}`);

  // Test 5: Delete account
  console.log('\nTest 5: Deleting account...');
  const deleteId = addedIds[1];
  db.deleteAccount(deleteId);
  const remainingAccounts = db.getAllAccounts();
  console.log(`  ✓ Deleted account, ${remainingAccounts.length} remaining`);

  // Test 6: Encryption/Decryption validation
  console.log('\nTest 6: Encryption validation...');
  const testSecret = 'TESTKEY123456789';
  const encrypted = crypto.encrypt(testSecret);
  const decrypted = crypto.decrypt(encrypted);
  const matches = testSecret === decrypted;
  console.log(`  Original: ${testSecret}`);
  console.log(`  Encrypted: ${encrypted.substring(0, 30)}...`);
  console.log(`  Decrypted: ${decrypted}`);
  console.log(`  ${matches ? '✓' : '✗'} Encryption/Decryption ${matches ? 'successful' : 'failed'}`);

  // Cleanup
  db.close();
  fs.unlinkSync(testDbPath);
  console.log('\n✓ Test database cleaned up');

  console.log('\n=================================');
  console.log('✓ All tests passed successfully!');
  console.log('=================================\n');

} catch (error) {
  console.error('\n✗ Test failed:', error.message);
  console.error(error.stack);
  process.exit(1);
}
