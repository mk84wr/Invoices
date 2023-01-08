namespace InvoicesBackend.Search
{
    public class Business
    {
        public Business(string name, string nip, string city, string street)
        {
            Name=name;
            Nip=nip;
            City=city;
            Street=street;            
        }

        public string Name { get; set; }
        public string Nip { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
       
       
    }
}
