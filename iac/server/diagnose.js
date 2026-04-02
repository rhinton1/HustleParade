#!/usr/bin/env node

/**
 * Diagnostic script to check server configuration
 * Run: node diagnose.js (from the server folder)
 */

require('dotenv').config();

console.log('🔍 HustleParade Server Diagnostic\n');

// Check environment variables
console.log('📋 Environment Variables:');
const requiredEnvVars = ['MONGO_ATLAS_URI', 'JWT_SECRET', 'CLIENT_ORIGIN', 'PORT'];
const missingVars = [];

requiredEnvVars.forEach(varName => {
    const value = process.env[varName];
    if (value) {
        const display = varName === 'MONGO_ATLAS_URI' || varName === 'JWT_SECRET' 
            ? value.substring(0, 20) + '...' 
            : value;
        console.log(`✅ ${varName}: ${display}`);
    } else {
        console.log(`❌ ${varName}: NOT SET`);
        missingVars.push(varName);
    }
});

if (missingVars.length > 0) {
    console.log(`\n⚠️  Missing variables: ${missingVars.join(', ')}`);
    console.log('Please add these to your .env file in the server folder.\n');
}

// Check dependencies
console.log('\n📦 Dependencies:');
const dependencies = ['mongoose', 'express', 'bcryptjs', 'jsonwebtoken', 'cors', 'dotenv'];

dependencies.forEach(dep => {
    try {
        require.resolve(dep);
        console.log(`✅ ${dep}: installed`);
    } catch {
        console.log(`❌ ${dep}: NOT INSTALLED`);
    }
});

// Test MongoDB connection
console.log('\n🗄️  Testing MongoDB Connection:');
if (process.env.MONGO_ATLAS_URI) {
    const mongoose = require('mongoose');
    mongoose.connect(process.env.MONGO_ATLAS_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('✅ MongoDB connection successful!');
        mongoose.disconnect();
    })
    .catch(err => {
        console.log(`❌ MongoDB connection failed: ${err.message}`);
    });
} else {
    console.log('⏭️  Skipping (MONGO_ATLAS_URI not set)');
}

console.log('\n✨ Diagnostic complete.\n');

