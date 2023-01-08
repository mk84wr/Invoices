using FluentValidation;
using InvoicesBackend.Models;

namespace InvoicesBackend.Validators
{
    public class UpdateUserValidator : AbstractValidator<UpdateUserDto>
    {
        public UpdateUserValidator()
        {
            RuleFor(u => u.Name).NotNull().MaximumLength(150);
            RuleFor(u => u.Email).NotNull().EmailAddress().MaximumLength(100);
            RuleFor(u => u.RoleId).NotNull();
        }
    }
}
