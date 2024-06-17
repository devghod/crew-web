// db.ts
import mongoose from 'ongoose';
import { dbUrl } from './config';

mongoose.connect(dbUrl, {});

mongoose.connection.on('connected', () => console.log('Database connected'));
mongoose.connection.on('open', () => console.log('Database open'));
mongoose.connection.on('disconnected', () => console.log('Database disconnected'));
mongoose.connection.on('reconnected', () => console.log('Database reconnected'));
mongoose.connection.on('disconnecting', () => console.log('Database disconnecting'));
mongoose.connection.on('close', () => console.log('Database close'));
mongoose.connection.on('error', (error: any) => console.error(`Database ${error}`));