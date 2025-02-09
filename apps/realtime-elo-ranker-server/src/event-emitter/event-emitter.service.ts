import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from 'eventemitter2';

@Injectable()
export class EventEmitterService {
  constructor(
    private readonly eventEmitter: EventEmitter2,
  ) {}

  getEventEmitter(): EventEmitter2 {
    return this.eventEmitter;
  }

  emit<T = unknown>(event: string, data: T): void {
    if (typeof event !== 'string') {
      throw new Error('Event name must be a string');
    }
    this.eventEmitter.emit(event, data);
  }
}
