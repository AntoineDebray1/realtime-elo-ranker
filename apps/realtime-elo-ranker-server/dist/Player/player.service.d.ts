import { Repository } from 'typeorm';
import { Player } from '../entities/player.entity';
import { CreatePlayerDTO } from './dto/create-player.dto';
import { EventEmitterService } from '../event-emitter/event-emitter.service';
export declare class PlayerService {
    private readonly players;
    private readonly eventEmitterService;
    findOne(id: string): Promise<Player | undefined>;
    constructor(players: Repository<Player>, eventEmitterService: EventEmitterService);
    setPlayerName(createPlayerDTO: CreatePlayerDTO): Promise<Player>;
    calculateAverageRank(): Promise<number>;
    findAll(): Promise<Player[]>;
}
