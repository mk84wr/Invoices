using FluentValidation;
using InvoicesBackend.Entities;
using InvoicesBackend.Models;
using InvoicesBackend.Models.Category;
using InvoicesBackend.Services;
using Microsoft.AspNetCore.Mvc;

namespace InvoicesBackend.Requests
{
    public class CategoryRequests
    {
        public static async Task<IResult> Create(ICategoryService service, CreateCategoryDto categoryDto, IValidator<CreateCategoryDto>validator)
        {
            var validationResult = validator.Validate(categoryDto);
            if (!validationResult.IsValid)
            {
                return Results.BadRequest(validationResult.Errors);
            }
            CategoryDto category = await service.Create(categoryDto);
            return Results.Created($"/category/{category.Id}", category);

        }
        public static async Task<IResult> Update(ICategoryService service, int id, [FromBody] CreateCategoryDto categoryDto, IValidator<CreateCategoryDto> validator)
        {
            var validationResult = validator.Validate(categoryDto);
            if (!validationResult.IsValid)
            {
                return Results.BadRequest(validationResult.Errors);
            }

            var result = await service.Update(id, categoryDto);
            if (result == false) return Results.NotFound();
            return Results.NoContent();
        }
        public static async Task<IResult> GetByParameters(ICategoryService service)
        {
            var categories = await service.GetAllCategories();
            if (categories == null) return Results.NotFound();
            return Results.Ok(categories);
        }
        public static async Task<IResult> GetById(ICategoryService service, int id)
        {
            CategoryDto category = await service.GetCategory(id);
            if (category == null) return Results.NotFound();
            return Results.Ok(category);
        }
        public static async Task<IResult> Delete(ICategoryService service, int id)
        {
            var result = await service.Delete(id);
            if (result == false) return Results.NotFound();
            return Results.NoContent();
        }
    }
}
