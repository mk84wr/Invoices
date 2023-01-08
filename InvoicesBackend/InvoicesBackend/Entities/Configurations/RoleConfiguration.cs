using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace InvoicesBackend.Entities.Configurations
{
    public class RoleConfiguration : IEntityTypeConfiguration<Role>
    {
        public void Configure(EntityTypeBuilder<Role> builder)
        {
            builder.Property(r => r.Name)
                .IsRequired()
                .HasMaxLength(50);

            builder.HasData(
                new Role() { Id = 1, Name = "Administrator"},
                new Role() { Id = 2, Name = "Moderator"},
                new Role() { Id = 3, Name = "User"}
                );
        }
    }
}
