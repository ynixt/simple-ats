using Microsoft.EntityFrameworkCore.Migrations;
using SimpleAts.Core;

namespace SimpleAts.Migrations
{
  public partial class UserSeed : Migration
  {
    protected override void Up(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.InsertData(
        "users",
        new[] {"id", "name", "email", "password", "role_id"},
        new object[] {1, "admin", "admin@teste.com", PasswordUtil.hash("123456"), 1});

      migrationBuilder.InsertData(
        "users",
        new[] {"id", "name", "email", "password", "role_id"},
        new object[] {2, "recruiter", "recruiter@teste.com", PasswordUtil.hash("123456"), 2});

      migrationBuilder.InsertData(
        "users",
        new[] {"id", "name", "email", "password", "role_id"},
        new object[] {3, "Jon Snow", "snow@north.com", PasswordUtil.hash("123456"), 3});
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.DeleteData(
        "users",
        "id",
        1);

      migrationBuilder.DeleteData(
        "users",
        "id",
        2);

      migrationBuilder.DeleteData(
        "users",
        "id",
        3);
    }
  }
}
