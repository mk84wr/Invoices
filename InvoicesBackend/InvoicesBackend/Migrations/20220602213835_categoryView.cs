using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InvoicesBackend.Migrations
{
    public partial class categoryView : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
                @"CREATE VIEW CategoryView AS SELECT c.Id as Id, c.Name as Name, COALESCE(SUM(i.ToPay),0) as Sum, COALESCE(SUM(i.Value),0) as Total FROM Categories c  LEFT JOIN Invoices i ON c.Id = i.CategoryId GROUP BY c.Id, c.Name"
                );
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"DROP VIEW CategoryView");
        }
    }
}