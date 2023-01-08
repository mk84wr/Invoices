

using InvoicesBackend.Services;

namespace InvoicesBackend.Requests
{
    public class RoleRequests
    {
        public static IResult GetById(IRoleService service, int id)
        {
            var role = service.GetRole(id);
            if (role == null) return Results.NotFound();
            return Results.Ok(role);
        }
        public static IResult GetAll(IRoleService service)
        {
            var roles = service.GetAll();
            if (roles == null) return Results.NotFound();
            return Results.Ok(roles);
        }
    }
}
