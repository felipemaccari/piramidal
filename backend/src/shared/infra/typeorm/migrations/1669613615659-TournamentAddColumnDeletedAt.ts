import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class TournamentAddColumnDeletedAt1669613615659
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "tournaments",
      new TableColumn({
        name: "deletedAt",
        type: "timestamp",
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("tournaments", "deletedAt");
  }
}
