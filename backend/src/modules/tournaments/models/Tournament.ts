import { v4 as uuid } from "uuid";

class Tournament {
  id?: string;
  description: string;
  initialDate: Date;
  finalDate: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default Tournament;
