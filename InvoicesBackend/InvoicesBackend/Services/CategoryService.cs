using AutoMapper;
using InvoicesBackend.Entities;
using InvoicesBackend.Entities.Views;
using InvoicesBackend.Models;
using InvoicesBackend.Models.Category;
using Microsoft.EntityFrameworkCore;

namespace InvoicesBackend.Services
{
    public interface ICategoryService
    {
        Task<CategoryDto> Create(CreateCategoryDto categoryDto);
        Task<bool> Update(int id, CreateCategoryDto categoryDto);
        Task<CategoryDto> GetCategory(int id);
        Task<List<CategoryView>> GetAllCategories();
        Task<bool> Delete(int id);
    }

    public class CategoryService : ICategoryService
    {
        private readonly InvoiceDbContext _invoiceDbContext;
        private readonly IMapper _mapper;

        public CategoryService(InvoiceDbContext invoiceDbContext, IMapper mapper)
        {
            _invoiceDbContext = invoiceDbContext;
            _mapper = mapper;
        }
        public async Task<CategoryDto> Create(CreateCategoryDto categoryDto)
        {
            if (categoryDto == null)
            {
                return null;
            }
            var category = new Category();
            category.Name = categoryDto.Name;

            await _invoiceDbContext.AddAsync(category);
            await _invoiceDbContext.SaveChangesAsync();
           
            return _mapper.Map<CategoryDto>(category);
        }
        public async Task<bool> Update(int id, CreateCategoryDto categoryDto)
        {
            IQueryable<Category> categories = _invoiceDbContext.Categories;
            var previous =  await categories.FirstOrDefaultAsync(x => x.Id == id);
            if (previous is null) return false;
            previous.Id = id;
            previous.Name = categoryDto.Name;
            await _invoiceDbContext.SaveChangesAsync();
            return true;
        }
        public async Task<CategoryDto> GetCategory(int id)
        {
            var category = await _invoiceDbContext.Categories.FirstOrDefaultAsync(x => x.Id == id);
            if(category == null) return null;
            return _mapper.Map<CategoryDto>(category);
        }
        public async Task<List<CategoryView>> GetAllCategories()
        {
            return await _invoiceDbContext.CategoriesView.OrderBy(x=>x.Name).OrderBy(c => c.Name).ToListAsync();
        }

        public async Task<bool> Delete(int id)
        {
            var category = await _invoiceDbContext.Categories.FirstOrDefaultAsync(x => x.Id == id);
            if(category == null) return false;
            IQueryable<Invoice> invoices = _invoiceDbContext.Invoices;
            if (invoices.Any(i => i.CategoryId == id)) return false;
            _invoiceDbContext.Categories.Remove(category);
            await _invoiceDbContext.SaveChangesAsync();
            return true;
        }
    }
}
