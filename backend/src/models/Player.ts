import { v4 as uuid } from "uuid";

class Player {
  id?: string;
  nome: string;
  phone: string;
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Player };
