using Microsoft.EntityFrameworkCore.Migrations;

namespace SimpleAts.Migrations
{
  public partial class AddUniqueIndexEmail : Migration
  {
    protected override void Up(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.CreateIndex(
        "ix_users_email",
        "users",
        "email",
        unique: true);
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.DropIndex(
        "ix_users_email",
        "users");
    }
  }
}
