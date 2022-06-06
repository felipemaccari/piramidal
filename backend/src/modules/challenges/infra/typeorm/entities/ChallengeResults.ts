import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";

import Challenge from "./Challenge";

@Entity("challengesResults")
class ChallengeResults {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  gameDate: Date;

  @Column()
  originPlayerGiveup: boolean;

  @Column()
  destinationPlayerGiveup: boolean;

  @Column()
  refused: boolean;

  @Column()
  expired: boolean;

  @Column()
  originPlayerFirstSet: number;

  @Column()
  destinationPlayerFirstSet: number;

  @Column()
  originPlayerSecondSet: number;

  @Column()
  destinationPlayerSecondSet: number;

  @Column()
  originPlayerTiebreak: number;

  @Column()
  destinationPlayerTiebreak: number;

  @Column()
  originPlayerPoints: number;

  @Column()
  destinationPlayerPoints: number;

  @OneToOne(() => Challenge)
  @JoinColumn()
  challengeID: Challenge;

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

export default ChallengeResults;
