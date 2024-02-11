import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const saltRounds = Number(process.env.SALT_ROUNDS);

const usersSchema = new mongoose.Schema({
  username: {
    type: String,
    minLength: 3,
    maxLength: 20
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    index: true
  },
  password: {
    type: String,
    minLength: 3,
    maxLength: 50,
    required: true
  },
  commissioner: {
    type: Boolean,
    default: false
  },
  score_keeper: {
    type: Boolean,
    default: false
  },
  player: {
    type: Boolean,
    default: false
  }
  // date_created: {
  //   type: String
  // }
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, retDoc) {
      delete retDoc.password; // removes password from the json doc
      return retDoc;
    }
  }
});

usersSchema.index({email: 1});
usersSchema.index({username: 1});

usersSchema.pre( 'save', async function(next) {

  const user = this;
  // if the password has not changed continue
  if ( !user.isModified('password') ) {
    return next();
  }

  user.password = await bcrypt.hash( user.password, saltRounds );
  return next();
})

export default mongoose.model( 'User', usersSchema );