using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GestionStock.Migrations
{
    public partial class UpdateCommandeModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Commandes_AspNetUsers_TechnicienId",
                table: "Commandes");

            migrationBuilder.DropColumn(
                name: "NumeroArticle",
                table: "Commandes");

            migrationBuilder.RenameColumn(
                name: "TypeProduit",
                table: "Commandes",
                newName: "Etat");

            migrationBuilder.RenameColumn(
                name: "Date",
                table: "Commandes",
                newName: "DateCommande");

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateEntre",
                table: "Products",
                type: "datetime2",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AlterColumn<string>(
                name: "TechnicienId",
                table: "Commandes",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddForeignKey(
                name: "FK_Commandes_AspNetUsers_TechnicienId",
                table: "Commandes",
                column: "TechnicienId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Commandes_AspNetUsers_TechnicienId",
                table: "Commandes");

            migrationBuilder.RenameColumn(
                name: "Etat",
                table: "Commandes",
                newName: "TypeProduit");

            migrationBuilder.RenameColumn(
                name: "DateCommande",
                table: "Commandes",
                newName: "Date");

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateEntre",
                table: "Products",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "TechnicienId",
                table: "Commandes",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NumeroArticle",
                table: "Commandes",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddForeignKey(
                name: "FK_Commandes_AspNetUsers_TechnicienId",
                table: "Commandes",
                column: "TechnicienId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
