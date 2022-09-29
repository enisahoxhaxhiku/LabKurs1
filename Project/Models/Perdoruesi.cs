
using System;
using System.Collections.Generic;

namespace Project.Models
{
    public partial class Perdoruesi
    {
        public Perdoruesi()
        {
            Takimet = new HashSet<Takimet>();
        }

        public int PerdoruesiID { get; set; }
        public string? PerdoruesiName { get; set; }
        public string? PerdoruesiSurname { get; set; }
        public string? PerdoruesiEmail { get; set; }


        public virtual ICollection<Takimet> Takimet { get; set; }
    }
}

