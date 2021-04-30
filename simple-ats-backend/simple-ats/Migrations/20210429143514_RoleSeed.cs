using Microsoft.EntityFrameworkCore.Migrations;

namespace SimpleAts.Migrations
{
  public partial class RoleSeed : Migration
  {
    protected override void Up(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.InsertData(
        "roles",
        new[] {"id", "name"},
        new object[] {1, "admin"});

      migrationBuilder.InsertData(
        "roles",
        new[] {"id", "name"},
        new object[] {2, "recruiter"});

      migrationBuilder.InsertData(
        "roles",
        new[] {"id", "name"},
        new object[] {3, "user"});

      CrateAdminPermissions(migrationBuilder);
      CrateRecruiterPermissions(migrationBuilder);
      CrateUserPermissions(migrationBuilder);
    }

    private void CrateAdminPermissions(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.InsertData(
        "permission_role",
        new[] {"roles_id", "role_permissions_id"},
        new object[] {1, 1});

      migrationBuilder.InsertData(
        "permission_role",
        new[] {"roles_id", "role_permissions_id"},
        new object[] {1, 2});

      migrationBuilder.InsertData(
        "permission_role",
        new[] {"roles_id", "role_permissions_id"},
        new object[] {1, 3});
    }

    private void CrateRecruiterPermissions(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.InsertData(
        "permission_role",
        new[] {"roles_id", "role_permissions_id"},
        new object[] {2, 1});

      migrationBuilder.InsertData(
        "permission_role",
        new[] {"roles_id", "role_permissions_id"},
        new object[] {2, 2});

      migrationBuilder.InsertData(
        "permission_role",
        new[] {"roles_id", "role_permissions_id"},
        new object[] {2, 3});
    }

    private void CrateUserPermissions(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.InsertData(
        "permission_role",
        new[] {"roles_id", "role_permissions_id"},
        new object[] {3, 3});
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.DeleteData(
        "roles",
        "id",
        1);

      migrationBuilder.DeleteData(
        "roles",
        "id",
        2);

      migrationBuilder.DeleteData(
        "roles",
        "id",
        3);

      migrationBuilder.Sql("delete from permission_role");
    }
  }
}
