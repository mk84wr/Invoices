using FluentValidation;
using InvoicesBackend.Models;

namespace InvoicesBackend.Validators
{
    public class CreateUserValidator :AbstractValidator<CreateUserDto>
    {
        public CreateUserValidator()
        {
            RuleFor(u => u.Name).NotNull().MaximumLength(150);
            RuleFor(u => u.Email).NotNull().EmailAddress().MaximumLength(100);
            RuleFor(u => u.RoleId).NotNull();
        }
    }
}
