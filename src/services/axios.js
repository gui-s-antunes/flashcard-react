import axios from 'axios';
import dotenv from 'dotenv';
import { join } from 'path';

dotenv.config({ path: join(__dirname, '../../.env') });

export default axios.create({
  // baseURL: 'http://localhost:3001',
  baseURL: process.env.BASE_URL,
});
