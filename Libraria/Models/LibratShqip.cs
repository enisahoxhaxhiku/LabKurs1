

using System.Text.Json.Serialization;

namespace Librat.Models
{
    public class Librat_Shqip
    {
        public int LibratShId  { get; set; }

        public string? Titulli { get; set; }

        public string? Foto_Sh  { get; set; }

        public DateTime? Data_PostimitSh  { get; set; }

        public string? Pershkrimi_Librit_Shqip  { get; set; }

        public string? ISBN_Librit_Shqip  { get; set; }

        public int? AutoriID  { get; set; }

        public int? KategoriaID { get; set; }

        public int? PublicistiID  { get; set; }

        public int? RevistaID  { get; set; }

        public int? EventiID  { get; set; }
    }
}
