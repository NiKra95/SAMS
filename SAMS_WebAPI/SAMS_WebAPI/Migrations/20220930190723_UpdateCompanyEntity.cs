using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SAMS_WebAPI.Migrations
{
    public partial class UpdateCompanyEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Website",
                table: "Companies",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Website",
                table: "Companies");
        }
    }
}
