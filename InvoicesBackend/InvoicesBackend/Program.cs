using FluentValidation;
using InvoicesBackend;
using InvoicesBackend.Entities;
using InvoicesBackend.Models;
using InvoicesBackend.Requests;
using InvoicesBackend.Search;
using InvoicesBackend.Services;
using InvoicesBackend.Validators;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Net.Http.Headers;
using NLog;
using NLog.Web;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Net.Http.Headers;
using System.Reflection;
using System.Security.Claims;
using System.Text;

var logger = NLog.LogManager.Setup().LoadConfigurationFromAppSettings().GetCurrentClassLogger();
logger.Debug("init main");
try
{
    var builder = WebApplication.CreateBuilder(args);

    builder.Logging.ClearProviders();
    builder.Host.UseNLog();

    // Add services to the container.
    // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();

    builder.Services.AddScoped<ICustomerService, CustomerService>();
    builder.Services.AddScoped<IInvoiceService, InvoiceService>();
    builder.Services.AddScoped<ICategoryService, CategoryService>();
    //builder.Services.AddSingleton<InvoiceDbContext>();
    builder.Services.AddTransient<InvoiceDbContext>();
    builder.Services.AddScoped<IUserService, UserService>();
    builder.Services.AddScoped<IUpdateService, UpdateService>();
    builder.Services.AddValidatorsFromAssemblyContaining(typeof(CategoryValidator));
    builder.Services.AddValidatorsFromAssemblyContaining(typeof(CreateCustomerValidator));
    builder.Services.AddValidatorsFromAssemblyContaining(typeof(CreateUserValidator));
    builder.Services.AddValidatorsFromAssemblyContaining(typeof(CreateInvoiceValidator));
    builder.Services.AddValidatorsFromAssemblyContaining(typeof(UpdateCustomerValidator));
    builder.Services.AddValidatorsFromAssemblyContaining(typeof(UpdateUserValidator));
    builder.Services.AddValidatorsFromAssemblyContaining(typeof(UpdateInvoiceValidator));
    builder.Services.AddValidatorsFromAssemblyContaining(typeof(ResetPasswordValidator));
    builder.Services.AddValidatorsFromAssemblyContaining(typeof(ChangePasswordValidator));
    builder.Services.AddTransient<GenericHelper>();

    builder.Services.AddSingleton<IPasswordHasher<User>, PasswordHasher<User>>();
    builder.Services.AddAuthentication("Bearer")
        .AddJwtBearer(cft =>
        {
            cft.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
            {
                ValidIssuer = builder.Configuration["JwtIssuer"],
                ValidAudience = builder.Configuration["JwtIssuer"],
                IssuerSigningKey = new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(builder.Configuration["JwtKey"]))
            };
        }
        );
    builder.Services.AddAuthorization(o => o.AddPolicy("Administrator", b => b.RequireRole("1")));
    builder.Services.AddAuthorization(o => o.AddPolicy("Moderator", b => b.RequireRole("1", "2")));
    //builder.Services.AddAuthentication();
    builder.Services.AddMvc();
    builder.Services.AddAutoMapper(Assembly.GetEntryAssembly());

    builder.Services.AddCors(options => options.AddPolicy("CorsPolicy", builder =>
    {
        builder.
         WithOrigins("https://www.m-tree.wroclaw.pl")       
        .AllowAnyMethod()       
        .AllowAnyHeader()       
        .AllowCredentials().SetPreflightMaxAge(TimeSpan.FromMinutes(10))
        ;
    }));
   

    var app = builder.Build();

    // Configure the HTTP request pipeline.
    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }
    
    //app.UseHsts();

    app.UseHttpsRedirection();
    app.UseFileServer();
    app.UseRouting();
    app.UseCors("CorsPolicy");
    app.UseAuthentication();
    app.UseAuthorization();

    app.MapGet("/business/{nip}", CustomerRequests.GetBusiness).RequireAuthorization("Moderator");

    app.MapGet("/customer/{id}", CustomerRequests.GetById).RequireAuthorization();
    app.MapPost("/customer", CustomerRequests.Create).RequireAuthorization("Moderator");
    app.MapGet("/customer", CustomerRequests.GetByParameters).RequireAuthorization();
    app.MapPut("/customer/{id}", CustomerRequests.Update).RequireAuthorization("Moderator");
    app.MapDelete("/customer/{id}", CustomerRequests.Delete).RequireAuthorization("Moderator");

    app.MapPost("/invoice", InvoiceRequests.Create).RequireAuthorization("Moderator");
    app.MapGet("/invoice/{id}", InvoiceRequests.GetById).RequireAuthorization();
    app.MapGet("/invoice", InvoiceRequests.GetByParameters).RequireAuthorization();
    app.MapDelete("/invoice/{id}", InvoiceRequests.Delete).RequireAuthorization("Moderator");
    app.MapPut("/invoice/{id}", InvoiceRequests.Update).RequireAuthorization("Moderator");

    app.MapGet("/customer/{id}/invoice", InvoiceRequests.GetFromCustomer).RequireAuthorization();
    app.MapGet("/category/{id}/invoice", InvoiceRequests.GetFromCategory).RequireAuthorization();

    app.MapPost("/category", CategoryRequests.Create).RequireAuthorization("Moderator");
    app.MapPut("/category/{id}", CategoryRequests.Update).RequireAuthorization("Moderator");
    app.MapGet("/category", CategoryRequests.GetByParameters).RequireAuthorization();
    app.MapGet("/category/{id}", CategoryRequests.GetById).RequireAuthorization();
    app.MapDelete("/category/{id}", CategoryRequests.Delete).RequireAuthorization("Moderator"); ;

    app.MapPut("/user/{id}", UserRequests.Update).RequireAuthorization();
    app.MapPost("/user", UserRequests.Create).RequireAuthorization("Administrator"); ;
    app.MapGet("/user", UserRequests.GetByParameters).RequireAuthorization("Administrator"); ;
    app.MapPost("/login", (IUserService service, [FromBody] LoginDto loginDto) => Login(service, loginDto));
    app.MapGet("/user/{id}", UserRequests.GetById).RequireAuthorization();
    app.MapDelete("/user/{id}", UserRequests.Delete).RequireAuthorization("Administrator");
    app.MapPut("/update/{id}", UpdateRequests.Update).RequireAuthorization("Moderator");
    app.MapGet("/update/{id}", UpdateRequests.GetByID);
    app.MapPost("/password", UserRequests.ResetPassword);
    app.MapPut("/user/{id}/password", UserRequests.ChangePassword).RequireAuthorization();

    using var scope = app.Services.CreateScope();
    var dbContext = scope.ServiceProvider.GetService<InvoiceDbContext>();
    var passwordHasher = scope.ServiceProvider.GetService<IPasswordHasher<User>>();
    var pendingMigrations = dbContext.Database.GetPendingMigrations();
    if (pendingMigrations.Any())
    {
        dbContext.Database.Migrate();
    }
    var users = dbContext.Users;

    if (!users.Any())
    {
        var user = new User()
        {
            Name = "Administrator",
            Email = Information.SenderEmail,
            RoleId = 1
        };

        var password = passwordHasher.HashPassword(user, Information.SenderEmailPassword);
        user.PasswordHash = password;
        dbContext.Add(user);
        dbContext.SaveChanges();
    }

    var updates = dbContext.Updates;
    if (!updates.Any())
    {
        var update = new Update()
        {
            UpdateDate = null

        };
        dbContext.Add(update);
        dbContext.SaveChanges();
    }

    app.Run();

    async Task<IResult> Login(IUserService service, LoginDto loginDto)
    {
        try
        {
            var result = await service.GenerateJwt(loginDto);
            if (result == null) return Results.NotFound();
            var claims = new List<Claim>()
                {
                    new Claim(ClaimTypes.NameIdentifier, result.Id.ToString() ),
                    new Claim(ClaimTypes.Name, $"{result.Name}"),
                    new Claim(ClaimTypes.Role, $"{result.RoleId}")
                };
            var token = new JwtSecurityToken
                (
                issuer: builder.Configuration["jwtIssuer"],
                audience: builder.Configuration["jwtIssuer"],
                claims: claims,
                expires: DateTime.UtcNow.AddDays(60),
                notBefore: DateTime.UtcNow,
                signingCredentials: new SigningCredentials(
                    new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JwtKey"])),
                    SecurityAlgorithms.HmacSha256));

            var jwtToken = new JwtSecurityTokenHandler().WriteToken(token);
            return Results.Ok(jwtToken);
        }
        catch (Exception ex)
        {
            return Results.NotFound();
        }
    }
}
catch (Exception exception)
{
    // NLog: catch setup errors
    logger.Error(exception, "Stopped program because of exception");
    throw;
}
finally
{
    // Ensure to flush and stop internal timers/threads before application-exit (Avoid segmentation fault on Linux)
    NLog.LogManager.Shutdown();
}
