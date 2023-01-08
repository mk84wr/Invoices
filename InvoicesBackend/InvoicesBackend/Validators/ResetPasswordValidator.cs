using FluentValidation;
using InvoicesBackend.Models.Password;

namespace InvoicesBackend.Validators
{
    public class ResetPasswordValidator : AbstractValidator<ResetPassword>
    {
        public ResetPasswordValidator()
        {
            RuleFor(u => u.Email).NotNull().EmailAddress();
        }
    }
}
