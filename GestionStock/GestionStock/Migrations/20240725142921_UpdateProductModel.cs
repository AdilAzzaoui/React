using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GestionStock.Migrations
{
    public partial class UpdateProductModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Ville",
                table: "Products",
                newName: "Status");

            migrationBuilder.RenameColumn(
                name: "Type",
                table: "Products",
                newName: "Art");

            migrationBuilder.RenameColumn(
                name: "NumeroArticle",
                table: "Products",
                newName: "SiteCode");

            migrationBuilder.RenameColumn(
                name: "Etat",
                table: "Products",
                newName: "Region");

            migrationBuilder.RenameColumn(
                name: "Date",
                table: "Products",
                newName: "LastVerificationDate");

            migrationBuilder.AddColumn<DateTime>(
                name: "ExpirationVerification",
                table: "Products",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FM1",
                table: "Products",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "GPS",
                table: "Products",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Province",
                table: "Products",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<bool>(
                name: "ServiceReportDone",
                table: "Products",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AlterColumn<DateTime>(
                name: "MaintenanceDate",
                table: "ProductHistories",
                type: "datetime2",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ExpirationVerification",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "FM1",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "GPS",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "Province",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "ServiceReportDone",
                table: "Products");

            migrationBuilder.RenameColumn(
                name: "Status",
                table: "Products",
                newName: "Ville");

            migrationBuilder.RenameColumn(
                name: "SiteCode",
                table: "Products",
                newName: "NumeroArticle");

            migrationBuilder.RenameColumn(
                name: "Region",
                table: "Products",
                newName: "Etat");

            migrationBuilder.RenameColumn(
                name: "LastVerificationDate",
                table: "Products",
                newName: "Date");

            migrationBuilder.RenameColumn(
                name: "Art",
                table: "Products",
                newName: "Type");

            migrationBuilder.AlterColumn<DateTime>(
                name: "MaintenanceDate",
                table: "ProductHistories",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldNullable: true);
        }
    }
}
