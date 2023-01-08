namespace InvoicesBackend.Models
{
    public class CreateInvoiceDto
    {
        public string Number { get; set; }
        public DateTime DateOfInvoice { get; set; }
        public DateTime DueDate { get; set; }
        public decimal Value { get; set; }
        public int CustomerId { get; set; }
        public int CategoryId { get; set; }
    }
}
