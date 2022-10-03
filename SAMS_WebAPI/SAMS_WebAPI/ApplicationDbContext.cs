using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SAMS_WebAPI.Entities;

namespace SAMS_WebAPI
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CompanyAdmin>()
                .HasKey(s => new { s.Id });

            modelBuilder.Entity<Employee>()
                .HasKey(s => new { s.Id });

            modelBuilder.Entity<Company>()
                .HasMany<Employee>(g => g.Employees)
                .WithOne(s => s.Company)
                .HasForeignKey(s => s.CompanyId);

            modelBuilder.Entity<Company>()
                .HasMany<CompanyAdmin>(g => g.Admins)
                .WithOne(s => s.Company)
                .HasForeignKey(s => s.CompanyId);


            modelBuilder.Entity<Employee>()
                .HasMany<Absence>(g => g.Absences)
                .WithOne(s => s.Employee)
                .HasForeignKey(s => s.EmployeeId);

            base.OnModelCreating(modelBuilder);


        }

        public DbSet<Company> Companies { get; set; }
        public DbSet<CompanyAdmin> CompanyAdmins { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Absence> Absences { get; set; }
    }
}
