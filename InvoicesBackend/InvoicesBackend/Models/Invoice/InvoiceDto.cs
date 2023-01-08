namespace InvoicesBackend.Models
{
    public class InvoiceDto
    {
        public int Id { get; set; }
        public string Number { get; set; }
        public DateTime DateOfInvoice { get; set; }
        public DateTime DueDate { get; set; }
        public DateTime? SettlementDate { get; set; }
        public decimal Value { get; set; }
        public decimal ToPay { get; set; }
        public int CustomerId { get; set; }
        public int CategoryId { get; set; }
        public string Customer { get; set; }
        public string Category { get; set; }
        public string Phone { get; set; }
    }
}
