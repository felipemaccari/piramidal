import { v4 as uuid } from "uuid";

class Challenge {
  id?: string;
  challengeePlayer: string;
  challengedPlayer: string;
  initialDate: Date;
  finalDate: Date;
  gameDate: Date;
  challengeeGiveup: boolean;
  challengedGiveup: boolean;
  refused: boolean;
  expired: boolean;
  challengeeFirstSet: number;
  challengedFirstSet: number;
  challengeeSecondSet: number;
  challengedSecondSet: number;
  challengeeTiebreak: number;
  challengedTiebreak: number;
  challengeePoints: number;
  challengedPoints: number;
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default Challenge;
