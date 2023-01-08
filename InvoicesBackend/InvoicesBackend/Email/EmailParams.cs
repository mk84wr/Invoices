namespace InvoicesBackend.Email
{
    public class EmailParams
    {
        public string HostSmtp { get; set; }
        public bool EnableSsl { get; set; }
        public int Port { get; set; }
        public string SenderEmail { get; set; }
        public string SenderEmailPassword { get; set; }
        public string SenderName { set; get; }
    }
}
