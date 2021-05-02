using Microsoft.EntityFrameworkCore.Migrations;

namespace SimpleAts.Migrations
{
  public partial class AddJobsVacancy : Migration
  {
    protected override void Up(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.DropForeignKey(
        "fk_users_roles_role_id",
        "users");

      migrationBuilder.AlterColumn<int>(
        "role_id",
        "users",
        "int",
        nullable: false,
        defaultValue: 0,
        oldClrType: typeof(int),
        oldType: "int",
        oldNullable: true);

      migrationBuilder.AlterColumn<string>(
        "password",
        "users",
        "nvarchar(76)",
        maxLength: 76,
        nullable: false,
        oldClrType: typeof(string),
        oldType: "nvarchar(50)",
        oldMaxLength: 50);

      migrationBuilder.CreateTable(
        "job_vacancies",
        table => new
        {
          id = table.Column<int>("int", nullable: false)
            .Annotation("SqlServer:Identity", "1, 1"),
          name = table.Column<string>("nvarchar(100)", maxLength: 100, nullable: false),
          description = table.Column<string>("nvarchar(1000)", maxLength: 1000, nullable: false)
        },
        constraints: table => { table.PrimaryKey("pk_job_vacancies", x => x.id); });

      migrationBuilder.CreateTable(
        "job_vacancy_user",
        table => new
        {
          candidates_id = table.Column<int>("int", nullable: false),
          vacancies_applied_id = table.Column<int>("int", nullable: false)
        },
        constraints: table =>
        {
          table.PrimaryKey("pk_job_vacancy_user", x => new {x.candidates_id, x.vacancies_applied_id});
          table.ForeignKey(
            "fk_job_vacancy_user_job_vacancies_vacancies_applied_id",
            x => x.vacancies_applied_id,
            "job_vacancies",
            "id",
            onDelete: ReferentialAction.Cascade);
          table.ForeignKey(
            "fk_job_vacancy_user_users_candidates_id",
            x => x.candidates_id,
            "users",
            "id",
            onDelete: ReferentialAction.Cascade);
        });

      migrationBuilder.CreateIndex(
        "ix_permissions_code",
        "permissions",
        "code",
        unique: true);

      migrationBuilder.CreateIndex(
        "ix_job_vacancy_user_vacancies_applied_id",
        "job_vacancy_user",
        "vacancies_applied_id");

      migrationBuilder.AddForeignKey(
        "fk_users_roles_role_id",
        "users",
        "role_id",
        "roles",
        principalColumn: "id",
        onDelete: ReferentialAction.Cascade);
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.DropForeignKey(
        "fk_users_roles_role_id",
        "users");

      migrationBuilder.DropTable(
        "job_vacancy_user");

      migrationBuilder.DropTable(
        "job_vacancies");

      migrationBuilder.DropIndex(
        "ix_permissions_code",
        "permissions");

      migrationBuilder.AlterColumn<int>(
        "role_id",
        "users",
        "int",
        nullable: true,
        oldClrType: typeof(int),
        oldType: "int");

      migrationBuilder.AlterColumn<string>(
        "password",
        "users",
        "nvarchar(50)",
        maxLength: 50,
        nullable: false,
        oldClrType: typeof(string),
        oldType: "nvarchar(76)",
        oldMaxLength: 76);

      migrationBuilder.AddForeignKey(
        "fk_users_roles_role_id",
        "users",
        "role_id",
        "roles",
        principalColumn: "id",
        onDelete: ReferentialAction.Restrict);
    }
  }
}
