using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project.Models;

namespace Project.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class RekomandimetController : ControllerBase
    {
        private readonly ProjectContext dataContext;
        public RekomandimetController(ProjectContext dataContext)
        {
            this.dataContext = dataContext;
        }

        [HttpGet]
        public async static Task<ActionResult<List<Rekomandimet>>> Get()
        {
            using (var dataContext = new ProjectContext())
                return await dataContext.Rekomandimet.ToListAsync();
        }

        [HttpGet("{id}")]
        public async static Task<Rekomandimet> GetRekomandimetById(int id)
        {
            using (var dataContext = new ProjectContext())
            {
                return await dataContext.Rekomandimet.FirstOrDefaultAsync(Rekomandimet => Rekomandimet.RekomandimetID == id);
            }
        }
        [HttpPost]
        public async static Task<bool> AddRekomandimet(Rekomandimet b)
        {
            using (var dataContext = new ProjectContext())
                try
                {
                    await dataContext.Rekomandimet.AddAsync(b);
                    return await dataContext.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }


        }
        [HttpPut]
        public async static Task<bool> UpdateRekomandimet(Rekomandimet b)
        {
            using (var dataContext = new ProjectContext())
                try
                {
                    dataContext.Rekomandimet.Update(b);
                    return await dataContext.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }


        }


        [HttpDelete("{id}")]
        public async static Task<bool> DeleteRekomandimet(int ID)
        {
            using (var dataContext = new ProjectContext())
                try
                {
                    Takimet rekomandimetToDeleted = await GetRekomandimetById(ID);
                    dataContext.Remove(rekomandimetToDeleted);
                    return await dataContext.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }


        }
    }
}