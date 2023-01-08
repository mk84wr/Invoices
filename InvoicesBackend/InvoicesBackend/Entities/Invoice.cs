namespace InvoicesBackend.Entities
{
    public class Invoice 
    {
        public int Id { get; set; }
        public string Number { get; set; }
        public DateTime DateOfInvoice { get; set; }    
        public DateTime DueDate { get; set; }  
        public DateTime? SettlementDate { get; set; }
        public decimal Value { get; set; }
        public decimal ToPay { get; set; }
        public int CustomerId { get; set; }
        public  Customer Customer { get; set; }      
        public int CategoryId { get; set; }
        public  Category Category { get; set; }

    }
}
