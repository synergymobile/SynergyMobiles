// This file acts as a bridge to run the server from the client directory
// This is necessary because Hostinger is locked to the 'client' directory as root

const path = require('path');

// Change working directory to the server folder
// This ensures that relative paths (like config/db) work correctly
try {
    process.chdir(path.join(__dirname, '../server'));
    console.log('Changed working directory to:', process.cwd());
    
    // Run the actual server
    require('../server/index.js');
} catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
}
