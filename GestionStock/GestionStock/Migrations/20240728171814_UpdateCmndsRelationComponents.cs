using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GestionStock.Migrations
{
    public partial class UpdateCmndsRelationComponents : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ComposentId",
                table: "Commandes",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Commandes_ComposentId",
                table: "Commandes",
                column: "ComposentId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Commandes_Composents_ComposentId",
                table: "Commandes",
                column: "ComposentId",
                principalTable: "Composents",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Commandes_Composents_ComposentId",
                table: "Commandes");

            migrationBuilder.DropIndex(
                name: "IX_Commandes_ComposentId",
                table: "Commandes");

            migrationBuilder.DropColumn(
                name: "ComposentId",
                table: "Commandes");
        }
    }
}
