using FluentValidation;
using InvoicesBackend.Entities;
using InvoicesBackend.Models;
using InvoicesBackend.Models.Password;
using InvoicesBackend.Services;
using InvoicesBackend.Validators;


namespace InvoicesBackend.Requests
{
    public class UserRequests
    {
        static SemaphoreSlim semaphoreSlimUser = new SemaphoreSlim(1,1);
        public static async Task<IResult> Create(IUserService service, CreateUserDto userDto, IValidator<CreateUserDto> validator)
        {
            try
            {
                var validationResult = validator.Validate(userDto);
                if (!validationResult.IsValid)
                {
                    return Results.BadRequest(validationResult.Errors);
                }
                await semaphoreSlimUser.WaitAsync();
                try
                {
                    var exists = await service.GetByEmail(userDto.Email);
                    if (exists != null) return Results.BadRequest();
                    var user = await service.Create(userDto);
                    return Results.Created($"/user/{user.Id}", user);
                }
                finally
                {
                    semaphoreSlimUser.Release();
                }
            }
            catch (Exception ex)
            {
                return Results.NotFound();
            }

        }


        public static async Task<IResult> GetByParameters(IUserService service)
        {
            var users = await service.GetByParameters();
            if (users == null) return Results.NotFound();
            return Results.Ok(users);
        }
        public static async Task<IResult> Update(IUserService service, int id, UpdateUserDto userDto, IValidator<UpdateUserDto> validator)
        {
            var validationResult = validator.Validate(userDto);
            if (!validationResult.IsValid)
            {
                return Results.BadRequest(validationResult.Errors);
            }
            await semaphoreSlimUser.WaitAsync();
            try
            {
                var exists = await service.GetByEmail(userDto.Email);
                if (exists != null && exists.Id != id) return Results.BadRequest();
                var result = await service.Update(id, userDto);
                if (result == false) return Results.NotFound();
                return Results.NoContent();
            }
            finally
            {
                semaphoreSlimUser.Release();
            }
        }
        public static async Task<IResult> GetById(IUserService service, int id)
        {
            var user = await service.GetById(id);
            if(user == null) return Results.NotFound();
            return Results.Ok(user);
        }
        public static async Task<IResult> GetByEmail(IUserService service, string email)
        {
            var user = await service.GetByEmail(email);
            if (user == null) return Results.NotFound();
            return Results.Ok(user);
        }
        public static async Task<IResult> Delete(IUserService service, int id)
        {
            var user = await service.GetById(id);
            if (user == null) return Results.NotFound();
            await service.Delete(id);
            return Results.NoContent();
        }
        public static async Task<IResult> ResetPassword(IUserService service, ResetPassword resetPassword, IValidator<ResetPassword>validator)
        {
            var validationResult = validator.Validate(resetPassword);
            if (!validationResult.IsValid)
            {
                return Results.BadRequest(validationResult.Errors);
            }
            //var exists = await service.GetByEmail(resetPassword.Email);
            //if (exists == null) return Results.BadRequest();
            var user = await service.ResetPassword(resetPassword);
            if (user == null) return Results.NotFound();
            return Results.Ok(user);
        }
        public static async Task<IResult>ChangePassword(IUserService service, int id, ChangePassword changePassword, IValidator<ChangePassword>validator)
        {
            try
            {
                var validationResult = validator.Validate(changePassword);
                if (!validationResult.IsValid)
                {
                    return Results.BadRequest(validationResult.Errors);
                }
                var exists = await service.GetById(id);
                if (exists == null) return Results.BadRequest();
                var result = await service.ChangePassword(changePassword.CurrentPassword, changePassword.NewPassword, id);
                if (!result) return Results.NotFound();
                return Results.NoContent();
            }
            catch (Exception ex)
            {
                return Results.NotFound();
            }
            
        }
    }
}
