import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Match } from './../src/Matchs/interfaces/match.interface';

describe('Matches API (e2e)', () => {
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

  it('/api/match (POST) - Should record a match', async () => {
    // Create players before running the test
    await request(app.getHttpServer())
      .post('/api/player')
      .send({ id: '1', rank: 1500 });

    await request(app.getHttpServer())
      .post('/api/player')
      .send({ id: '2', rank: 1500 });

    const match: Match = { winner: '1', loser: '2', draw: false };

    const res = await request(app.getHttpServer())
      .post('/api/match')
      .send(match);

    expect(res.status).toBe(200);
    expect(res.body.winner.rank).toBeGreaterThan(1500);
    expect(res.body.loser.rank).toBeLessThan(1500);
  });
});