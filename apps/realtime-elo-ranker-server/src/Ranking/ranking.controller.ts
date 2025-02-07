import { Controller, Get, Res, Sse } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { Response } from 'express';
import { EventEmitterService } from '../event-emitter/event-emitter.service';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';
import { Player } from '../entities/player.entity';

@Controller()
export class RankingController {
  constructor(
    private readonly rankingService: RankingService,
    private readonly eventEmitterService: EventEmitterService,
  ) {}

  @Get('/api/ranking')
  async getRanking(@Res() res: Response) {
    try {
      const players = await this.rankingService.getRanking();
      return res.status(200).json(players);
    } catch {
      return res.status(500).json({
        code: 0,
        message: 'Failed to get ranking',
      });
    }
  }

  @Sse('/api/ranking/events')
  getRankingUpdates() {
    console.log('SSE - En attente des mises à jour du classement...');
    return fromEvent(
      this.eventEmitterService.getEventEmitter(),
      'ranking.update',
    ).pipe(
      map((player: Player) => {
        console.log('SSE - Événement reçu :', player);
        return <MessageEvent>{
          data: {
            type: 'RankingUpdate',
            player: player,
          },
        };
      }),
    );
  }
}
