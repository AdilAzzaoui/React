using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace GestionStock.ViewModels
{
	public class LoginViewModel
	{
        [DisplayName("Adresse Email")]
        [Required(ErrorMessage = "L'adresse e-mail est requise")]
        [EmailAddress(ErrorMessage = "Veuillez entrer une adresse e-mail valide")]
        public string Email { get; set; }
        [DisplayName("Mot De Passe ")]
        [Required(ErrorMessage = "Le mot de passe est requis")]
        [DataType(DataType.Password)]
        [StringLength(100, ErrorMessage = "Le {0} doit comporter au moins {2} et au maximum {1} caractères.", MinimumLength = 6)]
        public string Password { get; set; }
    }
}

