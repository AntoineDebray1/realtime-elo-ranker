import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerService } from './player.service';
import { PlayersController } from './player.controller';
import { Player } from '../entities/player.entity';
import { GustomEventEmitterModule } from '../event-emitter/event-emitter.module';

@Module({
  imports: [TypeOrmModule.forFeature([Player]), GustomEventEmitterModule],
  controllers: [PlayersController],
  providers: [PlayerService],
  exports: [PlayerService],
})
export class PlayerModule {}
