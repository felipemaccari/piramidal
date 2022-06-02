import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";

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

  @Column({ type: "uuid" })
  originPlayerID: string;

  @Column({ type: "uuid" })
  destinationPlayerID: string;

  @Column({ type: "uuid" })
  tournamentID: string;

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
