using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SAMS_WebAPI.Migrations
{
    public partial class UpdateCompanies : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "NumberOfAdmins",
                table: "Companies",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "Allowed",
                table: "Companies",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NumberOfAdmins",
                table: "Companies");

            migrationBuilder.DropColumn(
                name: "Allowed",
                table: "Companies");
        }
    }
}
