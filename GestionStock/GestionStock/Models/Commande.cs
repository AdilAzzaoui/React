using System;
namespace GestionStock.Models
{
	public class Commande
	{
		public int Id { get; set; }
		public string NomProduit { get; set; }
		public DateTime DateCommande { get; set; }
		public string? TechnicienId { get; set; }
		public string Etat { get; set; }
		public User? Technicien { get; set; }
		public Composent? Composent { get; set; }
		public int ComposentId { get; set; }
	}
}

