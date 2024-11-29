using System;
using GestionStock.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace GestionStock.Data
{
	public class MyDbContext : IdentityDbContext<User>
	{
        public MyDbContext(DbContextOptions<MyDbContext> options)
    : base(options)
        {
        }
        public DbSet<Product>? Products { get; set; }
        public DbSet<ProductHistory>? ProductHistories { get; set; }
        public DbSet<Commande>? Commandes { get; set; }
        public DbSet<Composent>? Composents { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Product>()
                  .HasMany(p => p.Histories)
        .WithOne(ph => ph.Product)
        .HasForeignKey(ph => ph.ProductId)
        .OnDelete(DeleteBehavior.SetNull); // // Empêche la suppression en cascade
        }

    }
}

