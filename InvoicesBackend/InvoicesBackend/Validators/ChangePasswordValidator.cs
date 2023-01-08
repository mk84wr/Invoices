using FluentValidation;
using InvoicesBackend.Models.Password;

namespace InvoicesBackend.Validators
{
    public class ChangePasswordValidator:AbstractValidator<ChangePassword>
    {
        public ChangePasswordValidator()
        {
            
            RuleFor(u => u.CurrentPassword).NotNull();
            RuleFor(u => u.NewPassword).NotNull().MaximumLength(50);
        }
    }
}
