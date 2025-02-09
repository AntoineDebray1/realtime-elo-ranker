import { Body, Controller, Post, Res, Sse, HttpException, HttpStatus } from '@nestjs/common';
import { PlayerService } from './player.service';
import { Response } from 'express';
import { CreatePlayerDTO } from './dto/create-player.dto';
import { fromEvent } from 'rxjs';
import { Player } from '../entities/player.entity';
import { EventEmitterService } from '../event-emitter/event-emitter.service';
import { map } from 'rxjs/operators';

@Controller()
export class PlayersController {
  constructor(
    private readonly playerService: PlayerService,
    private readonly eventEmitter: EventEmitterService,
  ) {}

  @Post('/api/player')
  async setPlayerName(@Body() createPlayerDTO: CreatePlayerDTO, @Res() res: Response) {
    try {
      const result = await this.playerService.setPlayerName(createPlayerDTO);
      return res.status(200).json(result);
    } catch (error) {
      if (error instanceof HttpException) {
        return res.status(error.getStatus()).json(error.getResponse());
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        code: 500,
        message: 'Internal server error',
      });
    }
  }

  @Sse('api/ranking/events')
  getRankingEvents() {
    return fromEvent(this.eventEmitter.getEventEmitter(), 'ranking.update').pipe(
      map((player: Player) => ({
        data: { type: 'RankingUpdate', player },
      })),
    );
  }
}
