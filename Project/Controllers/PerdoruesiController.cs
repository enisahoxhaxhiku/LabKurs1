using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project.Models;

namespace Project.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class PerdoruesiController : ControllerBase
    {
        private readonly ProjectContext dataContext;
        public PerdoruesiController(ProjectContext dataContext)
        {
            this.dataContext = dataContext;
        }

        [HttpGet]
        public async static Task<ActionResult<List<Perdoruesi>>> Get()
        {
            using (var dataContext = new ProjectContext())
                return await dataContext.Perdoruesi.ToListAsync();
        }

        [HttpGet("{id}")]
        public async static Task<Perdoruesi> GetPerdoruesiById(int id)
        {
            using (var dataContext = new ProjectContext())
            {
                return await dataContext.Perdoruesi.FirstOrDefaultAsync(Perdoruesi => Perdoruesi.PerdoruesiID == id);
            }
        }
        [HttpPost]
        public async static Task<bool> AddPerdoruesi(Perdoruesi b)
        {
            using (var dataContext = new ProjectContext())
                try
                {
                    await dataContext.Perdoruesi.AddAsync(b);
                    return await dataContext.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }


        }
        [HttpPut]
        public async static Task<bool> UpdatePerdoruesi(Perdoruesi b)
        {
            using (var dataContext = new ProjectContext())
                try
                {
                    dataContext.Perdoruesi.Update(b);
                    return await dataContext.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }


        }


        [HttpDelete("{id}")]
        public async static Task<bool> DeletePerdoruesi(int ID)
        {
            using (var dataContext = new ProjectContext())
                try
                {
                    Perdoruesi perdoruesiToDeleted = await GetPerdoruesiById(ID);
                    dataContext.Remove(perdoruesiToDeleted);
                    return await dataContext.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }


        }
    }
}


