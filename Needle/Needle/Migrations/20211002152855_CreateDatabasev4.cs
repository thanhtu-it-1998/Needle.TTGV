using Microsoft.EntityFrameworkCore.Migrations;

namespace Needle.Migrations
{
    public partial class CreateDatabasev4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "InforMedicans",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdVaccinatePerson = table.Column<int>(type: "int", nullable: false),
                    StandardOne = table.Column<bool>(type: "bit", nullable: false),
                    StandardTwo = table.Column<bool>(type: "bit", nullable: false),
                    StandardThree = table.Column<bool>(type: "bit", nullable: false),
                    StandardFour = table.Column<bool>(type: "bit", nullable: false),
                    StandardFive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InforMedicans", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "InforMedicans");
        }
    }
}
