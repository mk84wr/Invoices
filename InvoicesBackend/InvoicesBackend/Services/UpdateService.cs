using AutoMapper;
using InvoicesBackend.Entities;
using Microsoft.EntityFrameworkCore;

namespace InvoicesBackend.Services
{
    public interface IUpdateService
    {
        Task<bool> Update(int id,  DateTime? update);
        Task<Update> GetByID(int id );

    }
    public class UpdateService : IUpdateService
    {
        private readonly InvoiceDbContext _invoiceDbContext;
        private readonly IMapper _mapper;
        public UpdateService(InvoiceDbContext invoiceDbContext, IMapper mapper)
        {
            _invoiceDbContext = invoiceDbContext;
            _mapper = mapper;
        }

        public async Task<Update> GetByID(int id)
        {
            var result = await _invoiceDbContext.Updates.FirstOrDefaultAsync(x => x.Id == id);
            if(result == null) return null;
            return result;
        }

        public async Task<bool> Update( int id, DateTime? update)
        {
            IQueryable<Update> updates = _invoiceDbContext.Updates;
            var result = await updates.FirstOrDefaultAsync(x => x.Id == id);
            if(result == null) return false;
            result.UpdateDate = update;
            await _invoiceDbContext.SaveChangesAsync();
            return true;
        }
    }
}
