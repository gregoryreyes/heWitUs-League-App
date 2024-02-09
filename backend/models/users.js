import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema({
  user_name: {
    type: String,
    minLength: 3,
    maxLength: 20
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    minLength: 3,
    maxLength: 50,
    required: true
  },
  roles: [
    {
      role_type: String,
    }
  ]
}, {
  timestamp: true,
  toJSON: {
    transform: function(doc, retDoc){
      delete retDoc.password; // removes password form the json doc
      return retDoc;
    }
  }
})

export default mongoose.model( 'Users', usersSchema );