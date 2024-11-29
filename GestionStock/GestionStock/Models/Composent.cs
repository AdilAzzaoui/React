using System;
namespace GestionStock.Models
{
	public class Composent
	{
		public int Id { get; set; }
		//public string? SerieNumber { get; set; }
		//public string? Description { get; set; }
		public string Nom { get; set; }
		public string Etat { get; set; }
		public Product? Product { get; set; }
		public int ProductId { get; set; }
		public Commande? Commande { get; set; }
	}
}

