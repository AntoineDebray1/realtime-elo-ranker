import { RankingService } from './ranking.service';
import { Response } from 'express';
import { EventEmitterService } from '../event-emitter/event-emitter.service';
export declare class RankingController {
    private readonly rankingService;
    private readonly eventEmitterService;
    constructor(rankingService: RankingService, eventEmitterService: EventEmitterService);
    getRanking(res: Response): void;
    getRankingUpdates(): import("rxjs").Observable<{
        data: {
            type: string;
            player: {
                id: string;
                rank: number;
            };
        };
    }>;
}
