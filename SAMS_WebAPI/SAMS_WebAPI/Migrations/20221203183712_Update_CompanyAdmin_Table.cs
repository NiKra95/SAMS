using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SAMS_WebAPI.Migrations
{
    public partial class Update_CompanyAdmin_Table : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "CompanyCreator",
                table: "CompanyAdmins",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CompanyCreator",
                table: "CompanyAdmins");
        }
    }
}
