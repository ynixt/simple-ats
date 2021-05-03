using Microsoft.EntityFrameworkCore.Migrations;

namespace SimpleAts.Migrations
{
  public partial class SeedPermissionDashboard : Migration
  {
    protected override void Up(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.InsertData(
       "permissions",
       new[] { "id", "code", "description" },
       new object[] { 4, "view_dashboard", "view dashboard" });

      migrationBuilder.InsertData(
        "permission_role",
        new[] { "roles_id", "role_permissions_id" },
        new object[] { 1, 4 });

      migrationBuilder.InsertData(
        "permission_role",
        new[] { "roles_id", "role_permissions_id" },
        new object[] { 2, 4 });
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.DeleteData(
        "permissions",
        "id",
        4);
    }
  }
}
