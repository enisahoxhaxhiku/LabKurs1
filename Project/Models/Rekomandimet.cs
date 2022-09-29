


using System;
using System.Collections.Generic;

namespace Project.Models
{
    public partial class Rekomandimet
    {
        public Rekomandimet()
        {
            Restaurantet = new HashSet<Restaurantet>();
        }

        public int RekomandimetID { get; set; }
        public string? RekomandimetAddress { get; set; } = null!;


        public virtual ICollection<Restaurantet> Restaurantet { get; set; }
    }
}

