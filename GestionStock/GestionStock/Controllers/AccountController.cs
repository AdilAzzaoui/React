using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GestionStock.Models;
using GestionStock.Utilities;
using GestionStock.ViewModels;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GestionStock.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IConfiguration _configuration;

        public AccountController(IConfiguration configuration ,SignInManager<User> signInManager, UserManager<User> userManager, RoleManager<IdentityRole> roleManager)
        {
            _roleManager = roleManager;
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = new User
            {
                UserName = model.Email,
                Email = model.Email,
                Nom = model.Nom,
                Prenom = model.Prenom
            };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(string.Empty, error.Description);
                }
                return BadRequest(ModelState);
            }

            if (await _roleManager.RoleExistsAsync(model.UserType.ToString()))
            {
                await _userManager.AddToRoleAsync(user, model.UserType.ToString());
            }
            else
            {
                ModelState.AddModelError(string.Empty, "Role does not exist.");
                return BadRequest(ModelState);
            }

            return Ok(new { Message = "User registered successfully" });
        }
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Données de connexion invalides");
            }

            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                return BadRequest("Aucun compte n'existe avec cette adresse email!");
            }


            if (await _userManager.IsLockedOutAsync(user))
            {
                return StatusCode(423, "Compte verrouillé pendant 5 minutes en raison de trop de tentatives de connexion infructueuses");
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, model.Password, false);
            if (result.Succeeded)
            {
                await _userManager.ResetAccessFailedCountAsync(user); // Réinitialiser le compteur de tentatives de connexion infructueuses
                var token = await JwtUtils.GenerateJwtTokenAsync(user, _configuration, _userManager);

                // Envoyer les notifications à l'utilisateur via SignalR

                return Ok(new { data = token });
            }
            await _userManager.AccessFailedAsync(user); // Incrémenter le compteur de tentatives de connexion infructueuses

            if (result.IsLockedOut)
            {
                return StatusCode(423, "Compte verrouillé pendant 5 minutes en raison de trop de tentatives de connexion infructueuses!");
            }

            return BadRequest("Email ou Mot de passe Incorrects !");
        }
        [HttpPost("logout")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> Logout()
        {

            await _signInManager.SignOutAsync();

            // Retourner une réponse OK si la déconnexion réussit
            return Ok("Deconnection reussie !");
        }
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("update-password")]
        public async Task<IActionResult> UpdatePassword(UpdatePasswordVM model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Récupérer l'utilisateur actuellement authentifié
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                // L'utilisateur n'est pas authentifié
                return Unauthorized();
            }

            // Vérifier si l'ancien mot de passe correspond
            var result = await _userManager.ChangePasswordAsync(user, model.OldPassword, model.NewPassword);
            if (!result.Succeeded)
            {
                // La modification du mot de passe a échoué
                return BadRequest(result.Errors);
            }

            return Ok("Mot de passe modifié avec succès !");
        }


    }

}


