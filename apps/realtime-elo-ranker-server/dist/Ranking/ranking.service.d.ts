import { OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Player } from '../entities/player.entity';
import { EventEmitterService } from '../event-emitter/event-emitter.service';
export declare class RankingService implements OnModuleInit {
    private readonly playerRepository;
    private readonly eventEmitterService;
    constructor(playerRepository: Repository<Player>, eventEmitterService: EventEmitterService);
    getRanking(): Promise<Player[]>;
    onModuleInit(): void;
}
