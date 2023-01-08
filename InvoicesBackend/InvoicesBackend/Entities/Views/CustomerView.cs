namespace InvoicesBackend.Entities.Views
{
    public class CustomerView
    {
        public int Id { get; set; }

        public string Name { get; set; }
        public string? Nip { get; set; }
        public string? City { get; set; }
        public string? Street { get; set; }
        public Boolean IsActive { get; set; }
        public Boolean IsVisible { get; set; }
        public decimal Total { get; set; }
        public decimal Sum { get; set; }
        public string? Phone { get; set; }
    }
}
