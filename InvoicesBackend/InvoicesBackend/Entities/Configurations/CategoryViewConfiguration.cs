using InvoicesBackend.Entities.Views;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace InvoicesBackend.Entities.Configurations
{
    public class CategoryViewConfiguration : IEntityTypeConfiguration<CategoryView>
    {
        public void Configure(EntityTypeBuilder<CategoryView> builder)
        {
            builder.ToView("CategoryView");
            builder.HasNoKey();
        }
    }
}
