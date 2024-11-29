using System;
namespace GestionStock.Models
{
	public class Product
	{
		public int? Id { get; set; }
		public string SiteCode { get; set; }
		public string? Art { get; set; }
		public string Province { get; set; }
		public string Region { get; set; }
		public string GPS { get; set; }
		public string FM1 { get; set; }

		public string Status { get; set; }
		public DateTime? LastVerificationDate { get; set; }
		public DateTime? ExpirationVerification { get; set; }
		public DateTime? DateEntre { get; set; }
		public bool ServiceReportDone { get; set; }
		public User? Technicien { get; set; }
		public string? TechnicienId { get; set; }
		public string? ComposentDefailles { get; set; }
		public ICollection<ProductHistory>? Histories { get; set; }
		public IList<Composent>? Composents { get; set; }
	}

}

