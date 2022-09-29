using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project.Models;

namespace Project.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class KohaController : ControllerBase
    {
        private readonly ProjectContext dataContext;
        public KohaController(ProjectContext dataContext)
        {
            this.dataContext = dataContext;
        }

        [HttpGet]
        public async static Task<ActionResult<List<Koha>>> Get()
        {
            using (var dataContext = new ProjectContext())
                return await dataContext.Koha.ToListAsync();
        }

        [HttpGet("{id}")]
        public async static Task<Koha> GetKohaById(int id)
        {
            using (var dataContext = new ProjectContext())
            {
                return await dataContext.Koha.FirstOrDefaultAsync(Koha => Koha.KohaID == id);
            }
        }
        [HttpPost]
        public async static Task<bool> AddKoha(Koha b)
        {
            using (var dataContext = new ProjectContext())
                try
                {
                    await dataContext.Koha.AddAsync(b);
                    return await dataContext.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }


        }
        [HttpPut]
        public async static Task<bool> UpdateKoha(Koha b)
        {
            using (var dataContext = new ProjectContext())
                try
                {
                    dataContext.Koha.Update(b);
                    return await dataContext.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }


        }


        [HttpDelete("{id}")]
        public async static Task<bool> DeleteKoha(int ID)
        {
            using (var dataContext = new ProjectContext())
                try
                {
                    Koha kohaToDeleted = await GetKohaById(ID);
                    dataContext.Remove(kohaToDeleted);
                    return await dataContext.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }


        }
    }
}