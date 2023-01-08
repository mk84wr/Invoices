namespace InvoicesBackend.Entities
{
    public class Customer 
    {
        public int Id { get; set; }

        public string Name { get; set; }
        public string? Nip { get; set; }
        public string? City { get; set; }
        public string? Street { get; set; }
        public Boolean IsActive { get; set; }
        public Boolean IsVisible { get; set; }
        public List<Invoice> Invoices { get; set; } = new List<Invoice>();
        public string? Phone { get; set; }
        public string? Email { get; set; }

    }
}
