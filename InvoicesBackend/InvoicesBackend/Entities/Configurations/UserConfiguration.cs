using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace InvoicesBackend.Entities.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.Property(u => u.Name)
                 .IsRequired()
                 .HasMaxLength(150);

            builder.Property(u => u.Email)
               .IsRequired()
               .HasMaxLength(100);

            builder.Property(u => u.PasswordHash)
               .IsRequired()
               .HasMaxLength(50);

           builder.Property(u => u.RoleId)
               .IsRequired();
        }
    }
}
