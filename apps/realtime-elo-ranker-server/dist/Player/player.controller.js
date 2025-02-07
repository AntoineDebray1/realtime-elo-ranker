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
exports.PlayersController = void 0;
const common_1 = require("@nestjs/common");
const player_service_1 = require("./player.service");
const create_player_dto_1 = require("./dto/create-player.dto");
const rxjs_1 = require("rxjs");
const event_emitter_service_1 = require("../event-emitter/event-emitter.service");
const operators_1 = require("rxjs/operators");
let PlayersController = class PlayersController {
    constructor(PlayersService, eventEmitter) {
        this.PlayersService = PlayersService;
        this.eventEmitter = eventEmitter;
    }
    setPlayerName(createPlayerDTO, res) {
        let result;
        try {
            result = this.PlayersService.setPlayerName(createPlayerDTO);
        }
        catch {
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
    getRankingEvents() {
        return (0, rxjs_1.fromEvent)(this.eventEmitter.getEventEmitter(), 'rankingUpdate').pipe((0, operators_1.map)((player) => {
            return {
                data: {
                    type: 'RankingUpdate',
                    player: player,
                },
            };
        }));
    }
};
exports.PlayersController = PlayersController;
__decorate([
    (0, common_1.Post)('/api/player'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_player_dto_1.CreatePlayerDTO, Object]),
    __metadata("design:returntype", void 0)
], PlayersController.prototype, "setPlayerName", null);
__decorate([
    (0, common_1.Sse)('api/ranking/events'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PlayersController.prototype, "getRankingEvents", null);
exports.PlayersController = PlayersController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [player_service_1.PlayerService,
        event_emitter_service_1.EventEmitterService])
], PlayersController);
//# sourceMappingURL=player.controller.js.map