namespace InvoicesBackend.Models
{
    public class UpdateUserDto
    {
        public string Name { get; set; }
        public string Email { get; set; }       
        public int RoleId { get; set; }
    }
}
