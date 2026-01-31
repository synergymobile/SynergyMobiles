const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const clientDir = path.join(__dirname, 'client');
const serverDir = path.join(__dirname, 'server');
const serverDistDir = path.join(serverDir, 'dist');
const clientDistDir = path.join(clientDir, 'dist');

function log(msg) {
    console.log(`[BUILD-DEPLOY] ${msg}`);
}

try {
    // 1. Install Client Dependencies
    log('Installing client dependencies...');
    execSync('npm install --legacy-peer-deps', { cwd: clientDir, stdio: 'inherit' });

    // 2. Build Client
    log('Building client...');
    execSync('npm run build', { cwd: clientDir, stdio: 'inherit' });

    // 3. Verify Client Build
    if (!fs.existsSync(clientDistDir)) {
        throw new Error('Client build failed: dist folder not found.');
    }

    // 4. Clean Server Dist
    log('Cleaning server/dist...');
    if (fs.existsSync(serverDistDir)) {
        fs.rmSync(serverDistDir, { recursive: true, force: true });
    }

    // 5. Copy Client Dist to Server Dist
    log('Copying build artifacts to server/dist...');
    fs.cpSync(clientDistDir, serverDistDir, { recursive: true });

    log('Build and deployment preparation complete!');
    log('You can now commit and push the changes, including server/dist.');

} catch (error) {
    console.error('[BUILD-DEPLOY] Error:', error.message);
    process.exit(1);
}
