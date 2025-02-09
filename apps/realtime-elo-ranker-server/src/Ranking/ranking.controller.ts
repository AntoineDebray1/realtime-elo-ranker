import { Controller, Get, Res, Sse, HttpException, HttpStatus } from '@nestjs/common';
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
  getRanking(@Res() res: Response) {
    this.rankingService.getRanking()
      .then((players) => res.status(200).json(players))
      .catch((error) => {
        if (error instanceof HttpException) {
          return res.status(error.getStatus()).json(error.getResponse());
        }
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          code: 500,
          message: 'Failed to get ranking',
        });
      });
  }

  @Sse('/api/ranking/events')
  getRankingUpdates() {
    return fromEvent(
      this.eventEmitterService.getEventEmitter(),
      'ranking.update',
    ).pipe(
      map((player: Player) => ({
        data: {
          type: 'RankingUpdate',
          player: {
            id: player.id,
            rank: player.rank,
          },
        },
      })),
    );
  }
}
