using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project.Models;

namespace Project.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class TakimetController : ControllerBase
    {
        private readonly ProjectContext dataContext;
        public TakimetController(ProjectContext dataContext)
        {
            this.dataContext = dataContext;
        }

        [HttpGet]
        public async static Task<ActionResult<List<Takimet>>> Get()
        {
            using (var dataContext = new ProjectContext())
                return await dataContext.Takimet.ToListAsync();
        }

        [HttpGet("{id}")]
        public async static Task<Takimet> GetTakimetById(int id)
        {
            using (var dataContext = new ProjectContext())
            {
                return await dataContext.Takimet.FirstOrDefaultAsync(Takimet => Takimet.TakimetID == id);
            }
        }
        [HttpPost]
        public async static Task<bool> AddTakimet(Takimet b)
        {
            using (var dataContext = new ProjectContext())
                try
                {
                    await dataContext.Takimet.AddAsync(b);
                    return await dataContext.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }


        }
        [HttpPut]
        public async static Task<bool> UpdateTakimet(Takimet b)
        {
            using (var dataContext = new ProjectContext())
                try
                {
                    dataContext.Takimet.Update(b);
                    return await dataContext.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }


        }


        [HttpDelete("{id}")]
        public async static Task<bool> DeleteTakimet(int ID)
        {
            using (var dataContext = new ProjectContext())
                try
                {
                    Takimet takimetToDeleted = await GetTakimetById(ID);
                    dataContext.Remove(takimetToDeleted);
                    return await dataContext.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }


        }
    }
}
