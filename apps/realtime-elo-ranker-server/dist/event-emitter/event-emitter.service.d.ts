import { EventEmitter2 } from 'eventemitter2';
export declare class EventEmitterService {
    private readonly eventEmitter;
    constructor();
    getEventEmitter(): EventEmitter2;
    emit<T = unknown>(event: string, data: T): void;
}
