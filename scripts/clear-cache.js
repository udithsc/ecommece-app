#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Clear Next.js cache and build artifacts to resolve chunk loading issues
 */

const cacheDirs = [
  '.next',
  'node_modules/.cache',
  '.vercel',
];

function deleteFolderRecursive(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true, force: true });
    console.log(`✅ Deleted: ${dirPath}`);
  } else {
    console.log(`⚠️  Not found: ${dirPath}`);
  }
}

function clearNextCache() {
  console.log('🧹 Clearing Next.js cache and build artifacts...\n');
  
  cacheDirs.forEach(dir => {
    const fullPath = path.join(process.cwd(), dir);
    deleteFolderRecursive(fullPath);
  });
  
  console.log('\n✨ Cache cleared successfully!');
  console.log('\n📋 Next steps:');
  console.log('1. Run: npm run dev');
  console.log('2. Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)');
  console.log('3. If issues persist, restart your browser');
}

if (require.main === module) {
  clearNextCache();
}

module.exports = { clearNextCache };