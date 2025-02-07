// filepath: /home/iut45/Etudiants/o22202147/Documents/dev_avancé_tp/realtime-elo-ranker/apps/realtime-elo-ranker-server/src/Player/entities/player-entity.ts
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Player {
  @PrimaryColumn()
  id: string;

  @Column()
  rank: number;
}
