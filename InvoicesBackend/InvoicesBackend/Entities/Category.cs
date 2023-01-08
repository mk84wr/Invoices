namespace InvoicesBackend.Entities
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<Invoice> Invoices { get; set; } = new List<Invoice>() ;

    }
}

