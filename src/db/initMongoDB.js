import {env} from '../utils/env.js';
import mongoose from "mongoose";

export const initMongoDB= async()=>{
try {
    const user = env('MONGODB_USER');
    const pwd = env('MONGODB_PASSWORD');
    const url = env('MONGODB_URL');
    const db = env('MONGODB_DB');
    console.log(`User: ${user}`);
console.log(`Password: ${pwd}`);
console.log(`URL: ${url}`);
console.log(`Database: ${db}`);

   await mongoose.connect(`mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority`,);
   console.log('MongoDB connected successfully');
} catch (error) {
    console.log('Error while setting up mongo connection', error);
    throw error;
}
};