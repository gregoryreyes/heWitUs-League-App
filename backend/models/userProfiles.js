import mongoose from 'mongoose';

const userProfilesSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true
  },
  fname: {
    type: String,
    required: true
  },
  lname: {
    type: String,
    required: true
  },
  phone: {
    type: Number
  },
  bio: {
    type: String,
    minLength: 5
  },
  img_url: {
    type: String
  }
  
}, { timestamp: true});

export default mongoose.model( 'UserProfile', userProfilesSchema );