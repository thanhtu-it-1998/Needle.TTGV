using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Needle.Migrations
{
    public partial class CreateDatabasev6 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "EpidemicSituations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdArea = table.Column<int>(type: "int", nullable: false),
                    TotalCases = table.Column<int>(type: "int", nullable: false),
                    TotalCaseToDay = table.Column<int>(type: "int", nullable: false),
                    NumberOfDeaths = table.Column<int>(type: "int", nullable: false),
                    CreatedUpdate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EpidemicSituations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EpidemicSituations_Areas_IdArea",
                        column: x => x.IdArea,
                        principalTable: "Areas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_EpidemicSituations_IdArea",
                table: "EpidemicSituations",
                column: "IdArea");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EpidemicSituations");
        }
    }
}
