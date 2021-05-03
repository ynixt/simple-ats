using Microsoft.EntityFrameworkCore.Migrations;

namespace SimpleAts.Migrations
{
    public partial class AddCurriculum : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "curriculum",
                table: "users",
                type: "nvarchar(1000)",
                maxLength: 1000,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "curriculum",
                table: "users");
        }
    }
}
