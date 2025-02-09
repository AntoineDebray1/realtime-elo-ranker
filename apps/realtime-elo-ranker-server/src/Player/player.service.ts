import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from '../entities/player.entity';
import { CreatePlayerDTO } from './dto/create-player.dto';
import { EventEmitterService } from '../event-emitter/event-emitter.service';

@Injectable()
export class PlayerService {
  findOne(id: string): Promise<Player | undefined> {
    return this.players.findOne({ where: { id } }).then(player => player ?? undefined);
  }
  constructor(
    @InjectRepository(Player)
    private readonly players: Repository<Player>,
    private readonly eventEmitterService: EventEmitterService,
  ) {}

  /**
   * Crée un joueur avec un classement initial basé sur la moyenne des joueurs existants.
   * @param {CreatePlayerDTO} createPlayerDTO - Données du joueur à créer.
   * @returns {Promise<Player>} - Le joueur créé.
   */
  setPlayerName(createPlayerDTO: CreatePlayerDTO): Promise<Player> {
    if (!createPlayerDTO.id || createPlayerDTO.id.trim() === '') {
      return Promise.reject(
        new HttpException(
          { code: 400, message: 'Player id is required' },
          HttpStatus.BAD_REQUEST,
        ),
      );
    }

    return this.players
      .findOne({ where: { id: createPlayerDTO.id } })
      .then((existingPlayer) => {
        if (existingPlayer) {
          throw new HttpException(
            { code: 409, message: 'Player already exists' },
            HttpStatus.CONFLICT,
          );
        }
        if (createPlayerDTO.rank !== undefined) {
          return createPlayerDTO.rank;
        }
        
        // Sinon, calculer la moyenne des rangs existants
        return this.calculateAverageRank();
      })
      .then((averageRank) => {
        const newPlayer = this.players.create(createPlayerDTO);
        newPlayer.rank = createPlayerDTO.rank ?? averageRank;
        return this.players.save(newPlayer);
      })
      .then((savedPlayer) => {
        this.eventEmitterService.emit('ranking.update', savedPlayer);
        return savedPlayer;
      });
  }

  /**
   * Calcule la moyenne des classements des joueurs.
   * @returns {Promise<number>} - La moyenne des classements.
   */
  calculateAverageRank(): Promise<number> {
    return this.players.find().then((players) => {
      return players.length === 0
        ? 1000
        : Math.round(players.reduce((sum, p) => sum + p.rank, 0) / players.length);
    });
  }

  /**
   * Récupère la liste de tous les joueurs.
   * @returns {Promise<Player[]>} - Liste des joueurs.
   */
  findAll(): Promise<Player[]> {
    return this.players.find();
  }

  
}
