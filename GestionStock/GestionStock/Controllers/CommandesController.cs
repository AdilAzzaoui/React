using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GestionStock.Data;
using GestionStock.Models;
using GestionStock.ViewModels;

namespace GestionStock.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommandesController : ControllerBase
    {
        private readonly MyDbContext _context;

        public CommandesController(MyDbContext context)
        {
            _context = context;
        }

        // GET: api/Commandes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Commande>>> GetCommandes()
        {
            return await _context.Commandes.Include(c => c.Technicien).Include(c => c.Composent).ToListAsync();
        }

        // GET: api/Commandes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Commande>> GetCommande(int id)
        {
            var commande = await _context.Commandes.FindAsync(id);

            if (commande == null)
            {
                return NotFound();
            }

            return commande;
        }

        // PUT: api/Commandes/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCommande(int id, CommandeUpdateVM model)
        {
            var commande = await _context.Commandes.FirstOrDefaultAsync(c => c.Id == id);
            if (commande == null) return BadRequest("Verifier les infos de commande");
            if (id != commande.Id)
            {
                return BadRequest();
            }
            commande.Etat = model.Etat;
            _context.Entry(commande).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CommandeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Commandes
        [HttpPost]
        public async Task<ActionResult<Commande>> PostCommande(CommandeAddVM model)
        {
            // Validation du modèle d'entrée
            if (model == null || model.ComposentId == 0 || string.IsNullOrWhiteSpace(model.NomComposant) || string.IsNullOrWhiteSpace(model.TechnicienId))
            {
                return BadRequest("Invalid model data.");
            }

            // Rechercher le composant et le technicien associés
            var composent = await _context.Composents.FirstOrDefaultAsync(c => c.Id == model.ComposentId);
            var technicien = await _context.Users.FirstOrDefaultAsync(u => u.Id == model.TechnicienId);
            var productId = await _context.Products
                .Where(p => p.Id == composent.ProductId)
                .Select(p => p.Id)
                .FirstOrDefaultAsync();
            if (composent == null || technicien == null)
            {
                return NotFound("Component or Technician not found.");
            }

            // Créer une nouvelle commande
            var commande = new Commande
            {
                ComposentId = model.ComposentId,
                Composent = composent,
                DateCommande = DateTime.Now,
                Etat = "En Cours",
                NomProduit = model.NomComposant,
                TechnicienId = model.TechnicienId,
                Technicien = technicien,
            };

            // Créer une nouvelle entrée d'historique de produit
            var history = new ProductHistory
            {
                ProductId = productId,
                Description = "Nouvelle commande",
                TechnicienId = model.TechnicienId,
                Technicien = technicien,
            };

            // Ajouter et enregistrer les modifications dans la base de données
            _context.ProductHistories.Add(history);
            _context.Commandes.Add(commande);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCommande), new { id = commande.Id }, commande);
        }

        // DELETE: api/Commandes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var commande = await _context.Commandes.FindAsync(id);
            if (commande == null)
            {
                return NotFound();
            }

            _context.Commandes.Remove(commande);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CommandeExists(int id)
        {
            return _context.Commandes.Any(e => e.Id == id);
        }
    }
}
