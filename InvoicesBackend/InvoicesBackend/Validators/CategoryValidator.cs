using FluentValidation;
using InvoicesBackend.Models;

namespace InvoicesBackend.Validators
{
    public class CategoryValidator : AbstractValidator<CreateCategoryDto>
    {
        public CategoryValidator()
        {
            RuleFor(c => c.Name).NotNull().MaximumLength(50);            
        }
    }
}
