import { v4 as uuid } from "uuid";

class User {
  id?: string;
  name: string;
  email: string;
  password: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default User;
