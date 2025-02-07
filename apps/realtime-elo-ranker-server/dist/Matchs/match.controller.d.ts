import { MatchService } from './match.service';
import { Match } from '../entities/match.entity';
import { Response } from 'express';
export declare class MatchsController {
    private MatchService;
    constructor(MatchService: MatchService);
    setMatch(match: Match, res: Response): void;
}
