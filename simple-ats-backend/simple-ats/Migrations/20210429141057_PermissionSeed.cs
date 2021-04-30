using Microsoft.EntityFrameworkCore.Migrations;

namespace SimpleAts.Migrations
{
  public partial class PermissionSeed : Migration
  {
    protected override void Up(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.InsertData(
        "permissions",
        new[] {"id", "code", "description"},
        new object[] {1, "register_job_vacancy", "register job a new vacancy"});

      migrationBuilder.InsertData(
        "permissions",
        new[] {"id", "code", "description"},
        new object[] {2, "delete_job_vacancy", "delete a job vacancy"});

      migrationBuilder.InsertData(
        "permissions",
        new[] {"id", "code", "description"},
        new object[] {3, "apply_job", "apply for a job vacancy"});
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.DeleteData(
        "permissions",
        "id",
        1);

      migrationBuilder.DeleteData(
        "permissions",
        "id",
        3);

      migrationBuilder.DeleteData(
        "permissions",
        "id",
        3);
    }
  }
}
