"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const player_entity_1 = require("../entities/player.entity");
const match_entity_1 = require("../entities/match.entity");
const match_controller_1 = require("./match.controller");
const match_service_1 = require("./match.service");
const player_module_1 = require("../Player/player.module");
const ranking_module_1 = require("../Ranking/ranking.module");
const event_emitter_module_1 = require("../event-emitter/event-emitter.module");
let MatchModule = class MatchModule {
};
exports.MatchModule = MatchModule;
exports.MatchModule = MatchModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([player_entity_1.Player, match_entity_1.Match]),
            player_module_1.PlayerModule,
            ranking_module_1.RankingModule,
            event_emitter_module_1.GustomEventEmitterModule,
        ],
        controllers: [match_controller_1.MatchsController],
        providers: [match_service_1.MatchService],
        exports: [match_service_1.MatchService],
    })
], MatchModule);
//# sourceMappingURL=matchs.module.js.map