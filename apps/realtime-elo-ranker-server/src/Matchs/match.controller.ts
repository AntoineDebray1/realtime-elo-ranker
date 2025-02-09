import { Body, Controller, Post, Res, Sse, HttpException, HttpStatus } from '@nestjs/common';
import { MatchService } from './match.service';
import { Match } from '../entities/match.entity';
import { Response } from 'express';
import { EventEmitterService } from '../event-emitter/event-emitter.service';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

@Controller()
export class MatchsController {
  constructor(
    private readonly matchService: MatchService,
    private readonly eventEmitter: EventEmitterService
  ) {}

  @Post('/api/match')
  setMatch(@Body() match: Match, @Res() res: Response) {
    this.matchService.setMatch(match)
      .then((result) => res.status(200).json(result))
      .catch((error) => {
        if (error instanceof HttpException) {
          return res.status(error.getStatus()).json(error.getResponse());
        }
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          code: 500,
          message: 'Internal server error',
        });
      });
  }

  @Sse('api/ranking/events')
  getMatchEvents() {
    return fromEvent(this.eventEmitter.getEventEmitter(), 'match.update').pipe(
      map((match: Match) => ({
        data: { type: 'MatchUpdate', match },
      })),
    );
  }
}
