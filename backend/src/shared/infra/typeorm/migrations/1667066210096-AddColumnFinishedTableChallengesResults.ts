import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddColumnFinishedTableChallengesResults1667066210096
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "challengesResults",
      new TableColumn({
        name: "finished",
        type: "boolean",
        default: false,
        isNullable: false,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("challengesResults", "finished");
  }
}
