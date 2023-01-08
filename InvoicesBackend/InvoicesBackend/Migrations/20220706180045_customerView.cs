using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InvoicesBackend.Migrations
{
    public partial class customerView : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
               @"CREATE VIEW CustomerView AS SELECT c.Id as Id, c.Name as Name, c.NIP as NIP, c.City as City, c.Street as Street,
                c.IsActive as IsActive, c.IsVisible as IsVisible, c.Phone as Phone, COALESCE(SUM(i.ToPay),0) as Sum,  COALESCE(SUM(i.Value),0) as Total FROM Customers c LEFT JOIN Invoices i ON c.Id = i.CustomerId GROUP BY 
                c.Id, c.Name, c.NIP, c.City, c.Street, c.IsActive, c.IsVisible, c.Phone"
               );
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
