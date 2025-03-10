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
exports.RankingController = void 0;
const common_1 = require("@nestjs/common");
const ranking_service_1 = require("./ranking.service");
const event_emitter_service_1 = require("../event-emitter/event-emitter.service");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
let RankingController = class RankingController {
    constructor(rankingService, eventEmitterService) {
        this.rankingService = rankingService;
        this.eventEmitterService = eventEmitterService;
    }
    getRanking(res) {
        this.rankingService.getRanking()
            .then((players) => res.status(200).json(players))
            .catch((error) => {
            if (error instanceof common_1.HttpException) {
                return res.status(error.getStatus()).json(error.getResponse());
            }
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                code: 500,
                message: 'Failed to get ranking',
            });
        });
    }
    getRankingUpdates() {
        return (0, rxjs_1.fromEvent)(this.eventEmitterService.getEventEmitter(), 'ranking.update').pipe((0, operators_1.map)((player) => ({
            data: {
                type: 'RankingUpdate',
                player: {
                    id: player.id,
                    rank: player.rank,
                },
            },
        })));
    }
};
exports.RankingController = RankingController;
__decorate([
    (0, common_1.Get)('/api/ranking'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RankingController.prototype, "getRanking", null);
__decorate([
    (0, common_1.Sse)('/api/ranking/events'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RankingController.prototype, "getRankingUpdates", null);
exports.RankingController = RankingController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [ranking_service_1.RankingService,
        event_emitter_service_1.EventEmitterService])
], RankingController);
//# sourceMappingURL=ranking.controller.js.map