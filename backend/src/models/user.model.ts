import { Request, Response } from 'express';
import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

type TUser = Document & {
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  username: string;
  mobile: string;
  gender: string;
  address: string;
  birth_date: string;
  status: string;
  role: string;
  password: string;
  profile: string;
  tokens: [],
  unique_token: string,
  date_created: any,
  date_updated: any,
  created_by: string,
  deleted_at: any,
  comparePassword(password: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<TUser>({
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
  mobile: {
    type: String,
  },
  gender: {
    type: String,
  },
  address: {
    type: String,
  },
  birth_date: {
    type: String,
  },
  // active, inactive, hold
  status: {
    type: String,
    default: "inactive",
  },
  role: {
    type: String,
  },
  password: {
    type: String,
  },
  profile: {
    type: String,
  },
  tokens: [{
    token: {
      type: String,
    }
  }],
  unique_token: {
    type: String,
  },
  
  // necessary fields
  date_created: {
    type: Date,
    required: true,
    default: Date.now,
  },
  date_updated: {
    type: Date,
    required: true,
    default: Date.now,
  },
  created_by: {
    type: String,
  },
  deleted_at: {
    type: Date,
    default: null,
  }
});

// Hash the password before saving it to the database
userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt();
    bcrypt.hash(user.password, salt);    

    next();
  } catch (error) {
    return next(error);
  }
});

// Compare the given password with the hashed password in the database
userSchema.methods.comparePassword = async function (password: String): Promise<boolean>  {
  return bcrypt.compare(password.toString(), this.password);
};

const User = mongoose.model('User', userSchema);
export default User;