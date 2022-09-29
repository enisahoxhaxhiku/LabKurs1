using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project.Models;

namespace Project.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class LokacioniController : ControllerBase
    {
        private readonly ProjectContext dataContext;
        public LokacioniController(ProjectContext dataContext)
        {
            this.dataContext = dataContext;
        }

        [HttpGet]
        public async static Task<ActionResult<List<Lokacioni>>> Get()
        {
            using (var dataContext = new ProjectContext())
                return await dataContext.Lokacioni.ToListAsync();
        }

        [HttpGet("{id}")]
        public async static Task<Lokacioni> GetLokacioniById(int id)
        {
            using (var dataContext = new ProjectContext())
            {
                return await dataContext.Lokacioni.FirstOrDefaultAsync(Lokacioni => Lokacioni.LokacioniID == id);
            }
        }
        [HttpPost]
        public async static Task<bool> AddLokacioni(Lokacioni b)
        {
            using (var dataContext = new ProjectContext())
                try
                {
                    await dataContext.Lokacioni.AddAsync(b);
                    return await dataContext.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }


        }
        [HttpPut]
        public async static Task<bool> UpdateLokacioni(Lokacioni b)
        {
            using (var dataContext = new ProjectContext())
                try
                {
                    dataContext.Lokacioni.Update(b);
                    return await dataContext.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }


        }


        [HttpDelete("{id}")]
        public async static Task<bool> DeleteLokacioni(int ID)
        {
            using (var dataContext = new ProjectContext())
                try
                {
                    Lokacioni lokacioniToDeleted = await GetLokacioniById(ID);
                    dataContext.Remove(lokacioniToDeleted);
                    return await dataContext.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }


        }
    }
}