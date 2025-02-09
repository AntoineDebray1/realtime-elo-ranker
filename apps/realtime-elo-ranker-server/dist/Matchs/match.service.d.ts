import { Repository } from 'typeorm';
import { Player } from '../entities/player.entity';
import { Match } from '../entities/match.entity';
import { EventEmitterService } from '../event-emitter/event-emitter.service';
export declare class MatchService {
    private readonly playerRepository;
    private readonly matchRepository;
    private readonly eventEmitterService;
    private readonly K;
    constructor(playerRepository: Repository<Player>, matchRepository: Repository<Match>, eventEmitterService: EventEmitterService);
    private getPlayerById;
    setMatch(match: Match): Promise<any>;
}
