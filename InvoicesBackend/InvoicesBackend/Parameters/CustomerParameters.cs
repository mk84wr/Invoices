using InvoicesBackend.Entities;

namespace InvoicesBackend.Parameters
{
    public class CustomerParameters
    {
        public CustomerParameters(bool? isActive, bool? isVisible, decimal? minSum, decimal? maxSum, int? numberPerPage, int? page, string? sortBy, bool? ascending, string nip, string name)
        {
            IsActive=isActive;
            IsVisible=isVisible;
            MinSum=minSum;
            MaxSum=maxSum;
            NumberPerPage=numberPerPage;
            Page=page??1;
            SortBy=sortBy??"Name";
            Ascending=ascending??true;
            Nip=nip;
            Name=name;
        }

        public Boolean? IsActive { get; set; }      
        public Boolean? IsVisible { get; set; }
        public decimal? MinSum { get; set; }
        public decimal? MaxSum { get; set; }
        public int? NumberPerPage { get; set; }
        public int Page { get; set; }
        public string SortBy { get; set; }
        public Boolean Ascending { get; set; }
        public string Nip { get; set; }
        public string Name { get; set; }
    }
    
}
