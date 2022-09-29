
using System;
using System.Collections.Generic;

namespace Project.Models
{
    public partial class Takimet
    {
        public Takimet()
        {
            Perdoruesi = new HashSet<Perdoruesi>();
            Koha = new HashSet<Koha>();
            Lokacioni = new HashSet<Lokacioni>();
        }

        public int TakimetID { get; set; }
        public string? LlojiTakimit { get; set; }

        //private DateTime dataTakimit;

       // public DateTime GetDataTakimit()
        //{
          //  return dataTakimit;
        //}

        //public void SetDataTakimit(DateTime value)
        //{
          //  dataTakimit = value;
        //}


          public DateTime DataTakimit { get; set; }

        public virtual ICollection<Perdoruesi> Perdoruesi { get; set; }
        public virtual ICollection<Koha> Koha { get; set; }
        public virtual ICollection<Lokacioni> Lokacioni { get; set; }
    }
}
