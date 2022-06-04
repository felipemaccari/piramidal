import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("tournamentsPlayers")
class TournamentPlayer {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  position: number;

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

export default TournamentPlayer;
