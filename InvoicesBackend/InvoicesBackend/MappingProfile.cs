using AutoMapper;
using InvoicesBackend.Entities;
using InvoicesBackend.Models;
using InvoicesBackend.Models.Category;
using InvoicesBackend.Models.Customer;
using Microsoft.EntityFrameworkCore.Storage;

namespace InvoicesBackend
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<CreateCategoryDto, Category>();
            CreateMap<CreateCustomerDto, Customer>();
            CreateMap<UpdateCustomerDto, Customer>();
            CreateMap<CreateInvoiceDto, Invoice>();
            CreateMap<UpdateInvoiceDto, Invoice>();
            CreateMap<Invoice, InvoiceDto>()
                .ForMember(dest => dest.Category, opts => opts.MapFrom(src => src.Category.Name))
                .ForMember(dest => dest.Customer, opts => opts.MapFrom(src => src.Customer.Name))
                .ForMember(dest => dest.Phone, opts => opts.MapFrom(src => src.Customer.Phone));
            CreateMap<User, UserDto>()
                .ForMember(dest => dest.RoleName, opts => opts.MapFrom(src => src.Role.Name));
            CreateMap<Category, CategoryDto>();
            CreateMap<Customer, CustomerDto>();
            CreateMap<UserDto, User>();
            
        }  
    }
}
