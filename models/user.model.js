import  mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstname: { type: String, required: true, trim: true},
    lastname: { type: String, required: true, trim: true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    role: { type: String, enum: ["user", "admin"], default: "user"},
    isBlocked: { type: Boolean, default: false },
    isOnline: { type: Boolean, default: false },
    lastSeen: {type: Date, default: null }
   
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export  default User;