import mongoose from "mongoose";

// this can be in mongoDB backend online - external DB
const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},

});

// this can be stored on the gcp instance - internal DB
const loginSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true},
    password: {type: String, required: true},

});

const groupSchema = new mongoose.Schema({
    groupName: {type: String, required: true},
    description: {type: String},
    visibility: {type: String, enum: ['Public', 'Private'], default: 'Public'},
});

// Indicates what fields should be indexed for text search
groupSchema.index({groupName: 'text', description: 'text'});

// For defining the relationship between userSchema and groupSchema
const groupMembershipSchema = new mongoose.Schema({
    group: {type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    role: {type: String, enum: ['owner', 'admin', 'member'], required: true},
});

// Define Friendship schema between two users
const friendshipSchema = new mongoose.Schema({
    user1: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    user2: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    status: {type: String, enum: ['Pending', 'Accepted', 'Blocked'], default: 'Pending'},
});

const eventSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String},
    location: {type: String},
    address: {type: String, required: true},
    startTime: {type: Date, required: true},
    endTime: {type: Date, required: true},
    date: {type: Date},
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    group: {type: mongoose.Schema.Types.ObjectId, ref: 'Group'},
    visibility: {type: String, enum: ['Public', 'Private'], default: 'Public'},
    eventType: {type: String},
    coordinates: {
        x: {type: Number, required: true},
        y: {type: Number, required: true}
    }
});

// Indicates what fields should be indexed for text search
eventSchema.index({name: 'text', description: 'text', location: 'text'});

// Define pre-hook middleware for group deletion - this cascades and deletes all references for users too
groupSchema.pre('deleteOne', {document: true, query: false}, async function (next) {
    const groupId = this._id;

    try {
        // Delete all group memberships associated with the group
        await mongoose.model('Membership').deleteMany({group: groupId});
        next();
    } catch (err) {
        if (err instanceof Error) {
            console.error(err.message);
        } else {
            console.error("An unknown error occurred");
        }
    }
});

// Define pre-hook middleware for user deletion - to cascade delete friendship relations
userSchema.pre('deleteOne', {document: true, query: false}, async function (next) {
    const userId = this._id;

    try {
        // Delete all friendships associated with the user
        await mongoose.model('Friendship').deleteMany({$or: [{user1: userId}, {user2: userId}]});
        next();
    } catch (err) {
        if (err instanceof Error) {
            console.error(err.message);
        } else {
            console.error("An unknown error occurred");
        }
    }
});

// Create models
export const Login = mongoose.model('Login', loginSchema);
export const User = mongoose.model('User', userSchema);
export const Event = mongoose.model('Event', eventSchema);
export const Group = mongoose.model('Group', groupSchema);
export const Friendship = mongoose.model('Friendship', friendshipSchema);
export const Membership = mongoose.model('Membership', groupMembershipSchema);

