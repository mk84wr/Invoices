using HtmlAgilityPack;



namespace InvoicesBackend.Search
{
    public class SearchBusiness
    {
        public static Business? GetBusiness(string nip)
        {
            try
            {

                var web = new HtmlWeb();
                nip = nip.Replace("-", string.Empty);
                string url = $"https://www.owg.pl/obf/wynik?linia_1={nip}";
                var document = web.Load(url);
                if (!ValidateNip(nip)) return null;
                var name = document.DocumentNode.SelectSingleNode("/html/body/div[1]/div/div/div/div[3]/div[1]/div/div[1]/div[1]/div[2]/ul/li/div/div[2]/div[2]/div/div[2]/div/div/div[2]/div[1]/div/div[2]/div[2]/div/div[2]/div[2]/div/a");
                if (name == null) return null;
                else
                {
                    var city = document.DocumentNode.SelectSingleNode("/html/body/div[1]/div/div/div/div[3]/div[1]/div/div[1]/div[1]/div[2]/ul/li/div/div[2]/div[2]/div/div[2]/div/div/div[2]/div[2]/div/div[2]/div[2]/div/div[2]/div[4]/div/div[2]").InnerText;
                    var street = document.DocumentNode.SelectSingleNode("/html/body/div[1]/div/div/div/div[3]/div[1]/div/div[1]/div[1]/div[2]/ul/li/div/div[2]/div[2]/div/div[2]/div/div/div[2]/div[2]/div/div[2]/div[2]/div/div[2]/div[1]/div/div[2]").InnerText;
                    var n = document.DocumentNode.SelectSingleNode("/html/body/div[1]/div/div/div/div[3]/div[1]/div/div[1]/div[1]/div[2]/ul/li/div/div[2]/div[2]/div/div[2]/div/div/div[2]/div[2]/div/div[2]/div[2]/div/div[2]/div[2]/div/div[2]").InnerText;
                    var l = document.DocumentNode.SelectSingleNode("/html/body/div[1]/div/div/div/div[3]/div[1]/div/div[1]/div[1]/div[2]/ul/li/div/div[2]/div[2]/div/div[2]/div/div/div[2]/div[2]/div/div[2]/div[2]/div/div[2]/div[3]/div/div[2]").InnerText;
                    var number = n.Replace(",", string.Empty) + " lok. "+l.Replace(",", string.Empty);


                    return new Business(name.InnerText, nip, city.Replace(",", string.Empty), street +" "+number);
                }
            }
            catch (Exception e)
            {
                return null;
            }

        }
       
        public static bool ValidateNip(string nip)
        {
           // nip = nip.Replace("-", string.Empty);

            if (nip.Length != 10 || nip.Any(chr => !Char.IsDigit(chr)))
                return false;

            int[] weights = { 6, 5, 7, 2, 3, 4, 5, 6, 7, 0 };
            int sum = nip.Zip(weights, (digit, weight) => (digit - '0') * weight).Sum();

            return (sum % 11) == (nip[9] - '0');
        }
    }
}
