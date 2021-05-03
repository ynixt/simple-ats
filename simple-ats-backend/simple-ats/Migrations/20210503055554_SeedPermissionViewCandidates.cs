using Microsoft.EntityFrameworkCore.Migrations;

namespace SimpleAts.Migrations
{
    public partial class SeedPermissionViewCandidates : Migration
    {
    protected override void Up(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.InsertData(
       "permissions",
       new[] { "id", "code", "description" },
       new object[] { 5, "view_candidates", "view candidates" });

      migrationBuilder.InsertData(
        "permission_role",
        new[] { "roles_id", "role_permissions_id" },
        new object[] { 1, 5 });

      migrationBuilder.InsertData(
        "permission_role",
        new[] { "roles_id", "role_permissions_id" },
        new object[] { 2, 5 });
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.DeleteData(
        "permissions",
        "id",
        5);
    }
  }
}
