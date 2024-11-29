using System;
namespace GestionStock.Models
{
	public class ProductHistory
	{
		public int Id { get; set; }
        public int? ProductId { get; set; }
        public Product? Product { get; set; }
        public string? Description { get; set; }
        public DateTime? MaintenanceDate { get; set; }

        public string? TechnicienId { get; set; }
        public User? Technicien { get; set; }
    }
}

