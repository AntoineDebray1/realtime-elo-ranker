import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Ranking API (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  afterAll(async () => {
    await app.close();
  });

  it('/api/ranking (GET) - Should return sorted players by Elo', async () => {
    const res = await request(app.getHttpServer()).get('/api/ranking');
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(1);
    expect(res.body[0].rank).toBeGreaterThanOrEqual(res.body[1].rank);
  });
});