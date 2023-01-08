
using FluentValidation;
using InvoicesBackend.Models;
using InvoicesBackend.Parameters;
using InvoicesBackend.Services;
using Microsoft.AspNetCore.Mvc;

namespace InvoicesBackend.Requests
{
    public class CustomerRequests
    {
        public static async Task<IResult> GetById(ICustomerService service,  int id)
        {
            var customer = await service.GetCustomer(id);
            if (customer == null) return Results.NotFound();
            return Results.Ok(customer);
        }
        public static async Task<IResult> Create(ICustomerService service, CreateCustomerDto customerDto, IValidator<CreateCustomerDto> validator)
        {
            var validationResult = validator.Validate(customerDto);
            if (!validationResult.IsValid)
            {
                return Results.BadRequest(validationResult.Errors);
            }
            var customer = await service.Create(customerDto);
            return Results.Created($"/customer/{customer.Id}", customer);

        }
        
        public static async Task<IResult> GetByParameters(ICustomerService service, [FromQuery] bool? IsActive, [FromQuery] bool? isVisible, [FromQuery] decimal? minSum,
            [FromQuery] decimal? maxSum ,[FromQuery] int? numberPerPage, [FromQuery] int? page, [FromQuery] string? sortBy, [FromQuery] bool? ascending, [FromQuery] string? nip, [FromQuery] string? name)
        {
            var customers = await service.GetByParameters(new CustomerParameters( IsActive,  isVisible, minSum, maxSum, numberPerPage, page, sortBy, ascending , nip, name));
            if (customers == null) return Results.NotFound();
            return Results.Ok(customers);
        }
        public static async Task<IResult> Update(ICustomerService service, int id, [FromBody] UpdateCustomerDto customerDto, IValidator<UpdateCustomerDto> validator)
        {
            var validationResult = validator.Validate(customerDto);
            if (!validationResult.IsValid)
            {
                return Results.BadRequest(validationResult.Errors);
            }
            var result = await service.Update(id, customerDto);
            if(result == false) return Results.NotFound();
            return Results.NoContent();
        }
        public static IResult GetBusiness(ICustomerService service, string nip)
        {
            var result = service.GetBusiness(nip);
            if( result == null ) return Results.NotFound(); 
            return Results.Ok(result);
        }
        public static async Task<IResult> Delete(ICustomerService service, int id)
        {
            var result = await service.Delete(id);
            if (result == false) return Results.NotFound();
            return Results.NoContent();
        }
    }
}
