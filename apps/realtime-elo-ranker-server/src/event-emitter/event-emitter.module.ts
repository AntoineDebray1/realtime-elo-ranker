import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventEmitterService } from '../event-emitter/event-emitter.service';

@Module({
  imports: [EventEmitterModule.forRoot()], // Pas besoin de TypeOrmModule ici
  providers: [EventEmitterService],
  exports: [EventEmitterService],
})
export class GustomEventEmitterModule {}
