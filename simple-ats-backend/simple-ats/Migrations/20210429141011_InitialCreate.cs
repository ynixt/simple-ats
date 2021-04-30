using Microsoft.EntityFrameworkCore.Migrations;

namespace SimpleAts.Migrations
{
  public partial class InitialCreate : Migration
  {
    protected override void Up(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.CreateTable(
        "permissions",
        table => new
        {
          id = table.Column<int>("int", nullable: false)
            .Annotation("SqlServer:Identity", "1, 1"),
          code = table.Column<string>("nvarchar(100)", maxLength: 100, nullable: false),
          description = table.Column<string>("nvarchar(255)", maxLength: 255, nullable: true)
        },
        constraints: table => { table.PrimaryKey("pk_permissions", x => x.id); });

      migrationBuilder.CreateTable(
        "roles",
        table => new
        {
          id = table.Column<int>("int", nullable: false)
            .Annotation("SqlServer:Identity", "1, 1"),
          name = table.Column<string>("nvarchar(15)", maxLength: 15, nullable: false)
        },
        constraints: table => { table.PrimaryKey("pk_roles", x => x.id); });

      migrationBuilder.CreateTable(
        "permission_role",
        table => new
        {
          role_permissions_id = table.Column<int>("int", nullable: false),
          roles_id = table.Column<int>("int", nullable: false)
        },
        constraints: table =>
        {
          table.PrimaryKey("pk_permission_role", x => new {x.role_permissions_id, x.roles_id});
          table.ForeignKey(
            "fk_permission_role_permissions_role_permissions_id",
            x => x.role_permissions_id,
            "permissions",
            "id",
            onDelete: ReferentialAction.Cascade);
          table.ForeignKey(
            "fk_permission_role_roles_roles_id",
            x => x.roles_id,
            "roles",
            "id",
            onDelete: ReferentialAction.Cascade);
        });

      migrationBuilder.CreateTable(
        "users",
        table => new
        {
          id = table.Column<int>("int", nullable: false)
            .Annotation("SqlServer:Identity", "1, 1"),
          name = table.Column<string>("nvarchar(30)", maxLength: 30, nullable: false),
          email = table.Column<string>("nvarchar(50)", maxLength: 50, nullable: false),
          password = table.Column<string>("nvarchar(76)", maxLength: 76, nullable: false),
          role_id = table.Column<int>("int", nullable: true)
        },
        constraints: table =>
        {
          table.PrimaryKey("pk_users", x => x.id);
          table.ForeignKey(
            "fk_users_roles_role_id",
            x => x.role_id,
            "roles",
            "id",
            onDelete: ReferentialAction.Restrict);
        });

      migrationBuilder.CreateIndex(
        "ix_permission_role_roles_id",
        "permission_role",
        "roles_id");

      migrationBuilder.CreateIndex(
        "ix_users_role_id",
        "users",
        "role_id");
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.DropTable(
        "permission_role");

      migrationBuilder.DropTable(
        "users");

      migrationBuilder.DropTable(
        "permissions");

      migrationBuilder.DropTable(
        "roles");
    }
  }
}
