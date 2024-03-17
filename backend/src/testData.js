const mongoose = require('mongoose');
const { User, Event, Group, Friendship, Membership } = require('./db');

const connectionString = process.env.MONGO_URL;

// CHANGE THIS WHEN YOU RUN THE FILE
// const connectionString = 'CHANGE THIS TO YOUR ACCESS LINK FOR MONGODB'; // <---- **** --- DO ME!!! 
// ^^^ DO THIS ^^^ or it will fail lol

// Test data
const userData = [
    { username: 'john', email: 'john@example.com', password: 'password1' },
    { username: 'hamm', email: 'hamm@example.com', password: 'password2' },
    { username: 'peter', email: 'peter@example.com', password: 'password3' },
];

const groupData = [
    {
        groupName: "Tech Enthusiasts",
        description: "A group for passionate tech lovers to discuss the latest trends and innovations.",
        visibility: "Public"
    },
    {
        groupName: "Artistic Minds",
        description: "A community of artists sharing their creativity and inspiring others.",
        visibility: "Public"
    },
    {
        groupName: "Fitness Warriors",
        description: "Join us in our fitness journey and motivate each other to stay healthy and active.",
        visibility: "Private"
    },
    {
        groupName: "Bookworms Club",
        description: "A cozy space for book lovers to discuss their favorite reads and recommend new ones.",
        visibility: "Private"
    }
]

// Add users to groups with roles
const groupMemberships = [
    // Tech Enthusiasts group memberships
    { group: '65f4d9248391b94ce228a4af', user: '65f4d7bea84a230f2d8a73e4', role: 'admin' },
    { group: '65f4d9248391b94ce228a4af', user: '65f4d7bea84a230f2d8a73e5', role: 'member' },
    // Artistic Minds group memberships
    { group: '65f4d9248391b94ce228a4b0', user: '65f4d7bea84a230f2d8a73e6', role: 'member' },
    // Fitness Warriors group memberships
    { group: '65f4d9248391b94ce228a4b1', user: '65f4d7bea84a230f2d8a73e4', role: 'owner' },
    // Bookworms Club group memberships
    { group: '65f4d9248391b94ce228a4b2', user: '65f4d7bea84a230f2d8a73e5', role: 'admin' },
];

const friendshipData = [
    {
        user1: '65f4d7bea84a230f2d8a73e4',
        user2: '65f4d7bea84a230f2d8a73e5',
        status: 'Accepted'
    },
    {
        user1: '65f4d7bea84a230f2d8a73e6',
        user2: '65f4d7bea84a230f2d8a73e4',
        status: 'Pending'
    },
    {
        user1: '65f4d7bea84a230f2d8a73e5',
        user2: '65f4d7bea84a230f2d8a73e6',
        status: 'Blocked'
    }
]

const eventData = [
    {
        name: "Tech Summit 2024",
        description: "An annual gathering of tech professionals to discuss the future of technology.",
        location: "TechHub Conference Center",
        address: "123 Tech Street, Tech City",
        startTime: new Date("2024-06-01T09:00:00"),
        endTime: new Date("2024-06-03T17:00:00"),
        date: new Date("2024-06-01"),
        owner: '65f4d7bea84a230f2d8a73e4',
        group: '65f4d9248391b94ce228a4af',
        visibility: "Public",
        eventType: "Conference",
        coordinates: {x: 49.1915, y: -122.8732}
    },
    {
        name: "Art Exhibition: Expressions of Creativity",
        description: "A showcase of artistic talent from local artists.",
        location: "Art Gallery",
        address: "456 Art Avenue, Art Town",
        startTime: new Date("2024-05-15T10:00:00"),
        endTime: new Date("2024-05-20T18:00:00"),
        date: new Date("2024-05-15"),
        owner: '65f4d7bea84a230f2d8a73e6',
        group: '65f4d9248391b94ce228a4b0',
        visibility: "Public",
        eventType: "Exhibition",
        coordinates: {x: 49.2765, y: -122.9131}
    },
    {
        name: "Fitness Bootcamp Challenge",
        description: "Join us for a high-intensity fitness challenge to test your limits!",
        location: "FitZone Gym",
        address: "789 Fitness Street, Fitnessville",
        startTime: new Date("2024-04-10T06:00:00"),
        endTime: new Date("2024-04-10T08:00:00"),
        date: new Date("2024-04-10"),
        owner: '65f4d7bea84a230f2d8a73e4',
        group: '65f4d9248391b94ce228a4b1',
        visibility: "Private",
        eventType: "Workout",
        coordinates: {x: 49.2261, y: -122.9282}
    },
    {
        name: "Book Club Meeting: Mystery Novels",
        description: "Discussing the latest mystery novels and sharing thrilling plot twists.",
        location: "Cozy Bookstore",
        address: "101 Bookworm Lane, Booktown",
        startTime: new Date("2024-03-20T18:30:00"),
        endTime: new Date("2024-03-20T20:00:00"),
        date: new Date("2024-03-20"),
        owner: '65f4d7bea84a230f2d8a73e5',
        group: '65f4d9248391b94ce228a4b2',
        visibility: "Private",
        eventType: "Book Club",
        coordinates: {x: 49.2442, y: -123.0130}
    }
]



// Connect to MongoDB
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');

    // Insert test data into collections
    return Promise.all([
        // User.insertMany(userData), - DONE
        // Event.insertMany(eventData),
        // Group.insertMany(groupData), - DONE
        // Friendship.insertMany(friendshipData), - DONE
        // Membership.insertMany(groupMemberships), - DONE
    ]);
})
.then(() => {
    console.log('Test data inserted successfully');
    mongoose.connection.close();
})
.catch(err => {
    console.error('Error inserting test data:', err);
    mongoose.connection.close();
});
