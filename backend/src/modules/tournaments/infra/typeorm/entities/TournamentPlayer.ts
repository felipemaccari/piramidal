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

  @Column()
  lineNumber: number;

  @Column({ type: "boolean", default: true })
  activeOnTournament: boolean;

  @Column({ type: "uuid" })
  playerID: string;

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

export default TournamentPlayer;
