using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SAMS_WebAPI.Migrations
{
    public partial class UpdateCompanyTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "NumberOfEmployees",
                table: "Companies",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NumberOfEmployees",
                table: "Companies");
        }
    }
}
