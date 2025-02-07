import { PlayerService } from './player.service';
import { Response } from 'express';
import { CreatePlayerDTO } from './dto/create-player.dto';
import { EventEmitterService } from '../event-emitter/event-emitter.service';
export declare class PlayersController {
    private readonly PlayersService;
    private readonly eventEmitter;
    constructor(PlayersService: PlayerService, eventEmitter: EventEmitterService);
    setPlayerName(createPlayerDTO: CreatePlayerDTO, res: Response): Response<any, Record<string, any>>;
    getRankingEvents(): import("rxjs").Observable<MessageEvent<any>>;
}
