const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const path = require('path');

// Load en vironment variables
dotenv.config({ path: path.join(__dirname, '.env') });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to Database...');
  } catch (err) {
    console.error('Database Connection Error:', err.message);
    process.exit(1);
  }
};

const showHelp = () => {
  console.log(`
Elite Admin Management Utility
------------------------------
Usage: node manage-admin.js [command] [args]

Commands:
  create [name] [email] [password]    Create a new admin/owner
  update-pass [email] [new_password]  Change password for an existing admin
  update-email [old_email] [new_email] Change email for an existing admin
  list                                List all administrative users
  delete [email]                      Remove an administrative user
  `);
  process.exit();
};

const run = async () => {
  await connectDB();

  const [command, arg1, arg2, arg3] = process.argv.slice(2);

  if (!command) showHelp();

  try {
    switch (command) {
      case 'create':
        if (!arg1 || !arg2 || !arg3) {
            console.log('Error: Missing arguments. Use: create [name] [email] [password]');
            break;
        }
        const userExists = await User.findOne({ email: arg2 });
        if (userExists) {
            console.log('Error: A user with this email already exists.');
            break;
        }
        const newUser = await User.create({
          name: arg1,
          email: arg2,
          password: arg3,
          isAdmin: true
        });
        console.log(`Success! New Owner Created: ${newUser.name} (${newUser.email})`);
        break;

      case 'update-pass':
        if (!arg1 || !arg2) {
            console.log('Error: Missing arguments. Use: update-pass [email] [new_password]');
            break;
        }
        const userToUpdate = await User.findOne({ email: arg1 });
        if (!userToUpdate) {
            console.log('Error: Admin not found.');
            break;
        }
        userToUpdate.password = arg2;
        await userToUpdate.save();
        console.log(`Success! Password updated for ${arg1}`);
        break;

      case 'update-email':
        if (!arg1 || !arg2) {
            console.log('Error: Missing arguments. Use: update-email [old_email] [new_email]');
            break;
        }
        const adminToChange = await User.findOne({ email: arg1 });
        if (!adminToChange) {
            console.log('Error: Admin not found.');
            break;
        }
        adminToChange.email = arg2;
        await adminToChange.save();
        console.log(`Success! Email changed from ${arg1} to ${arg2}`);
        break;

      case 'list':
        const admins = await User.find({ isAdmin: true }).select('name email createdAt');
        console.log('--- Current Administrative Users ---');
        admins.forEach(a => console.log(`- ${a.name} | ${a.email} | Joined: ${a.createdAt.toLocaleDateString()}`));
        break;

      case 'delete':
        if (!arg1) {
            console.log('Error: Missing email. Use: delete [email]');
            break;
        }
        const result = await User.deleteOne({ email: arg1, isAdmin: true });
        if (result.deletedCount > 0) {
            console.log(`Success! Admin ${arg1} has been removed.`);
        } else {
            console.log('Error: Admin not found.');
        }
        break;

      default:
        showHelp();
    }
  } catch (error) {
    console.error('Action Failed:', error.message);
  } finally {
    mongoose.connection.close();
    process.exit();
  }
};

run();
