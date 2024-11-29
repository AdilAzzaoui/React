using System;
using Microsoft.AspNetCore.Identity;

namespace GestionStock.Models
{
	public class User : IdentityUser
	{
		public string Nom { get; set; }
		public string Prenom { get; set; }
	}
}

