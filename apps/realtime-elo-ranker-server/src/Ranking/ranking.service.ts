import { Injectable, OnModuleInit } from '@nestjs/common';
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

  async getRanking(): Promise<Player[]> {
    return this.playerRepository.find({
      select: ['id', 'rank'],
      order: { rank: 'DESC' }, // Trie le classement par ordre décroissant
    });
  }

  onModuleInit() {
    // Écoute les mises à jour de classement
    this.eventEmitterService
      .getEventEmitter()
      .on('ranking.update', (updatedPlayer: Player) => {
        console.log('Mise à jour du classement reçue:', updatedPlayer);
      });
  }
}
