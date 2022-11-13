using Librat.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
namespace Librat.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KategoriteEHuajaController : ControllerBase
    {

        private readonly IConfiguration _configuration;

        public KategoriteEHuajaController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]

        public JsonResult Get()
        {
            string query = @"select KategoriaHID, Kategoria from Kategorite_Huaj";

            DataTable table = new DataTable();

            string sqlDataSource = _configuration.GetConnectionString("LibratCon");

            SqlDataReader kategoriteReader;

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();

                using (SqlCommand cmd = new SqlCommand(query, myCon))
                {
                    kategoriteReader = cmd.ExecuteReader();
                    table.Load(kategoriteReader);

                    kategoriteReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }


        [HttpPost]

        public JsonResult Post(KategoriteEHuaja kategorite)
        {
            string query = @"insert into Kategorite_Huaj values ('" + kategorite.Kategoria + @"')";

            DataTable table = new DataTable();

            string sqlDataSource = _configuration.GetConnectionString("LibratCon");

            SqlDataReader kategoriteReader;

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();

                using (SqlCommand cmd = new SqlCommand(query, myCon))
                {
                    kategoriteReader = cmd.ExecuteReader();
                    table.Load(kategoriteReader);
                    
                    kategoriteReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Shtuar me sukses!");

        }


        [HttpPut]

        public JsonResult Put(Kategorite_Huaj kategorite)
        {
            string query = @"update Kategorite_Huaj set Kategoria = '" + kategorite.Kategoria + @"' where KategoriaHID = " + kategorite.KategoriaHID + @"";

            DataTable table = new DataTable();

            string sqlDataSource = _configuration.GetConnectionString("LibratCon");

            SqlDataReader kategoriteReader;

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();

                using (SqlCommand cmd = new SqlCommand(query, myCon))
                {
                    kategoriteReader = cmd.ExecuteReader();
                    table.Load(kategoriteReader);

                    kategoriteReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Ndryshuar me sukses!");
        }

        [HttpDelete("{kID}")]

        public JsonResult Delete(int kID) {

            string query = @"delete from Kategorite_Huaj where KategoriaHID = " + kID + @"";

            DataTable table = new DataTable();

            string sqlDataSource = _configuration.GetConnectionString("LibratCon");

            SqlDataReader kategoriteReader;

            using(SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();

                using(SqlCommand cmd = new SqlCommand(query, myCon))
                {
                    kategoriteReader=cmd.ExecuteReader();
                    table.Load(kategoriteReader);

                    kategoriteReader.Close();
                    myCon.Close();

                }
            }
            return new JsonResult("Fshire me sukses");
        
        }




    }
}
