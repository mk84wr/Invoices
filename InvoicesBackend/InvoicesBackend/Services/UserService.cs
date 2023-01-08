using AutoMapper;
using InvoicesBackend.Email;
using InvoicesBackend.Entities;

using InvoicesBackend.Models;
using InvoicesBackend.Models.Password;
using InvoicesBackend.Password;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using System.Security.Claims;

namespace InvoicesBackend.Services
{
    public class UserService : IUserService
    {
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly InvoiceDbContext _invoiceDbContext;
        private readonly IMapper _mapper;

        public UserService(IPasswordHasher<User> passwordHasher, InvoiceDbContext invoiceDbContext, IMapper mapper)
        {
            _passwordHasher = passwordHasher;
            _invoiceDbContext = invoiceDbContext;
             _mapper = mapper;
    }

        public async Task<User> Create(CreateUserDto userDto)
        {
            var newUser = new User()
            {
                Name = userDto.Name,
                RoleId = userDto.RoleId,
                Email = userDto.Email
            };

            var randomPassword = RandomPasswordGenerator.GeneratePassword(true, true, true, true, 8);
            var emailParams = new EmailParams()
            {
                HostSmtp =Information.HostSmtp,
                EnableSsl = true,
                Port = Information.Port,
                SenderEmail = Information.SenderEmail,
                SenderEmailPassword = Information.SenderEmailPassword,
                SenderName = Information.SenderName,
            };
            var emailSender = new EmailSender(emailParams);

            var contents = "Wygenerowane hasło: "+randomPassword+", strona logowania: "+Information.Domain;
            await emailSender.Send(newUser.Email, "Rejestracja użytkownika", contents);          
            var hashedPassword = _passwordHasher.HashPassword(newUser, randomPassword);
            newUser.PasswordHash = hashedPassword;
            await _invoiceDbContext.AddAsync(newUser);
            await _invoiceDbContext.SaveChangesAsync();
            return newUser;
        }
        public async Task<bool> Update(int id, UpdateUserDto user)
        {
            IQueryable<User> users = _invoiceDbContext.Users;
            var previous = await users.FirstOrDefaultAsync(x => x.Id == id);
            if (previous is null) return false;
            previous.Name = user.Name;
            previous.RoleId = user.RoleId;            
            
            previous.Email = user.Email;
            await _invoiceDbContext.SaveChangesAsync();
            return true;
        }
        public async Task<List<UserDto>> GetByParameters()
        {
            var users = await _invoiceDbContext.Users.Include(x => x.Role).OrderBy(x=>x.Name).ToListAsync();           
            var usersDto = _mapper.Map<List<UserDto>>(users); 
            return usersDto;
        }
        public async Task<User> GenerateJwt(LoginDto loginDto)
        {
            var user = await _invoiceDbContext.Users.FirstOrDefaultAsync(x => x.Email == loginDto.Email);
            if (user is null)
            {
                return null;
            }
            var result = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, loginDto.Password);
            if(result == PasswordVerificationResult.Failed)
            {
               return null;
            }
            return user;
            
        }
        public async Task<UserDto> GetById(int id)
        {
            var user =  await _invoiceDbContext.Users.Include(x =>x.Role).FirstOrDefaultAsync(x => x.Id==id);
            if (user is null) return null;
            return _mapper.Map<UserDto>(user);            
        }
        public async Task<UserDto> GetByEmail(string email)
        {
            var user = await _invoiceDbContext.Users.Include(x => x.Role).FirstOrDefaultAsync(x => x.Email == email);
            if (user is null) return null;
            return _mapper.Map<UserDto>(user);
        }
        public async Task<bool> Delete(int id)
        {
            var user = await _invoiceDbContext.Users.FirstOrDefaultAsync(x => x.Id==id);
            if (user is null) return false;
            _invoiceDbContext.Users.Remove(user);
            await _invoiceDbContext.SaveChangesAsync();
            return true;
        }
        public async Task<UserDto> ResetPassword(ResetPassword resetPassword)
        {
            var user = await _invoiceDbContext.Users.Include(x => x.Role).FirstOrDefaultAsync(x => x.Email == resetPassword.Email);
            if(user is null) return null;
            var randomPassword = RandomPasswordGenerator.GeneratePassword(true, true, true, true, 8);
            var emailParams = new EmailParams()
            {
                HostSmtp =Information.HostSmtp,
                EnableSsl = true,
                Port = Information.Port,
                SenderEmail = Information.SenderEmail,
                SenderEmailPassword = Information.SenderEmailPassword,
                SenderName = Information.SenderName,
            };
            var emailSender = new EmailSender(emailParams);
            await emailSender.Send(user.Email, "Reset hasła", randomPassword);
            var hashedPassword = _passwordHasher.HashPassword(user, randomPassword);
            user.PasswordHash = hashedPassword;           
            await _invoiceDbContext.SaveChangesAsync();
            return _mapper.Map<UserDto>(user);
        }
        public async Task<bool> ChangePassword(string currentPassword, string newPassword, int id)
        {
            var user = await _invoiceDbContext.Users.Include(x => x.Role).FirstOrDefaultAsync(x => x.Id==id);
            var result = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, currentPassword);
            if (result == PasswordVerificationResult.Failed)
            {
                return false;
            }
            var hashedPassword = _passwordHasher.HashPassword(user, newPassword);
            user.PasswordHash = hashedPassword;
            await _invoiceDbContext.SaveChangesAsync();
            return true;
        }       
    }

    public interface IUserService
    {
        Task<User> Create(CreateUserDto userDto);
        Task<bool> Update(int id, UpdateUserDto userDto);
        Task<List<UserDto>> GetByParameters();
        Task<User> GenerateJwt(LoginDto loginDto);
        Task<UserDto> GetById(int id);
        Task<UserDto> GetByEmail(string email);
        Task<bool> Delete(int id);
        Task<UserDto> ResetPassword(ResetPassword resetPassword);
        Task<bool> ChangePassword(string currentPassword, string newPassword, int id);


    }
}
