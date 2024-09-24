import mongoose from 'mongoose';
import { dbUrl, nodeEnv } from './config';

export const connectToDatabase = () => {
  mongoose.connect(dbUrl, {});
  if (nodeEnv != 'test') {
    mongoose.connection.on('connected', () => console.log('Database connected'));
    mongoose.connection.on('open', () => console.log('Database open'));
    mongoose.connection.on('disconnected', () => console.log('Database disconnected'));
    mongoose.connection.on('reconnected', () => console.log('Database reconnected'));
    mongoose.connection.on('disconnecting', () => console.log('Database disconnecting'));
    mongoose.connection.on('close', () => console.log('Database close'));
    mongoose.connection.on('error', (error: any) => console.error(`Database ${error}`));
  }
};