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
const player_entity_1 = require("../entities/player.entity");
const ranking_service_1 = require("../Ranking/ranking.service");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const match_entity_1 = require("../entities/match.entity");
let MatchService = class MatchService {
    constructor(rankingService, playerRepository, matchRepository) {
        this.rankingService = rankingService;
        this.playerRepository = playerRepository;
        this.matchRepository = matchRepository;
        this.K = 32;
    }
    async getPlayerById(id) {
        const players = await this.rankingService.getRanking();
        return players.find((player) => player.id === id);
    }
    async setMatch(match) {
        const player1 = await this.getPlayerById(match.winner);
        const player2 = await this.getPlayerById(match.loser);
        if (!player1 || !player2) {
            throw new Error('Player not found');
        }
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
        await this.playerRepository.save(player1);
        await this.playerRepository.save(player2);
        const newMatch = this.matchRepository.create(match);
        await this.matchRepository.save(newMatch);
        return {
            winner: {
                id: player1.id,
                rank: player1.rank,
            },
            loser: {
                id: player2.id,
                rank: player2.rank,
            },
            match: newMatch,
        };
    }
};
exports.MatchService = MatchService;
exports.MatchService = MatchService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(player_entity_1.Player)),
    __param(2, (0, typeorm_1.InjectRepository)(match_entity_1.Match)),
    __metadata("design:paramtypes", [ranking_service_1.RankingService,
        typeorm_2.Repository,
        typeorm_2.Repository])
], MatchService);
//# sourceMappingURL=match.service.js.map