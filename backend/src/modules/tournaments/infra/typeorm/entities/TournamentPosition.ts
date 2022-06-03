import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("tournamentsPositions")
class TournamentPositions {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  position: string;

  @Column({ type: "uuid" })
  playerID: Date;

  @Column({ type: "uuid" })
  tournamentID: Date;

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

export default TournamentPositions;
