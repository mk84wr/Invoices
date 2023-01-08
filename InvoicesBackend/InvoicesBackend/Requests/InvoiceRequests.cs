
using FluentValidation;
using InvoicesBackend.Models;
using InvoicesBackend.Services;
using Microsoft.AspNetCore.Mvc;


namespace InvoicesBackend.Requests
{
    public class InvoiceRequests
    {
       
        public static async Task<IResult> Create(IInvoiceService service, CreateInvoiceDto invoiceDto, IValidator<CreateInvoiceDto> validator)
        {
            var validationResult = validator.Validate(invoiceDto);
            if (!validationResult.IsValid)
            {
                return Results.BadRequest(validationResult.Errors);
            }
            InvoiceDto invoice = await service.Create(invoiceDto);
            return Results.Created($"/invoice/{invoice.Id}", invoice);
        }
               
        public static async Task<IResult> GetById(IInvoiceService service, int id)
        {
            var invoice = await service.GetInvoice(id);
            if (invoice == null) return Results.NotFound();
            return Results.Ok(invoice);
        }

        public static async Task<IResult> GetByParameters(IInvoiceService service, [FromQuery] DateTime? minDueDate, [FromQuery] DateTime? maxDueDate, [FromQuery] decimal? minToPay,
            [FromQuery] decimal? maxToPay,[FromQuery] DateTime? minSettlementDate, [FromQuery] DateTime? maxSettlementDate, [FromQuery] bool? isActive, [FromQuery] bool? isVisible,
            [FromQuery] int? numberPerPage, [FromQuery] int? page, [FromQuery] string? sortBy, [FromQuery] bool? ascending, [FromQuery] string? number, [FromQuery] string? customer,
            [FromQuery] string? category, [FromQuery] DateTime? minDateOfInvoice, [FromQuery] DateTime? maxDateOfInvoice, [FromQuery] string? nip)
        {
            var invoices = await service.GetInvoices(new InvoiceParameters(minDueDate, maxDueDate, minToPay, maxToPay, minSettlementDate, maxSettlementDate, isActive, isVisible,
                numberPerPage, page, sortBy, ascending, number, customer, category, null, null, minDateOfInvoice, maxDateOfInvoice, nip));
            if (invoices == null) return Results.NotFound();
            return Results.Ok(invoices);
        }
        public static async Task<IResult> Delete(IInvoiceService service, int id)
        {
            var invoice = await service.GetInvoice(id);
            if (invoice == null) return Results.NotFound();
            await service.Delete(id);
            return Results.NoContent();
        }
        public static async Task<IResult> Update(IInvoiceService service, int id,  UpdateInvoiceDto invoiceDto, IValidator<UpdateInvoiceDto> validator)
        {
            var validationResult = validator.Validate(invoiceDto);
            if (!validationResult.IsValid)
            {
                return Results.BadRequest(validationResult.Errors);
            }
            var result = await service.Update(id, invoiceDto);
           
            if (result == false) return Results.NotFound();
            
            return Results.NoContent();
        }
        public static async Task<IResult> GetFromCustomer(IInvoiceService service, [FromRoute] int id,  [FromQuery] DateTime? minDueDate, [FromQuery] DateTime? maxDueDate, [FromQuery] decimal? minToPay,
            [FromQuery] decimal? maxToPay, [FromQuery] DateTime? minSettlementDate, [FromQuery] DateTime? maxSettlementDate, [FromQuery] bool? isActive, [FromQuery] bool? isVisible,
            [FromQuery] int? numberPerPage, [FromQuery] int? page, [FromQuery] string? sortBy, [FromQuery] bool? ascending, [FromQuery] string? number, [FromQuery] string? customer,
            [FromQuery] string? category,  [FromQuery] DateTime? minDateOfInvoice, [FromQuery] DateTime? maxDateOfInvoice, [FromQuery] string? nip)
        {
            var invoices = await service.GetInvoices(new InvoiceParameters(minDueDate, maxDueDate, minToPay, maxToPay, minSettlementDate, maxSettlementDate, isActive, isVisible,
                numberPerPage, page, sortBy, ascending, number, customer, category, id, null, minDateOfInvoice, maxDateOfInvoice, nip));
            if (invoices == null) return Results.NotFound();
            return Results.Ok(invoices);
        }
        public static async Task<IResult> GetFromCategory(IInvoiceService service, [FromRoute] int id, [FromQuery] DateTime? minDueDate, [FromQuery] DateTime? maxDueDate, [FromQuery] decimal? minToPay,
            [FromQuery] decimal? maxToPay, [FromQuery] DateTime? minSettlementDate, [FromQuery] DateTime? maxSettlementDate, [FromQuery] bool? isActive, [FromQuery] bool? isVisible,
            [FromQuery] int? numberPerPage, [FromQuery] int? page, [FromQuery] string? sortBy, [FromQuery] bool? ascending, [FromQuery] string? number, [FromQuery] string? customer,
            [FromQuery] string? category,  [FromQuery] DateTime? minDateOfInvoice, [FromQuery] DateTime? maxDateOfInvoice, [FromQuery] string? nip)
        {
            var invoices = await service.GetInvoices(new InvoiceParameters(minDueDate, maxDueDate, minToPay, maxToPay, minSettlementDate, maxSettlementDate, isActive, isVisible,
                numberPerPage, page, sortBy, ascending, number, customer, category, null, id, minDateOfInvoice, maxDateOfInvoice, nip));
            if (invoices == null) return Results.NotFound();
            return Results.Ok(invoices);
        }
    }
}
