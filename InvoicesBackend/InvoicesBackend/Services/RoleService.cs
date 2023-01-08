using InvoicesBackend.Entities;

namespace InvoicesBackend.Services
{
    public class RoleService : IRoleService
    {
        private readonly InvoiceDbContext _invoiceDbContext;
        public RoleService(InvoiceDbContext invoiceDbContext)
        {
            _invoiceDbContext = invoiceDbContext;
        }
        public Role GetRole(int id)
        {
            var role = _invoiceDbContext.Roles.FirstOrDefault(x => x.Id == id);
            if (role == null) return null;
            return role;
        }
        public IEnumerable<Role> GetAll()
        {
            var roles = _invoiceDbContext.Roles;
            return roles;
        }
       
    }
    public interface IRoleService
    {
        IEnumerable<Role> GetAll();
        Role GetRole(int id);
    }
}
