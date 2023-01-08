using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace InvoicesBackend.Entities.Configurations
{
    public class CustomerConfiguration : IEntityTypeConfiguration<Customer>
    {
        public void Configure(EntityTypeBuilder<Customer> builder)
        {
            builder.Property(c => c.Name)
                 .IsRequired()
                 .HasMaxLength(200);

            builder.Property(c => c.IsActive)
                .IsRequired();

            builder.Property(c => c.IsVisible)
                .IsRequired();
            builder.Property(c => c.Nip)
                .HasMaxLength(20);
            builder.Property(c => c.Email)
                .HasMaxLength(100);
            builder.Property(c => c.Phone)
                .HasMaxLength(50);
            builder.Property(c => c.Street)
                .HasMaxLength(200);
            builder.Property(c => c.City)
                .HasMaxLength(200);
        }
    }
}
