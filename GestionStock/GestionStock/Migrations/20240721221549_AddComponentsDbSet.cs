using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GestionStock.Migrations
{
    public partial class AddComponentsDbSet : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Composent_Products_ProductId",
                table: "Composent");

            migrationBuilder.DropForeignKey(
                name: "FK_Products_AspNetUsers_TechnicienId",
                table: "Products");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Composent",
                table: "Composent");

            migrationBuilder.RenameTable(
                name: "Composent",
                newName: "Composents");

            migrationBuilder.RenameIndex(
                name: "IX_Composent_ProductId",
                table: "Composents",
                newName: "IX_Composents_ProductId");

            migrationBuilder.AlterColumn<string>(
                name: "TechnicienId",
                table: "Products",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Composents",
                table: "Composents",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Composents_Products_ProductId",
                table: "Composents",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Products_AspNetUsers_TechnicienId",
                table: "Products",
                column: "TechnicienId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Composents_Products_ProductId",
                table: "Composents");

            migrationBuilder.DropForeignKey(
                name: "FK_Products_AspNetUsers_TechnicienId",
                table: "Products");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Composents",
                table: "Composents");

            migrationBuilder.RenameTable(
                name: "Composents",
                newName: "Composent");

            migrationBuilder.RenameIndex(
                name: "IX_Composents_ProductId",
                table: "Composent",
                newName: "IX_Composent_ProductId");

            migrationBuilder.AlterColumn<string>(
                name: "TechnicienId",
                table: "Products",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Composent",
                table: "Composent",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Composent_Products_ProductId",
                table: "Composent",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Products_AspNetUsers_TechnicienId",
                table: "Products",
                column: "TechnicienId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
