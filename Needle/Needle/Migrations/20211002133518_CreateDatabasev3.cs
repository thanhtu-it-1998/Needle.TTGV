using Microsoft.EntityFrameworkCore.Migrations;

namespace Needle.Migrations
{
    public partial class CreateDatabasev3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MedicalDeclarations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdVaccinatePerson = table.Column<int>(type: "int", nullable: false),
                    StandardOne = table.Column<bool>(type: "bit", nullable: false),
                    StandardTwo = table.Column<bool>(type: "bit", nullable: false),
                    StandardThree = table.Column<bool>(type: "bit", nullable: false),
                    StandardFour = table.Column<bool>(type: "bit", nullable: false),
                    StandardFive = table.Column<bool>(type: "bit", nullable: false),
                    StandardSix = table.Column<bool>(type: "bit", nullable: false),
                    StandardSeven = table.Column<bool>(type: "bit", nullable: false),
                    StandardEight = table.Column<bool>(type: "bit", nullable: false),
                    StandardNine = table.Column<bool>(type: "bit", nullable: false),
                    StandardTen = table.Column<bool>(type: "bit", nullable: false),
                    StandardEleven = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StandardTwelve = table.Column<bool>(type: "bit", nullable: false),
                    StandardThirteen = table.Column<bool>(type: "bit", nullable: false),
                    StandardFourteen = table.Column<bool>(type: "bit", nullable: false),
                    StandardFifteen = table.Column<bool>(type: "bit", nullable: false),
                    StandardSixteen = table.Column<bool>(type: "bit", nullable: false),
                    StandardSeventeen = table.Column<bool>(type: "bit", nullable: false),
                    StandardEighteen = table.Column<bool>(type: "bit", nullable: false),
                    StandardNineteen = table.Column<bool>(type: "bit", nullable: false),
                    StandardTwenty = table.Column<bool>(type: "bit", nullable: false),
                    StandardTwentyOne = table.Column<bool>(type: "bit", nullable: false),
                    StandardTwentyTwo = table.Column<bool>(type: "bit", nullable: false),
                    Status = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MedicalDeclarations", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MedicalDeclarations");
        }
    }
}
