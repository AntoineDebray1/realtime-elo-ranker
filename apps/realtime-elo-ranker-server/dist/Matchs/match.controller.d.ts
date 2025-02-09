import { MatchService } from './match.service';
import { Match } from '../entities/match.entity';
import { Response } from 'express';
import { EventEmitterService } from '../event-emitter/event-emitter.service';
export declare class MatchsController {
    private readonly matchService;
    private readonly eventEmitter;
    constructor(matchService: MatchService, eventEmitter: EventEmitterService);
    setMatch(match: Match, res: Response): void;
    getMatchEvents(): import("rxjs").Observable<{
        data: {
            type: string;
            match: Match;
        };
    }>;
}
