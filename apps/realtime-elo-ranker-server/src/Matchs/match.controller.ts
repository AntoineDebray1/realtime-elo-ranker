import { Body, Controller, Post, Res } from '@nestjs/common';
import { MatchService } from './match.service';
import { Match } from '../entities/match.entity';
import { Response } from 'express';

@Controller()
export class MatchsController {
  constructor(private MatchService: MatchService) {}

  @Post('/api/match')
  setMatch(@Body() match: Match, @Res() res: Response) {
    this.MatchService.setMatch(match)
      .then((result) => {
        return res.status(201).json(result);
      })
      .catch(() => {
        return res.status(422).json({
          code: 0,
          message: 'No players found',
        });
      });
  }
}
