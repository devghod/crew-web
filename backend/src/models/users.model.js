const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const usersSchema = new mongoose.Schema({
  first_name: {
    type: String
  },
  middle_name: {
    type: String
  },
  last_name: {
    type: String
  },
  email: {
    type: String,
  },
  username: {
    type: String,
  },
  status: {
    type: String,
  },
  gender: {
    type: String,
  },
  password: {
    type: String,
  },
  image: {
    type: String,
  },
  tokens: [{
    token: {
      type: String
    }
  }],
  unique_token: {
    type: String
  },
  
  // necessary fields
  date_created: {
    type: Date,
    required: true,
    default: Date.now
  },
  date_updated: {
    type: Date,
    required: true,
    default: Date.now
  },
  created_by: {
    type: String,
  },
  deleted: {
    type: Boolean,
    default: false
  }
});

// usersSchema.pre('save', async function (next) {
//   const user = this
//   if (user.isModified('password')) {
//       user.password = await bcrypt.hash(user.password, 8)
//   }
//   next()
// })

// Hash the password before saving it to the database
usersSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (error) {
    return next(error);
  }
});

// Compare the given password with the hashed password in the database
usersSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
}

const Users = mongoose.model('Users', usersSchema);
module.exports = Users;