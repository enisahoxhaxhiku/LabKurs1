using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project.Models;

namespace Profa.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class RestaurantetController : ControllerBase
    {
        private readonly ProjectContext dataContext;
        public RestaurantetController(ProjectContext dataContext)
        {
            this.dataContext = dataContext;
        }

        [HttpGet]
        public async static Task<ActionResult<List<Restaurantet>>> Get()
        {
            using (var dataContext = new ProjectContext())
                return await dataContext.Restaurantet.ToListAsync();
        }

        [HttpGet("{id}")]
        public async static Task<Restaurantet> GetRestaurantetById(int id)
        {
            using (var dataContext = new ProjectContext())
            {
                return await dataContext.Restaurantet.FirstOrDefaultAsync(Restaurantet => Restaurantet.RestaurantetID == id);
            }
        }

        [HttpGet("{id}")]
        public async static Task<List<Restaurantet>> GetRestaurantetByBranchId(int id)
        {
            using (var dataContext = new ProjectContext())
            {
                return await dataContext.Restaurantet.Where(Restaurantet => Restaurantet.RestaurantetID == id).ToListAsync();
            }
        }

        [HttpPost]
        public async static Task<bool> AddRestaurantet(Restaurantet d)
        {
            using (var dataContext = new ProjectContext())
                try
                {
                    await dataContext.Restaurantet.AddAsync(d);
                    return await dataContext.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }


        }
        [HttpPut]
        public async static Task<bool> UpdateRestaurantet(Restaurantet d)
        {
            using (var dataContext = new ProjectContext())
                try
                {
                    dataContext.Restaurantet.Update(d);
                    return await dataContext.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }


        }

        [HttpDelete("{id}")]
        public async static Task<bool> DeleteRestaurantet(int ID)
        {
            using (var dataContext = new ProjectContext())
                try
                {
                    Restaurantet restaurantetToDeleted = await GetRestaurantetById(ID);
                    dataContext.Remove(restaurantetToDeleted);
                    return await dataContext.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }


        }
    }
}