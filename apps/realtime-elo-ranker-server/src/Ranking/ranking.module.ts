import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from '../entities/player.entity';
import { RankingController } from './ranking.controller';
import { RankingService } from './ranking.service';
import { GustomEventEmitterModule } from '../event-emitter/event-emitter.module';

@Module({
  imports: [TypeOrmModule.forFeature([Player]), GustomEventEmitterModule],
  controllers: [RankingController],
  providers: [RankingService],
  exports: [RankingService],
})
export class RankingModule {}
