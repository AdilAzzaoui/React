using System;
using System.ComponentModel.DataAnnotations;

namespace GestionStock.ViewModels
{
    public class UpdatePasswordVM
    {
        [Required(ErrorMessage = "Old Password Required")]
        [DataType(DataType.Password)]
        public string OldPassword { get; set; }
        [Required(ErrorMessage = "New Password Required")]
        [DataType(DataType.Password)]

        public string NewPassword { get; set; }
        [Required(ErrorMessage = "Confirm Password Required")]
        [DataType(DataType.Password)]
        [Compare("NewPassword", ErrorMessage = "Les mot de passes doit etre identiques !")]
        public string ConfirmPassword { get; set; }

    }
}

