const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, 'root_debug.log');

function log(msg) {
    const timestamp = new Date().toISOString();
    const entry = `[${timestamp}] [ROOT] ${msg}\n`;
    try {
        fs.appendFileSync(logFile, entry);
    } catch (e) {
        console.error('Failed to write to root log:', e);
    }
    console.log(entry);
}

log('Starting root index.js...');
log(`Current Directory: ${process.cwd()}`);

try {
    log('Attempting to require ./server/index.js');
    const server = require('./server/index.js');
    log('Successfully required ./server/index.js');
} catch (error) {
    log(`FATAL ERROR: Failed to require ./server/index.js: ${error.message}`);
    log(`Stack Trace: ${error.stack}`);
    process.exit(1);
}
