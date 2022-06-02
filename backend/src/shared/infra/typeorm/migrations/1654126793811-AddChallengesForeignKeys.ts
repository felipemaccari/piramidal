import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

const FKChallengeTournament = new TableForeignKey({
  name: "FK_Challenge_Tournament",
  columnNames: ["tournamentID"],
  referencedColumnNames: ["id"],
  referencedTableName: "tournaments",
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});

const FKChallengeChalengeePlayer = new TableForeignKey({
  name: "FK_Challenge_Chalengee_Player",
  columnNames: ["challengeePlayerID"],
  referencedColumnNames: ["id"],
  referencedTableName: "players",
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});

const FKChallengeChalengedPlayer = new TableForeignKey({
  name: "FK_Challenge_Chalenged_Player",
  columnNames: ["challengedPlayerID"],
  referencedColumnNames: ["id"],
  referencedTableName: "players",
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});

export class AddChallengesForeignKeys1654126793811
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey("challenges", FKChallengeTournament);

    await queryRunner.createForeignKey(
      "challenges",
      FKChallengeChalengeePlayer
    );

    await queryRunner.createForeignKey(
      "challenges",
      FKChallengeChalengedPlayer
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKeys("challenges", [
      FKChallengeTournament,
      FKChallengeChalengeePlayer,
      FKChallengeChalengedPlayer,
    ]);
  }
}
