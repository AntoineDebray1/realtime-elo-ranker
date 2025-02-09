import { Injectable, OnModuleInit, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from '../entities/player.entity';
import { EventEmitterService } from '../event-emitter/event-emitter.service';

@Injectable()
export class RankingService implements OnModuleInit {
  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
    private readonly eventEmitterService: EventEmitterService,
  ) {}

  getRanking(): Promise<Player[]> {
    return this.playerRepository.find({
      select: ['id', 'rank'],
      order: { rank: 'DESC' },
    }).then((players) => {
      if (players.length === 0) {
        throw new HttpException(
          { code: 404, message: 'No players found in ranking' },
          HttpStatus.NOT_FOUND
        );
      }
      return players;
    });
  }

  onModuleInit() {
    this.eventEmitterService
      .getEventEmitter()
      .on('ranking.update', (updatedPlayer: Player) => {});
  }
}
