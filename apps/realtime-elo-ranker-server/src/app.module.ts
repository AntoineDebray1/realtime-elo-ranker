import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerModule } from './Player/player.module';
import { RankingModule } from './Ranking/ranking.module';
import { MatchModule } from './Matchs/matchs.module';
import { GustomEventEmitterModule } from './event-emitter/event-emitter.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    PlayerModule,
    RankingModule,
    MatchModule,
    GustomEventEmitterModule,
  ],
})
export class AppModule {}
