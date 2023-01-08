using InvoicesBackend.Entities;
using InvoicesBackend.Models.Update;
using InvoicesBackend.Services;
using Microsoft.AspNetCore.Mvc;

namespace InvoicesBackend.Requests
{
    public class UpdateRequests
    {
        public static async Task<IResult> Update(IUpdateService service, int id, [FromBody] UpdateDto updateDto)
        {
            var result = await service.Update(id, updateDto.updateDate);
            if(result == false) return Results.NotFound();
            return Results.NoContent();
        }
        public static async  Task<IResult> GetByID(IUpdateService service, int id)
        {
            var result = await service.GetByID(id);
            if(result == null) return Results.NotFound();
            return Results.Ok(result);
        }
    }
}
