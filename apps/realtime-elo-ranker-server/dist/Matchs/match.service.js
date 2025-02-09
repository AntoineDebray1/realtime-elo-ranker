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
exports.MatchService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const player_entity_1 = require("../entities/player.entity");
const match_entity_1 = require("../entities/match.entity");
const event_emitter_service_1 = require("../event-emitter/event-emitter.service");
let MatchService = class MatchService {
    constructor(playerRepository, matchRepository, eventEmitterService) {
        this.playerRepository = playerRepository;
        this.matchRepository = matchRepository;
        this.eventEmitterService = eventEmitterService;
        this.K = 32;
    }
    getPlayerById(id) {
        return this.playerRepository.findOne({ where: { id } }).then((player) => {
            if (!player) {
                throw new common_1.HttpException({ code: 422, message: `Player with ID ${id} not found` }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
            }
            return player;
        });
    }
    setMatch(match) {
        return this.getPlayerById(match.winner)
            .then((player1) => {
            return this.getPlayerById(match.loser).then((player2) => {
                const rating1 = player1.rank;
                const rating2 = player2.rank;
                const expectedScore1 = 1 / (1 + Math.pow(10, (rating2 - rating1) / 400));
                const expectedScore2 = 1 / (1 + Math.pow(10, (rating1 - rating2) / 400));
                if (match.draw) {
                    player1.rank = Math.round(rating1 + this.K * (0.5 - expectedScore1));
                    player2.rank = Math.round(rating2 + this.K * (0.5 - expectedScore2));
                }
                else {
                    player1.rank = Math.round(rating1 + this.K * (1 - expectedScore1));
                    player2.rank = Math.round(rating2 + this.K * (0 - expectedScore2));
                }
                return Promise.all([
                    this.playerRepository.save(player1),
                    this.playerRepository.save(player2),
                ]).then(() => {
                    const newMatch = this.matchRepository.create(match);
                    return this.matchRepository.save(newMatch).then(() => {
                        this.eventEmitterService.emit('ranking.update', player1);
                        this.eventEmitterService.emit('ranking.update', player2);
                        return {
                            winner: { id: player1.id, rank: player1.rank },
                            loser: { id: player2.id, rank: player2.rank },
                            match: newMatch,
                        };
                    });
                });
            });
        });
    }
};
exports.MatchService = MatchService;
exports.MatchService = MatchService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(player_entity_1.Player)),
    __param(1, (0, typeorm_1.InjectRepository)(match_entity_1.Match)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        event_emitter_service_1.EventEmitterService])
], MatchService);
//# sourceMappingURL=match.service.js.map