

using System;
using System.Collections.Generic;

namespace Project.Models
{
    public partial class Lokacioni
    {
        public Lokacioni()
        {
            Takimet = new HashSet<Takimet>();
            Restaurantet = new HashSet<Restaurantet>();
        }

        public int LokacioniID { get; set; }
        public string? Aktivitetet { get; set; }
        public string? LlojiLokacionit { get; set; }


        public virtual ICollection<Takimet> Takimet { get; set; }
        public virtual ICollection<Restaurantet> Restaurantet { get; set; }
    }
}