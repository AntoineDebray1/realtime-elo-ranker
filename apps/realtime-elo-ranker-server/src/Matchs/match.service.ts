import { Injectable } from '@nestjs/common';
// import { Match } from './interfaces/match.interface';
import { Player } from '../entities/player.entity';
import { RankingService } from '../Ranking/ranking.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Match } from '../entities/match.entity';

@Injectable()
export class MatchService {
  private K = 32;

  constructor(
    private readonly rankingService: RankingService,
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
    @InjectRepository(Match)
    private matchRepository: Repository<Match>,
  ) {}

  private async getPlayerById(id: string): Promise<Player | undefined> {
    const players: Player[] = await this.rankingService.getRanking();
    return players.find((player: Player) => player.id === id);
  }

  async setMatch(match: Match) {
    const player1 = await this.getPlayerById(match.winner);
    const player2 = await this.getPlayerById(match.loser);

    if (!player1 || !player2) {
      throw new Error('Player not found');
    }

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

    await this.playerRepository.save(player1);
    await this.playerRepository.save(player2);

    const newMatch = this.matchRepository.create(match);
    await this.matchRepository.save(newMatch);

    return {
      winner: {
        id: player1.id,
        rank: player1.rank,
      },
      loser: {
        id: player2.id,
        rank: player2.rank,
      },
      match: newMatch,
    };
  }
}
