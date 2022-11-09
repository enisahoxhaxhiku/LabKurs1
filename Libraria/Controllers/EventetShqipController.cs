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
    public class EventetShqipController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public EventetShqipController(IConfiguration configuration)
        { 
            _configuration = configuration;
        }

        [HttpGet]

        public JsonResult Get()
        {
            string query = @"select EventetId , Emri, Koha, Lokacioni from Eventet_Shqip";

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
        public JsonResult Post(EventetShqip esh)
        {
            string query = @"insert into Eventet_Shqip values ('"+ esh.Emri + @"','" + esh.Koha + @"','" + esh.Lokacioni + @"')";

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


        [HttpPut]
        public JsonResult Put(EventetShqip esh)
        {
            string query = @"update Eventet_Shqip set Emri = '" + esh.Emri + @"', Koha = '" + esh.Koha + @"', Lokacioni = '" + esh.Lokacioni + @"'where EventetId  = " + esh.EventetId  + @"";

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


        [HttpDelete("{eshID}")]
        public JsonResult Delete(int eshID)
        {
            string query = @"delete from Eventet_Shqip where EventetId  = " + eshID + @"";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("LibratCon");
            SqlDataReader skenarReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    skenarReader = myCommand.ExecuteReader();
                    table.Load(skenarReader); 

                    skenarReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Fshire me sukses!");
        }

        [HttpGet("{id}")]
        public JsonResult Get(int id)
        {
            string query = @"select * from Eventet_Shqip where EventetId = " + id + @"";

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
    }
}
