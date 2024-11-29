using GestionStock.Data;
using GestionStock.Models;
using GestionStock.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Type = GestionStock.ViewModels.Type;

namespace GestionStock.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly MyDbContext _context;

        public ProductsController(MyDbContext context)
        {
            _context = context;
        }

        // GET: api/Products
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        //{
        //    var products = await _context.Products.Include(p => p.Histories).ToListAsync();
        //    return Ok(products); // 200 OK
        //}

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts(
            [FromQuery] string? art,
            [FromQuery] string? province,
            [FromQuery] string? siteCode,
            [FromQuery] string? region)
        {
            var query = _context.Products
                                 .Include(p => p.Histories)
                                 .Include(p => p.Composents)
                                 .AsQueryable();

            if (!string.IsNullOrEmpty(art))
            {
                query = query.Where(p => p.Art.Contains(art));
            }

            if (!string.IsNullOrEmpty(province))
            {
                query = query.Where(p => p.Province.Contains(province));
            }

            if (!string.IsNullOrEmpty(siteCode))
            {
                query = query.Where(p => p.SiteCode.Contains(siteCode));
            }

            if (!string.IsNullOrEmpty(region))
            {
                query = query.Where(p => p.Region.Contains(region));
            }

            var products = await query.ToListAsync();

            return Ok(products);
        }


        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products.Include(p => p.Histories).Include(p => p.Technicien)
                                                 .FirstOrDefaultAsync(p => p.Id == id);

            if (product == null)
            {
                return NotFound(); // 404 Not Found
            }

            return Ok(product); // 200 OK
        }

        //PUT: api/Products/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int id, ProductUpdateVM product)
        {
            var productExist = await _context.Products.FirstOrDefaultAsync(p => p.Id == id);

            if (productExist == null)
            {
                return BadRequest(); // 400 Bad Request
            }



            // Preserve the existing properties that should not be changed
            var Technicien = await _context.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Id == product.TechnicienId);
            if (Technicien == null) return BadRequest("tech not found");
            if(Technicien.Id != productExist.TechnicienId)
            {
                productExist.Technicien = Technicien;
                productExist.TechnicienId = product.TechnicienId;
            }
            if (product.Status == StatusUpdate.Valide)
            {
                productExist.LastVerificationDate = DateTime.Now;
                productExist.ExpirationVerification = DateTime.Now.AddYears(1).AddDays(1);
                productExist.Status = product.Status.ToString();
                ProductHistory productHistory = new ProductHistory
                {
                    Description = product.Description,
                    MaintenanceDate = DateTime.Now,
                    ProductId = id,
                    Product = productExist,
                    TechnicienId = productExist.TechnicienId,
                    Technicien = Technicien
                };
            }
            productExist.GPS = product.GPS ?? productExist.GPS;
            productExist.FM1 = product.FM1 ?? productExist.FM1;
            productExist.Art = product.Art.ToString();
            productExist.SiteCode = product.SiteCode ?? product.SiteCode;
            productExist.Region = product.Region ?? product.Region;
            productExist.Province = product.Province ?? product.Province;


            // Attach the updated entity and mark it as modified
            _context.Entry(productExist).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
                {
                    return NotFound(); // 404 Not Found
                }
                else
                {
                    throw;
                }
            }

            return NoContent(); // 204 No Content
        }


        // POST: api/Products
        //[HttpPost]
        //public async Task<ActionResult<Product>> PostProduct(ProductAddViewModel model)
        //{
        //    product.Date = DateTime.Now;
        //    _context.Products.Add(product);
        //    var history = new ProductHistory
        //    {
        //        Description = "Ajout de produit en stock",
        //        TechnicienId = product.
        //    }
        //    _context.ProductHistories
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product); // 201 Created
        //}
        [HttpGet("types")]
        public IActionResult GetProductTypes()
        {
            var types = Enum.GetValues(typeof(Type));
            var result = new List<object>();

            foreach (var type in types)
            {
                result.Add(new
                {
                    Name = Enum.GetName(typeof(Type), type),
                    Value = (int)type
                });
            }

            return Ok(result);
        }
        [HttpPost]
        public async Task<ActionResult<Product>> PostProduct(ProductAddViewModel model) {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState); // Retourne les erreurs de validation
            }
            
                var technicien = await _context.Users.FindAsync(model.TechnicienId);
                if (technicien != null)
                {
                    Product p = new Product
                    {
                        Status = model.Status.ToString(),
                        Art = model.Art.ToString(),
                        Province = model.Province,
                        FM1 = model.FM1,
                        GPS = model.GPS,
                        Region = model.Region,
                        ServiceReportDone = false,
                        SiteCode = model.SiteCode,
                        TechnicienId = technicien.Id,
                        Technicien = technicien,
                        DateEntre = DateTime.Now
                    };
                    _context.Products.Add(p);
                    await _context.SaveChangesAsync();
                    ProductHistory ph = new ProductHistory
                    {
                        Description = "Ajout en stock",
                        Product = p,
                        ProductId = p.Id,
                        TechnicienId = model.TechnicienId,
                        Technicien = technicien,
                    };
                    _context.ProductHistories.Add(ph);
                    await _context.SaveChangesAsync();
                    return CreatedAtAction(nameof(GetProduct), new { id = p.Id }, p);
                }return BadRequest("Veuillez verifier les infos de technicien");


        }
        private async Task PostHistoryAsync(ProductHistory history)
        {
            try
            {
                _context.ProductHistories.Add(history);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        // DELETE: api/Products/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            // Trouver le produit avec l'ID spécifié
            var product = await _context.Products
                .Include(p => p.Histories) // Inclure les historiques pour vérifier leur présence
                .FirstOrDefaultAsync(p => p.Id == id);

            if (product == null)
            {
                return NotFound(); // 404 Not Found
            }

            // Supprimer le produit sans toucher aux historiques
            _context.Products.Remove(product);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                // Logger l'erreur et renvoyer un message approprié
                Console.Error.WriteLine($"An error occurred: {ex.Message}");
                return StatusCode(500, "An error occurred while deleting the product.");
            }

            return NoContent(); // 204 No Content
        }

        [HttpGet("components/{id}")]
        public async Task<ActionResult<IList<Composent>>> GetProductComponents(int id)
        {
            var components = await _context.Composents.Where(c => c.ProductId == id).ToListAsync();
            if (components == null) return BadRequest("Veuiller verifier les infos de produit");
            return Ok(components);
        }
        private bool ProductExists(int id)
        {
            return _context.Products.Any(e => e.Id == id);
        }
    }
}
