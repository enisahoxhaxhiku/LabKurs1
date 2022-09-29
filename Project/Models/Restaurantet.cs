

using System;
using System.Collections.Generic;

namespace Project.Models
{
    public partial class Restaurantet
    {
        public Restaurantet()
        {
            Lokacioni = new HashSet<Lokacioni>();
            Rekomandimet = new HashSet<Rekomandimet>();
        }

        public int RestaurantetID { get; set; }
        public string? RestaurantetName { get; set; }
        public string? RestaurantetAddress { get; set; } = null!;
        public string? RestaurantetMenu { get; set; }


        public virtual ICollection<Lokacioni> Lokacioni { get; set; }
        public virtual ICollection<Rekomandimet> Rekomandimet { get; set; }
    }
}