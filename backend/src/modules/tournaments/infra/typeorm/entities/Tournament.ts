import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("tournaments")
class Tournament {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  description: string;

  @Column()
  initialDate: Date;

  @Column()
  finalDate: Date;

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

export default Tournament;
