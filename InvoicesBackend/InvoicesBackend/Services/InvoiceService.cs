using AutoMapper;
using InvoicesBackend.Entities;
using InvoicesBackend.Extensions;
using InvoicesBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace InvoicesBackend.Services
{
    public interface IInvoiceService
    {
        Task<InvoiceDto?> Create(CreateInvoiceDto invoiceDto);
        Task<InvoiceDto?> GetInvoice(int id);        
        Task<PageDto<InvoiceDto>> GetInvoices(InvoiceParameters invoiceParameters);
        Task<bool> Update(int id, UpdateInvoiceDto invoiceDto);
        Task<bool> Delete(int id);
    }

    public class InvoiceService : IInvoiceService
    {
        private readonly InvoiceDbContext _invoiceDbContext;
        private readonly IMapper _mapper;

        public InvoiceService(InvoiceDbContext invoiceDbContext, IMapper mapper)
        {
            _invoiceDbContext = invoiceDbContext;
            _mapper = mapper;
        }
        public async Task<InvoiceDto?> Create(CreateInvoiceDto invoiceDto)
        {
            if (invoiceDto == null)
            {
                return null;
            }           
            var invoice = _mapper.Map<Invoice>(invoiceDto);
            invoice.SettlementDate = null;
            invoice.ToPay = invoiceDto.Value;     
            await _invoiceDbContext.AddAsync(invoice);
            await _invoiceDbContext.SaveChangesAsync();
            var newInvoiceDto = _mapper.Map<InvoiceDto>(invoice);          
           return _mapper.Map<InvoiceDto>(invoice);  
          
           
        }
        public async Task<InvoiceDto?> GetInvoice(int id)
        {
            var invoice = await _invoiceDbContext.Invoices.Include(x =>x.Customer).Include(x=>x.Category).FirstOrDefaultAsync(x => x.Id == id);
            if (invoice == null) return null;
            return _mapper.Map<InvoiceDto>(invoice);
        }
        public async Task<PageDto<InvoiceDto>> GetInvoices(InvoiceParameters invoiceParameters)
        {
            IQueryable<Invoice> invoices =  _invoiceDbContext.Invoices.Include(x => x.Customer).Include(x => x.Category);
            IQueryable<Customer> customers =  _invoiceDbContext.Customers;
            IQueryable<Category> categories =  _invoiceDbContext.Categories;

            if (invoiceParameters.CustomerId != null && !customers.Any(c => c.Id == invoiceParameters.CustomerId)) return null;
            if (invoiceParameters.CategoryId != null && !categories.Any(c => c.Id == invoiceParameters.CategoryId)) return null;

            invoices = invoices
                   .Where(i => invoiceParameters.MinDueDate == null || (i.DueDate >= invoiceParameters.MinDueDate))
                   .Where(i => invoiceParameters.MaxDueDate == null || (i.DueDate <= invoiceParameters.MaxDueDate))
                   .Where(i => invoiceParameters.MinToPay == null || (i.ToPay >= invoiceParameters.MinToPay))
                   .Where(i => invoiceParameters.MaxToPay == null || (i.ToPay <= invoiceParameters.MaxToPay))
                   .Where(i => invoiceParameters.MinSettlementDate == null || (i.SettlementDate >= invoiceParameters.MinSettlementDate))
                   .Where(i => invoiceParameters.MaxSettlementDate == null || (i.SettlementDate <= invoiceParameters.MaxSettlementDate))
                   .Where(i => invoiceParameters.IsVisible == null || (i.Customer.IsVisible == invoiceParameters.IsVisible))
                   .Where(i => invoiceParameters.IsActive == null || (i.Customer.IsActive == invoiceParameters.IsActive))
                   .Where(i => invoiceParameters.Number == null || (i.Number.ToLower().Contains(invoiceParameters.Number.ToLower())))
                   .Where(i => invoiceParameters.Customer == null || (i.Customer.Name.ToLower().Contains(invoiceParameters.Customer.ToLower())))
                   .Where(i => invoiceParameters.Category == null || (i.Category.Name.ToLower().Contains(invoiceParameters.Category.ToLower())))
                   .Where(i => invoiceParameters.MinDateOfInvoice == null || (i.DateOfInvoice >= invoiceParameters.MinDateOfInvoice))
                   .Where(i => invoiceParameters.MaxDateOfInvoice == null || (i.DateOfInvoice <= invoiceParameters.MaxDateOfInvoice))
                   .Where(i => invoiceParameters.Nip == null || invoiceParameters.Nip.Replace("-", "")=="" || i.Customer.Nip !=null && (i.Customer.Nip.Replace("-", "").ToLower().Contains(invoiceParameters.Nip.Replace("-", "").ToLower())));
            if (invoiceParameters.CustomerId != null) invoices = invoices.Where(i => i.CustomerId == invoiceParameters.CustomerId);
            if(invoiceParameters.CategoryId!= null) invoices = invoices.Where(i => i.CategoryId == invoiceParameters.CategoryId);
            

            var totalCount = await invoices.CountAsync();
            invoices = invoices.OrderBy(invoiceParameters.SortBy, invoiceParameters.Ascending).ThenBy(i => i.Id, invoiceParameters.Ascending);
            var numberPerPage = invoiceParameters.NumberPerPage ?? totalCount;
            var page = (invoiceParameters.NumberPerPage != null) ? invoiceParameters.Page : 1;
            //invoices = invoices.Skip(invoiceParameters.NumberPerPage*(invoiceParameters.Page-1)).Take(invoiceParameters.NumberPerPage);
            invoices = invoices.Skip(numberPerPage*(page - 1)).Take(numberPerPage);
            
            var invoicesDto = _mapper.Map<List<InvoiceDto>>(await invoices.ToListAsync());           
            var result = new PageDto<InvoiceDto>(invoicesDto, totalCount, numberPerPage, page);
            return result;
        }
        
        public async Task<bool>  Update(int id, UpdateInvoiceDto invoiceDto)
        {
            IQueryable<Invoice> invoices = _invoiceDbContext.Invoices;
            var previous = await invoices.FirstOrDefaultAsync(x => x.Id == id);
            if (previous is null) return false;                   
             _mapper.Map(invoiceDto, previous);
            previous.Id = id;
            await _invoiceDbContext.SaveChangesAsync();
            return true;
        }
        public async Task<bool> Delete(int id)
        {
            var invoice = await _invoiceDbContext.Invoices.FirstOrDefaultAsync(x => x.Id == id);
            if (invoice is null) return false;
             _invoiceDbContext.Invoices.Remove(invoice);
            await _invoiceDbContext.SaveChangesAsync();
            return true;
        }
    }
}
