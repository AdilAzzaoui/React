using System;
namespace GestionStock.ViewModels
{
	public class ComponentAddVM
	{
		public string Nom { get; set; }
		public string Etat { get; set; }
		public int ProductId { get; set; }
		public string? SerieNumber { get; set; }
		public string? Description { get; set; }
	}
}

