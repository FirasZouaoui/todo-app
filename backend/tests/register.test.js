import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import userRoutes from '../routes/userRoute.js';
import userModel from '../models/userModel.js';

process.env.JWT_SECRET = "testsecret"; 

const app = express();
app.use(express.json());
app.use('/api/user', userRoutes);

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await userModel.deleteMany({});
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Register Endpoint', () => {
  it('should register a new user', async () => {
    const res = await request(app).post('/api/user/register').send({
      name: 'Test User',
      email: 'testuser@example.com',
      password: 'StrongPassword1!',
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body).toHaveProperty('user');
  });
});
