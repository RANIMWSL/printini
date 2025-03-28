const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config(); // To load your environment variables

// Connect to the database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// Function to hash passwords for all users
async function hashAllPasswords() {
  try {
    // Fetch all users from the database
    const users = await User.find();

    // Loop through each user
    for (let user of users) {
      // Skip users who already have a hashed password
      if (!bcrypt.getRounds(user.password)) {
        // Hash the password if it's not already hashed
        const hashedPassword = await bcrypt.hash(user.password, 10);

        // Update the user with the hashed password
        user.password = hashedPassword;

        // Save the updated user
        await user.save();
        console.log(`Password for user ${user.email} has been hashed and saved.`);
      }
    }
  } catch (err) {
    console.log('Error hashing passwords:', err);
  } finally {
    mongoose.disconnect();
  }
}

// Run the function to hash passwords
hashAllPasswords();
