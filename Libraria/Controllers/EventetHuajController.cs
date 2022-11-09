using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;
using Librat.Models;
namespace Librat.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventetHuajController : ControllerBase
    {

        private readonly IConfiguration _configuration;

        public EventetHuajController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]

        public JsonResult Get()
        {
            string query = @"select EventetHId , Emri, Koha , Lokacioni  from Eventet_Huaj";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("LibratCon");
            SqlDataReader skenarReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand cmd = new SqlCommand(query, myCon))
                {
                    skenarReader = cmd.ExecuteReader();
                    table.Load(skenarReader); ;

                    skenarReader.Close();
                    myCon.Close();

                }
            }

            return new JsonResult(table);
        }

        [HttpPost]
        public JsonResult Post(EventetHuaj eh)
        {
            string query = @"insert into Eventet_Huaj values ('" + eh.Emri + @"','" + eh.Koha + @"','" + eh.Lokacioni + @"')";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("LibratCon");
            SqlDataReader skenarReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand cmd = new SqlCommand(query, myCon))
                {
                    skenarReader = cmd.ExecuteReader();
                    table.Load(skenarReader); ;

                    skenarReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Shtuar me sukses");
        }



        [HttpGet("{id}")]
        public JsonResult Get(int id)
        {
            string query = @"select * from Eventet_Huaj where EventetHId  = " + id + @"";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("LibratCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }
        [HttpPut]
        public JsonResult Put(EventetHuaj eh)
        {
            string query = @"update Eventet_Huaj set Emri = '" + eh.Emri + @"', Koha = '" + eh.Koha + @"', Lokacioni = '" + eh.Lokacioni + @"'where EventetHId = " + eh.EventetHId + @"";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("LibratCon");
            SqlDataReader skenarReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    skenarReader = myCommand.ExecuteReader();
                    table.Load(skenarReader); ;

                    skenarReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Ndryshuar me sukses!");
        }


        [HttpDelete("{ehID}")]
        public JsonResult Delete(int ehID)
        {
            string query = @"delete from Eventet_Huaj where SkenaristatSId = " + ehID + @"";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("LibratCon");
            SqlDataReader skenarReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    skenarReader = myCommand.ExecuteReader();
                    table.Load(skenarReader); ;

                    skenarReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Fshire me sukses!");
        }

    }
}
