using KrakenSoftware.Starfield.Planner.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace KrakenSoftware.Starfield.Planner.Data.Context
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options): base(options)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Structure>().HasIndex(u => u.Name).IsUnique(true);
        }

        public DbSet<Structure> Structures { get; set; }
    }
}
