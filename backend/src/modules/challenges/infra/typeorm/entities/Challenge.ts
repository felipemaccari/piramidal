import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("challenges")
class Challenge {
  @PrimaryColumn()
  id?: string;

  @Column()
  challengeePlayer: string;

  @Column()
  challengedPlayer: string;

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

  @CreateDateColumn()
  createdAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default Challenge;
