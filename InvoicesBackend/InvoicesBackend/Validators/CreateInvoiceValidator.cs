using FluentValidation;
using InvoicesBackend.Models;

namespace InvoicesBackend.Validators
{
    public class CreateInvoiceValidator : AbstractValidator<CreateInvoiceDto>
    {
        public CreateInvoiceValidator()
        {
            RuleFor(i => i.CustomerId).NotNull();
            RuleFor(i => i.CategoryId).NotNull();
            RuleFor(i => i.Number).NotNull().MaximumLength(50);
            RuleFor(i => i.DateOfInvoice).NotNull();
            RuleFor(i => i.DueDate).NotNull();
            RuleFor(i => i.Value).NotNull();
        }
    }
}
