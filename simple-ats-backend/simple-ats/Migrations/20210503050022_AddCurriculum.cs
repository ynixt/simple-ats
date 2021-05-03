using Microsoft.EntityFrameworkCore.Migrations;

namespace SimpleAts.Migrations
{
  public partial class AddCurriculum : Migration
  {
    protected override void Up(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.AddColumn<string>(
        "curriculum",
        "users",
        "nvarchar(1000)",
        maxLength: 1000,
        nullable: true);
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.DropColumn(
        "curriculum",
        "users");
    }
  }
}
