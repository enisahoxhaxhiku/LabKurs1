using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Project.Models
{
    public partial class ProjectContext : DbContext
    {
        public ProjectContext()
        {
        }

        public ProjectContext(DbContextOptions<ProjectContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Koha> Koha { get; set; } = null!;
        public virtual DbSet<Lokacioni> Lokacioni { get; set; } = null!;
        public virtual DbSet<Perdoruesi> Perdoruesi { get; set; } = null!;
        public virtual DbSet<Rekomandimet> Rekomandimet { get; set; } = null!;
        public virtual DbSet<Restaurantet> Restaurantet { get; set; } = null!;
        public virtual DbSet<Takimet> Takimet { get; set; } = null!;




        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=ENISA\\SQLEXPRESS;Database=LabKurs1;\nTrusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Takimet>(entity =>
            {
                entity.ToTable("Takimet");

                entity.Property(e => e.TakimetID).HasColumnName("TakimetID");

                // entity.Property(e => e.CustomerId).HasColumnName("Customer_ID");

                //entity.Property(e => e.PaymentDate)
                //  .HasColumnType("date")
                //.HasColumnName("Payment_Date");

                entity.Property(e => e.LlojiTakimit).HasColumnName("LlojiTakimit");
                entity.Property(e => e.DataTakimit).HasColumnName("DataTakimit");

                entity.HasOne(d => d.Perdoruesi)
                    .WithMany(p => p.Takimet)
                    .HasForeignKey(d => d.PerdoruesiID)
                    .HasConstraintName("\t PerdoruesiID int foreign key references Perdoruesi(PerdoruesiID)");

                entity.HasOne(d => d.Lokacioni)
                  .WithMany(p => p.Takimet)
                  .HasForeignKey(d => d.LokacioniID)
                  .HasConstraintName("\t LokacioniID  int foreign key references Lokacioni(LokacioniID)");


            });
            ////////////////////////////////////////////////////////////////////////////////////////////////////


            modelBuilder.Entity<Lokacioni>(entity =>
            {
                entity.ToTable("Lokacioni");

                entity.Property(e => e.LokacioniID).HasColumnName("LokacioniID");

                entity.Property(e => e.Aktivitetet)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("Aktivitetet");

                entity.Property(e => e.LlojiLokacionit)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("LlojiLokacionit");
            });

            /////////////////////////////////////////////////////////////////////////////////////////////////////



            modelBuilder.Entity<Perdoruesi>(entity =>
           {
               entity.ToTable("Perdoruesi");

               entity.Property(e => e.PerdoruesiID).HasColumnName("PerdoruesiID");

               entity.Property(e => e.PerdoruesiName)
                   .HasMaxLength(50)
                   .IsUnicode(false)
                   .HasColumnName("PerdoruesiName");

               entity.Property(e => e.PerdoruesiSurname)
                   .HasMaxLength(70)
                   .IsUnicode(false)
                   .HasColumnName("PerdoruesiSurname");

               entity.Property(e => e.PerdoruesiEmail)
                   .HasMaxLength(80)
                   .IsUnicode(false)
                   .HasColumnName("PerdoruesiEmail");
           });
        }
    }
}

            ////////////////////////////////////////////////////////////////////////////////////////////////////////


