using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StudentManagementSystem.Migrations
{
    /// <inheritdoc />
    public partial class days : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Total_Days",
                table: "Attendances",
                newName: "TotalDays");

            migrationBuilder.RenameColumn(
                name: "Present_Days",
                table: "Attendances",
                newName: "PresentDays");

            migrationBuilder.AddColumn<int>(
                name: "AbsentDays",
                table: "Attendances",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AbsentDays",
                table: "Attendances");

            migrationBuilder.RenameColumn(
                name: "TotalDays",
                table: "Attendances",
                newName: "Total_Days");

            migrationBuilder.RenameColumn(
                name: "PresentDays",
                table: "Attendances",
                newName: "Present_Days");
        }
    }
}
