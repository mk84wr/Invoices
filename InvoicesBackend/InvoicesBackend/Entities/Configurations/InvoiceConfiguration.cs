using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace InvoicesBackend.Entities.Configurations
{
    public class InvoiceConfiguration : IEntityTypeConfiguration<Invoice>
    {
        public void Configure(EntityTypeBuilder<Invoice> builder)
        {
            builder.Property(i => i.Number)
                 .IsRequired()
                 .HasMaxLength(50);

            builder.Property(i => i.DateOfInvoice)
                 .IsRequired()
                 .HasColumnType("Date");
                 
            builder.Property(i => i.DueDate)
                .IsRequired()
                 .HasColumnType("Date"); 

            builder.Property(i => i.SettlementDate)
                 .HasColumnType("Date");

            builder.Property(i => i.Value)
                .IsRequired()
                .HasPrecision(18,2);

            builder.Property(i => i.ToPay)
                .IsRequired()
                 .HasPrecision(18, 2);

            builder.Property(i => i.CategoryId)
                .IsRequired();

            builder.Property(i => i.CustomerId)
                .IsRequired();

            builder.HasOne(i => i.Category)
                .WithMany(c => c.Invoices)
                .HasForeignKey(i => i.CategoryId);

            builder.HasOne(i => i.Customer)
                .WithMany(c => c.Invoices)
                .HasForeignKey(i => i.CustomerId);
        }
    }
}
