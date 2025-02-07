"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GustomEventEmitterModule = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const event_emitter_service_1 = require("../event-emitter/event-emitter.service");
let GustomEventEmitterModule = class GustomEventEmitterModule {
};
exports.GustomEventEmitterModule = GustomEventEmitterModule;
exports.GustomEventEmitterModule = GustomEventEmitterModule = __decorate([
    (0, common_1.Module)({
        imports: [event_emitter_1.EventEmitterModule.forRoot()],
        providers: [event_emitter_service_1.EventEmitterService],
        exports: [event_emitter_service_1.EventEmitterService],
    })
], GustomEventEmitterModule);
//# sourceMappingURL=event-emitter.module.js.map