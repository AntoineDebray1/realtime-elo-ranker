import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from '../entities/player.entity';
import { CreatePlayerDTO } from './dto/create-player.dto';
import { EventEmitterService } from '../event-emitter/event-emitter.service';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player)
    private readonly players: Repository<Player>,
    private readonly eventEmitterService: EventEmitterService,
  ) {}

  setPlayerName(createPlayerDTO: CreatePlayerDTO): Promise<Player> {
    return this.players
      .findOne({
        where: { id: createPlayerDTO.id },
      })
      .then((existingPlayer: any) => {
        if (existingPlayer) {
          throw new Error('Player already exists');
        }
        if (!createPlayerDTO.id || createPlayerDTO.id.trim() === '') {
          throw new Error('Player id is required');
        }

        const newPlayer = this.players.create(createPlayerDTO);
        newPlayer.rank = createPlayerDTO.rank ?? 1000;
        this.eventEmitterService.emit('ranking.update', newPlayer);
        return this.players.save(newPlayer);
      });
  }

  findAll(): Promise<Player[]> {
    return this.players.find();
  }
}
