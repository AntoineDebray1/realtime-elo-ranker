import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from '../entities/player.entity';
import { Match } from '../entities/match.entity';
import { EventEmitterService } from '../event-emitter/event-emitter.service';

@Injectable()
export class MatchService {
  private readonly K = 32;

  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
    @InjectRepository(Match)
    private readonly matchRepository: Repository<Match>,
    private readonly eventEmitterService: EventEmitterService,
  ) {}

  private getPlayerById(id: string): Promise<Player> {
    return this.playerRepository.findOne({ where: { id } }).then((player) => {
      if (!player) {
        throw new HttpException(
          { code: 422, message: `Player with ID ${id} not found` },
          HttpStatus.UNPROCESSABLE_ENTITY
        );
      }
      return player;
    });
  }

  setMatch(match: Match): Promise<any> {
    return this.getPlayerById(match.winner)
      .then((player1) => {
        return this.getPlayerById(match.loser).then((player2) => {
          const rating1 = player1.rank;
          const rating2 = player2.rank;

          const expectedScore1 = 1 / (1 + Math.pow(10, (rating2 - rating1) / 400));
          const expectedScore2 = 1 / (1 + Math.pow(10, (rating1 - rating2) / 400));

          if (match.draw) {
            player1.rank = Math.round(rating1 + this.K * (0.5 - expectedScore1));
            player2.rank = Math.round(rating2 + this.K * (0.5 - expectedScore2));
          } else {
            player1.rank = Math.round(rating1 + this.K * (1 - expectedScore1));
            player2.rank = Math.round(rating2 + this.K * (0 - expectedScore2));
          }

          return Promise.all([
            this.playerRepository.save(player1),
            this.playerRepository.save(player2),
          ]).then(() => {
            const newMatch = this.matchRepository.create(match);
            return this.matchRepository.save(newMatch).then(() => {
              this.eventEmitterService.emit('ranking.update', player1);
              this.eventEmitterService.emit('ranking.update', player2);

              return {
                winner: { id: player1.id, rank: player1.rank },
                loser: { id: player2.id, rank: player2.rank },
                match: newMatch,
              };
            });
          });
        });
      });
  }
}
