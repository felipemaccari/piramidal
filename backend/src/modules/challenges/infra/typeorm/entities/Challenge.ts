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
