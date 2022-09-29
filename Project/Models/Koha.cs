

using System;
using System.Collections.Generic;

namespace Project.Models
{
    public partial class Koha
    {
        public Koha()
        {
            Takimet = new HashSet<Takimet>();
        }

        public int KohaID { get; set; }
        public int KohaDay { get; set; }
        public string? KohaMonth { get; set; }
        public int KohaYear { get; set; }


        public virtual ICollection<Takimet> Takimet { get; set; }
    }
}

