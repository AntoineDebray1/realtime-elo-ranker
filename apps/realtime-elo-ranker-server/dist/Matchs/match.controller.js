"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchsController = void 0;
const common_1 = require("@nestjs/common");
const match_service_1 = require("./match.service");
const match_entity_1 = require("../entities/match.entity");
const event_emitter_service_1 = require("../event-emitter/event-emitter.service");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
let MatchsController = class MatchsController {
    constructor(matchService, eventEmitter) {
        this.matchService = matchService;
        this.eventEmitter = eventEmitter;
    }
    setMatch(match, res) {
        this.matchService.setMatch(match)
            .then((result) => res.status(200).json(result))
            .catch((error) => {
            if (error instanceof common_1.HttpException) {
                return res.status(error.getStatus()).json(error.getResponse());
            }
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                code: 500,
                message: 'Internal server error',
            });
        });
    }
    getMatchEvents() {
        return (0, rxjs_1.fromEvent)(this.eventEmitter.getEventEmitter(), 'match.update').pipe((0, operators_1.map)((match) => ({
            data: { type: 'MatchUpdate', match },
        })));
    }
};
exports.MatchsController = MatchsController;
__decorate([
    (0, common_1.Post)('/api/match'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [match_entity_1.Match, Object]),
    __metadata("design:returntype", void 0)
], MatchsController.prototype, "setMatch", null);
__decorate([
    (0, common_1.Sse)('api/ranking/events'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MatchsController.prototype, "getMatchEvents", null);
exports.MatchsController = MatchsController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [match_service_1.MatchService,
        event_emitter_service_1.EventEmitterService])
], MatchsController);
//# sourceMappingURL=match.controller.js.map