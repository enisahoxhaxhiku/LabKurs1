using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;
using Librat.Models;

namespace Librat.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AutoretShqipController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public AutoretShqipController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"select AutoretShId, Emri, Mbiemri, Biografia from Autoret_Shqip";

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

        [HttpGet("{id}")]
        public JsonResult Get(int id)
        {
            string query = @"select * from Autoret_Shqip where AutoretShId = " + id + @"";

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

        [HttpPost]
        public JsonResult Post(AutoretShqip ash)
        {
            string query = @"insert into Autoret_Shqip values ('" + ash.Emri + @"', '" + ash.Mbiemri + @"', '" + ash.Biografia + @"')";

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
            return new JsonResult("Eshte shtuar me sukses.");
        }

        [HttpPut]
        public JsonResult Put(AutoretShqip ash)
        {
            string query = @"update Autoret_Shqip set Emri = '" + ash.Emri + @"', Mbiemri = '" + ash.Mbiemri + @"', Biografia = '" + ash.Biografia + @"' where AutoretShId = " + ash.AutoretShId + @"";

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
            return new JsonResult("Eshte ndryshuar me sukses.");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"delete from Autoret_Shqip where AutoretShId = " + id + @"";

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
            return new JsonResult("Eshte fshire me sukses.");
        }
    }
}
