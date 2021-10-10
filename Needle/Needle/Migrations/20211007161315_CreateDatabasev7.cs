using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Needle.Migrations
{
    public partial class CreateDatabasev7 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ListOfHealthAdvices",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ListOfHealthAdvices", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "HealthConsultations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdListOfHealthAdvice = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<bool>(type: "bit", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Context = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Image = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HealthConsultations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HealthConsultations_ListOfHealthAdvices_IdListOfHealthAdvice",
                        column: x => x.IdListOfHealthAdvice,
                        principalTable: "ListOfHealthAdvices",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_HealthConsultations_IdListOfHealthAdvice",
                table: "HealthConsultations",
                column: "IdListOfHealthAdvice");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "HealthConsultations");

            migrationBuilder.DropTable(
                name: "ListOfHealthAdvices");
        }
    }
}
