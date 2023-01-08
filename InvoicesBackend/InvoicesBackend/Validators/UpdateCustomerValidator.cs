using FluentValidation;
using InvoicesBackend.Models;

namespace InvoicesBackend.Validators
{
    public class UpdateCustomerValidator : AbstractValidator<UpdateCustomerDto>
    {
        public UpdateCustomerValidator()
        {
            RuleFor(c => c.Name).NotNull().MaximumLength(200);
            RuleFor(c => c.Email).EmailAddress().MaximumLength(100);
            RuleFor(c => c.Phone).MaximumLength(50);
            RuleFor(c => c.Nip).MaximumLength(20);
            RuleFor(c => c.Street).MaximumLength(200);
            RuleFor(c => c.City).MaximumLength(200);

        }
    }
}
