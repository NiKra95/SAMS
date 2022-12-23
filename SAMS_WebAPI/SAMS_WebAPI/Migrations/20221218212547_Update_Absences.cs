using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SAMS_WebAPI.Migrations
{
    public partial class Update_Absences : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsApproved",
                table: "Absences");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Absences",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "AbsenceStatus",
                table: "Absences",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "Absences");

            migrationBuilder.DropColumn(
                name: "AbsenceStatus",
                table: "Absences");

            migrationBuilder.AddColumn<bool>(
                name: "IsApproved",
                table: "Absences",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
