// backend/src/seedData.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const PointHistory = require('./models/PointHistory');

dotenv.config();

const initialUsers = [
  'Rahul',
  'Kamal',
  'Sanak',
  'Priya',
  'Amit',
  'Sneha',
  'Vikram',
  'Pooja',
  'Arjun',
  'Divya'
];

const seedDatabase = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await PointHistory.deleteMany({});
    console.log('Cleared existing data');

    // Create users
    const users = await User.insertMany(
      initialUsers.map(name => ({
        name,
        totalPoints: 0,
        rank: 0
      }))
    );
    
    console.log(`Created ${users.length} users`);

    // Generate some random point history for demonstration
    const historyData = [];
    for (let i = 0; i < 20; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const randomPoints = Math.floor(Math.random() * 10) + 1;
      
      historyData.push({
        userId: randomUser._id,
        userName: randomUser.name,
        pointsAwarded: randomPoints,
        timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000) // Random time in last 7 days
      });
      
      // Update user's total points
      randomUser.totalPoints += randomPoints;
    }

    // Save point history
    await PointHistory.insertMany(historyData);
    console.log(`Created ${historyData.length} point history records`);

    // Save updated users with points
    await Promise.all(users.map(user => user.save()));

    // Update ranks
    const sortedUsers = await User.find().sort({ totalPoints: -1 });
    for (let i = 0; i < sortedUsers.length; i++) {
      sortedUsers[i].rank = i + 1;
      await sortedUsers[i].save();
    }

    console.log('Database seeded successfully!');
    console.log('Sample data:');
    const finalUsers = await User.find().sort({ totalPoints: -1 }).limit(5);
    finalUsers.forEach(user => {
      console.log(`${user.rank}. ${user.name} - ${user.totalPoints} points`);
    });

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
};

seedDatabase();