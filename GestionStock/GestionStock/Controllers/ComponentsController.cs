using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;
using GestionStock.Data;
using GestionStock.Models;
using GestionStock.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GestionStock.Controllers
{
    [Route("api/[controller]")]
    public class ComponentsController : Controller
    {
        private readonly MyDbContext _context;

        public ComponentsController(MyDbContext context)
        {
            _context = context;
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> PatchComponent(int id,[FromBody] CompoenetsPatchVM model)
        {
            // Rechercher le composant dans la base de données
            var component = await _context.Composents.FirstOrDefaultAsync(c => c.Id == id);
            if (component == null)
            {
                return BadRequest("Vérifiez les informations du composant");
            }

            // Mettre à jour l'état du composant en mémoire
            component.Etat = model.Etat;

            // Créer un nouvel enregistrement dans l'historique du produit
            var history = new ProductHistory
            {
                Description = model.Description,
                MaintenanceDate = DateTime.Now,
                ProductId = component.ProductId,
                TechnicienId = model.TechnicienId,
            };

            // Ajouter l'historique à la base de données
            _context.ProductHistories.Add(history);

            // Enregistrer les modifications dans la base de données
            await _context.SaveChangesAsync();

            // Retourner une réponse indiquant que la mise à jour a réussi
            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteComponent(int id)
        {
            var component = _context.Composents.FirstOrDefault(c => c.Id == id);
            if (component == null) return BadRequest("verifier les infos de produits");
            _context.Composents.Remove(component);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        [HttpPost]
        public async Task<IActionResult> PostComponent([FromBody]ComponentAddVM model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var product = _context.Products.FirstOrDefault(p => p.Id == model.ProductId);
            if (product == null) return BadRequest("Verifier les donnees de Produit!");
            var composent = new Composent
            {
                Etat = model.Etat,
                Nom = model.Nom,
                ProductId = model.ProductId,
                Product = product
            };
            _context.Composents.Add(composent);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetComponentById), new { id = composent.Id }, composent);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Composent>> GetComponentById(int id)
        {
            var composent = await _context.Composents.FindAsync(id);
            if (composent == null) return BadRequest("Verifier les donnees de composent");
            return Ok(composent);
        }
    }
}

