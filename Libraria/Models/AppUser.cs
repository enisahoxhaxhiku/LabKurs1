using Microsoft.AspNetCore.Identity;
namespace Librat.Models
{
    public class AppUser : IdentityUser
    {
        public string Id { get; set; }
    }
}
