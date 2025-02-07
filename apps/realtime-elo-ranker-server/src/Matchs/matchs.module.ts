import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from '../entities/player.entity';
import { Match } from '../entities/match.entity';
import { MatchsController } from './match.controller';
import { MatchService } from './match.service';
import { PlayerModule } from '../Player/player.module';
import { RankingModule } from '../Ranking/ranking.module';
import { GustomEventEmitterModule } from '../event-emitter/event-emitter.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Player, Match]),
    PlayerModule,
    RankingModule,
    GustomEventEmitterModule,
  ],
  controllers: [MatchsController],
  providers: [MatchService],
  exports: [MatchService],
})
export class MatchModule {}
