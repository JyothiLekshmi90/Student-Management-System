using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StudentManagementSystem.Migrations
{
    /// <inheritdoc />
    public partial class marktb : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Marks",
                columns: table => new
                {
                    Mark_Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Student_Id = table.Column<int>(type: "int", nullable: false),
                    English = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Hindi = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Malayalam = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Maths = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    History = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Geography = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Biology = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Physics = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Chemistry = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Computer = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Marks", x => x.Mark_Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Marks");
        }
    }
}
