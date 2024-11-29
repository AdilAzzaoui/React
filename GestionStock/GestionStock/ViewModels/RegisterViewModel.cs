using System;
using System.ComponentModel.DataAnnotations;

namespace GestionStock.ViewModels
{
	public class RegisterViewModel
	{
            [Required]
            [StringLength(100)]
            public string Nom { get; set; }

            [Required]
            [StringLength(100)]
            public string Prenom { get; set; }

            [Required]
            [EmailAddress]
            public string Email { get; set; }

            [Required]
            [StringLength(100, MinimumLength = 6)]
            [DataType(DataType.Password)]
            public string Password { get; set; }

            [Required]
            public UserType UserType { get; set; }

    }
    public enum UserType
    {
        Technicien = 1,
        ResponsableCommandes = 2
    }
}

