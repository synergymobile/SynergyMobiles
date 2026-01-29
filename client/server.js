import { createRequire } from 'module';
import path from 'path';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
