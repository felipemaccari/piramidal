import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";

import Player from "@modules/players/infra/typeorm/entities/Player";
import Tournament from "@modules/tournaments/infra/typeorm/entities/Tournament";

@Entity("challenges")
class Challenge {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  initialDate: Date;

  @Column()
  finalDate: Date;

  @Column()
  gameDate: Date;

  @Column()
  challengeeGiveup: boolean;

  @Column()
  challengedGiveup: boolean;

  @Column()
  refused: boolean;

  @Column()
  expired: boolean;

  @Column()
  challengeeFirstSet: number;

  @Column()
  challengedFirstSet: number;

  @Column()
  challengeeSecondSet: number;

  @Column()
  challengedSecondSet: number;

  @Column()
  challengeeTiebreak: number;

  @Column()
  challengedTiebreak: number;

  @Column()
  challengeePoints: number;

  @Column()
  challengedPoints: number;

  @Column({ type: "uuid" })
  challengeePlayerID: Player;

  @Column({ type: "uuid" })
  challengedPlayerID: Player;

  @Column({ type: "uuid" })
  tournamentID: Tournament;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default Challenge;
