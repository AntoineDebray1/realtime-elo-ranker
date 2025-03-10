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
exports.PlayerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const player_entity_1 = require("../entities/player.entity");
const event_emitter_service_1 = require("../event-emitter/event-emitter.service");
let PlayerService = class PlayerService {
    findOne(id) {
        return this.players.findOne({ where: { id } }).then(player => player ?? undefined);
    }
    constructor(players, eventEmitterService) {
        this.players = players;
        this.eventEmitterService = eventEmitterService;
    }
    setPlayerName(createPlayerDTO) {
        if (!createPlayerDTO.id || createPlayerDTO.id.trim() === '') {
            return Promise.reject(new common_1.HttpException({ code: 400, message: 'Player id is required' }, common_1.HttpStatus.BAD_REQUEST));
        }
        return this.players
            .findOne({ where: { id: createPlayerDTO.id } })
            .then((existingPlayer) => {
            if (existingPlayer) {
                throw new common_1.HttpException({ code: 409, message: 'Player already exists' }, common_1.HttpStatus.CONFLICT);
            }
            if (createPlayerDTO.rank !== undefined) {
                return createPlayerDTO.rank;
            }
            return this.calculateAverageRank();
        })
            .then((averageRank) => {
            const newPlayer = this.players.create(createPlayerDTO);
            newPlayer.rank = createPlayerDTO.rank ?? averageRank;
            return this.players.save(newPlayer);
        })
            .then((savedPlayer) => {
            this.eventEmitterService.emit('ranking.update', savedPlayer);
            return savedPlayer;
        });
    }
    calculateAverageRank() {
        return this.players.find().then((players) => {
            return players.length === 0
                ? 1000
                : Math.round(players.reduce((sum, p) => sum + p.rank, 0) / players.length);
        });
    }
    findAll() {
        return this.players.find();
    }
};
exports.PlayerService = PlayerService;
exports.PlayerService = PlayerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(player_entity_1.Player)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        event_emitter_service_1.EventEmitterService])
], PlayerService);
//# sourceMappingURL=player.service.js.map