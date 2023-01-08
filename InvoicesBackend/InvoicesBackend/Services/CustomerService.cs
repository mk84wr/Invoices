using AutoMapper;
using InvoicesBackend.Entities;
using InvoicesBackend.Models;
using InvoicesBackend.Parameters;
using InvoicesBackend.Search;
using InvoicesBackend.Extensions;
using InvoicesBackend.Entities.Views;
using InvoicesBackend.Models.Customer;
using Microsoft.EntityFrameworkCore;

namespace InvoicesBackend.Services
{
    public interface ICustomerService
    {
        Task<CustomerDto> Create(CreateCustomerDto customerDto);
        Business GetBusiness(string nip);
        Task<PageDto<CustomerView>> GetByParameters(CustomerParameters customerParameters);
        Task<CustomerDto> GetCustomer(int id);
        Task<bool> Update(int id, UpdateCustomerDto customerDto);
        Task<bool> Delete(int id);
    }

    public class CustomerService : ICustomerService
    {
        private readonly InvoiceDbContext _invoiceDbContext;
        private readonly IMapper _mapper;

        public CustomerService(InvoiceDbContext invoiceDbContext, IMapper mapper)
        {
            _invoiceDbContext = invoiceDbContext;
            _mapper = mapper;
        }

        public Business GetBusiness(string nip)
        {
           return  SearchBusiness.GetBusiness(nip);
        }

        public async Task<CustomerDto> GetCustomer(int id)
        {
            var customer = await _invoiceDbContext.Customers.FirstOrDefaultAsync(x => x.Id == id);           
            if (customer == null) return null;
            return _mapper.Map<CustomerDto>(customer);
        }

        public async Task<CustomerDto> Create(CreateCustomerDto customerDto)
        {
            if (customerDto == null)
            {
                return null;
            }
            var customer = _mapper.Map<Customer>(customerDto);
            customer.IsActive = true;
            customer.IsVisible = true;
            await _invoiceDbContext.AddAsync(customer);
            await _invoiceDbContext.SaveChangesAsync();
            return _mapper.Map<CustomerDto>(customer);
        }

        public async Task<PageDto<CustomerView>> GetByParameters(CustomerParameters customerParameters)
        {
           IQueryable<CustomerView> customerView = _invoiceDbContext.CustomersView;

            customerView = customerView
                .Where(c => customerParameters.IsActive == null || (c.IsActive == customerParameters.IsActive))
                .Where(c => customerParameters.IsVisible == null || (c.IsVisible == customerParameters.IsVisible))
                .Where(c => customerParameters.MinSum == null || (c.Sum >= customerParameters.MinSum))
                .Where(c => customerParameters.MaxSum == null || (c.Sum <= customerParameters.MaxSum))
                .Where(c => customerParameters.Name == null || (c.Name.ToLower().Contains(customerParameters.Name.ToLower())))
                .Where(c => customerParameters.Nip == null || customerParameters.Nip.Replace("-", "")=="" || c.Nip !=null && (c.Nip.Replace("-", "").ToLower().Contains(customerParameters.Nip.Replace("-", "").ToLower())));

            var totalCount =  await customerView.CountAsync();
            var numberPerPage = customerParameters.NumberPerPage ?? totalCount;
            var page = (customerParameters.NumberPerPage != null) ? customerParameters.Page : 1;
            customerView  = customerView.OrderBy(customerParameters.SortBy, customerParameters.Ascending);
            customerView = customerView.Skip(numberPerPage*(page-1)).Take(numberPerPage);
            var result = new PageDto<CustomerView>(await customerView.ToListAsync(), totalCount, numberPerPage, page);           
            return result;
        }
        public async Task<bool> Update(int id, UpdateCustomerDto customerDto)
        {
            IQueryable<Customer> customers = _invoiceDbContext.Customers;
            var previous = await customers.FirstOrDefaultAsync(c => c.Id == id);
            if (previous is null) return false;
            _mapper.Map<Customer>(customerDto);
            _mapper.Map(customerDto, previous);            
            previous.Id = id;
            await _invoiceDbContext.SaveChangesAsync();
            return true;
        }

        public async Task<bool> Delete(int id)
        {
            var customer = await _invoiceDbContext.Customers.FirstOrDefaultAsync(x => x.Id == id);
            if (customer == null) return false;
            IQueryable<Invoice> invoices = _invoiceDbContext.Invoices;
            if(invoices.Any(i => i.CustomerId == id)) return false;
            _invoiceDbContext.Customers.Remove(customer);
            await _invoiceDbContext.SaveChangesAsync();
            return true;

        }
    }
}


