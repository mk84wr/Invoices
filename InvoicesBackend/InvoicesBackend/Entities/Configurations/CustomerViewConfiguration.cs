using InvoicesBackend.Entities.Views;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace InvoicesBackend.Entities.Configurations
{
    public class CustomerViewConfiguration : IEntityTypeConfiguration<CustomerView>
    {
        public void Configure(EntityTypeBuilder<CustomerView> builder)
        {
            builder.ToView("CustomerView");
            builder.HasNoKey();
        }
    }
}
