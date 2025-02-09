import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Players API (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Delete the player if it exists before running the tests
    await request(app.getHttpServer())
      .delete('/api/player/Alice');

    // Create a player before running the tests
    await request(app.getHttpServer())
      .post('/api/player')
      .send({ id: '1', rank: 1500 });
  });

  afterAll(async () => {
    await app.close();
  });

  it('/api/player (POST) - Should create a player', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/player')
      .send({ id: 'test1', rank: 1500 });

    expect(res.status).toBe(200);
    expect(res.body.id).toBe('test1');
    expect(res.body.rank).toBe(1500);
  });

  it('/api/player/:id (GET) - Should get a player', async () => {
    const res = await request(app.getHttpServer()).get('/api/player/1');
    expect(res.status).toBe(200);
    expect(res.body.id).toBe('1');
  });
});