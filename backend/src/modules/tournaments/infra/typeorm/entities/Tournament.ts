import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("tournaments")
class Tournament {
  @PrimaryColumn()
  id?: string;

  @Column()
  description: string;

  @Column()
  initialDate: Date;

  @Column()
  finalDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default Tournament;
