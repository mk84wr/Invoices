using InvoicesBackend.Entities.Views;
using Microsoft.EntityFrameworkCore;

namespace InvoicesBackend.Entities
{
    public class InvoiceDbContext : DbContext
    {
        private string _connectionString = Information.DataBase;
            
        public DbSet<Invoice> Invoices { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Role>Roles { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Category> Categories { get; set; }
       public DbSet<CustomerView> CustomersView { get; set; }
       public DbSet<CategoryView> CategoriesView { get; set; }
        public DbSet<Update> Updates { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
             modelBuilder.ApplyConfigurationsFromAssembly(this.GetType().Assembly);

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connectionString);
        }
    }
}
