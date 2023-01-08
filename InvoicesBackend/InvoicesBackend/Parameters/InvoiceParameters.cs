using InvoicesBackend.Entities;
using Microsoft.AspNetCore.Mvc;

namespace InvoicesBackend
{
    
    public class InvoiceParameters 
    {
        public InvoiceParameters(DateTime? minDueDate, DateTime? maxDueDate, decimal? minToPay, decimal? maxToPay, DateTime? minSettlementDate,
            DateTime? maxSettlementDate, bool? isActive, bool? isVisible, int? numberPerPage, int? page , string? sortBy, bool? ascending , string? number,
            string? customer, string? category, int? customerId, int? categoryId, DateTime? minDateOfInvoice, DateTime? maxDateOfInvoice, string nip)
        {
            MinDueDate=minDueDate;
            MaxDueDate=maxDueDate;
            MinToPay=minToPay;
            MaxToPay=maxToPay;
            MinDateOfInvoice = minDateOfInvoice;
            MaxDateOfInvoice = maxDateOfInvoice;

            MinSettlementDate =minSettlementDate;
            MaxSettlementDate=maxSettlementDate;
            IsActive=isActive;
            IsVisible=isVisible;
            NumberPerPage=numberPerPage;
            Page=page??1;
            SortBy=sortBy??"DateOfInvoice";
            Ascending=ascending??false;
            Number=number;
            Customer=customer;
            Category=category;
            CustomerId=customerId;
            CategoryId=categoryId;
            Nip=nip;

        }

        public DateTime? MinDueDate { get; set; }
        public DateTime? MaxDueDate { get; set; }
        public decimal? MinToPay { get; set; }
        public decimal? MaxToPay { get; set; }
        public DateTime? MinSettlementDate { get; set; }
        public DateTime? MaxSettlementDate { get; set; }
        public Boolean? IsActive { get; set; }
        
        public Boolean? IsVisible { get; set; }

        public int? NumberPerPage { get; set; }
        public int Page { get; set; }
        public string SortBy { get; set; }
        public Boolean Ascending { get; set; }
        public string Number { get; set; }
        public string Customer { get; set; }
        public string Category { get; set; }
        public int? CustomerId { get; set; }
        public int? CategoryId { get; set; }
        public DateTime? MinDateOfInvoice { get; set; }
        public  DateTime? MaxDateOfInvoice { get; set; }
        public string Nip { get; set; }

    }
}
