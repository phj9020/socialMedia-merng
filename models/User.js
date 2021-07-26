import mongoose from 'mongoose';

const userShema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    createdAt : String
});

const userModule = mongoose.model('User', userShema);

export default userModule;