import { PlayerService } from './player.service';
import { Response } from 'express';
import { CreatePlayerDTO } from './dto/create-player.dto';
import { Player } from '../entities/player.entity';
import { EventEmitterService } from '../event-emitter/event-emitter.service';
export declare class PlayersController {
    private readonly playerService;
    private readonly eventEmitter;
    constructor(playerService: PlayerService, eventEmitter: EventEmitterService);
    setPlayerName(createPlayerDTO: CreatePlayerDTO, res: Response): Promise<Response<any, Record<string, any>>>;
    getPlayer(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    getRankingEvents(): import("rxjs").Observable<{
        data: {
            type: string;
            player: Player;
        };
    }>;
}
