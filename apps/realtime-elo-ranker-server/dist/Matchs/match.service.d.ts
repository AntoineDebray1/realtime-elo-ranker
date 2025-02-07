import { Player } from '../entities/player.entity';
import { RankingService } from '../Ranking/ranking.service';
import { Repository } from 'typeorm';
import { Match } from '../entities/match.entity';
export declare class MatchService {
    private readonly rankingService;
    private readonly playerRepository;
    private matchRepository;
    private K;
    constructor(rankingService: RankingService, playerRepository: Repository<Player>, matchRepository: Repository<Match>);
    private getPlayerById;
    setMatch(match: Match): Promise<{
        winner: {
            id: string;
            rank: number;
        };
        loser: {
            id: string;
            rank: number;
        };
        match: Match;
    }>;
}
