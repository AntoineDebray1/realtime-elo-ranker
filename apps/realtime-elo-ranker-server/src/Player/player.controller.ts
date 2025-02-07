import { Body, Controller, Post, Res, Sse } from '@nestjs/common';
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
    private readonly PlayersService: PlayerService,
    private readonly eventEmitter: EventEmitterService,
  ) {}

  @Post('/api/player')
  setPlayerName(
    @Body() createPlayerDTO: CreatePlayerDTO,
    @Res() res: Response,
  ) {
    let result;
    try {
      result = this.PlayersService.setPlayerName(createPlayerDTO);
    } catch {
      if (createPlayerDTO.id === '') {
        return res.status(400).json({
          code: 0,
          message: 'No id found',
        });
      }
      return res.status(409).json({
        code: 0,
        message: 'Player already exists',
      });
    }
    return res.status(201).json(result);
  }
  @Sse('api/ranking/events')
  getRankingEvents() {
    return fromEvent(this.eventEmitter.getEventEmitter(), 'rankingUpdate').pipe(
      map((player: Player) => {
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
