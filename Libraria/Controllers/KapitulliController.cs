using Librat.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using Microsoft.AspNetCore.Authorization;


namespace Librat.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class KapitulliController : ControllerBase
    {


        private IConfiguration _configuration;

        public KapitulliController(IConfiguration configuration)
        {
            _configuration = configuration;
        }


        [HttpGet]
        public JsonResult Get()
        {
            string query = @"select KapitulliID , NrKapitulli , NrFaqeve   from Kapitulli";

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


        public JsonResult Post(Kapitulli k)
        {
            string query = "INSERT into Kapitulli values (' " + k.NrKapitulli + "','" + k.NrFaqeve + @"')";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("LibratCon");
            SqlDataReader reader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using(SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    reader = myCommand.ExecuteReader();
                    table.Load(reader);
                    reader.Close();
                    myCon.Close();
                }

            }

            return new JsonResult("Shtuar me sukses!");
        }


        [HttpPut]

        public JsonResult Put(Kapitulli k)
        {

            string query = @"update Kapitulli set NrKapitulli= '" + k.NrKapitulli + @"', NrFaqeve= '" + k.NrFaqeve + @"'where KapitulliID= " + k.KapitulliID + @"";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("LibratCon");

            SqlDataReader Reader;

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    Reader = myCommand.ExecuteReader();
                    table.Load(Reader);

                    Reader.Close();
                    myCon.Close();


                }
            }
            return new JsonResult("Ndryshuar me sukses!");



        }



        [HttpDelete("{kID}")]

        public new JsonResult Delete(int kID)
        {

            string query = @"delete from Kapitulli where KapitulliID= " + kID + @"";

            DataTable table = new DataTable();

            string sqlDataSource = _configuration.GetConnectionString("LibratCon");
            SqlDataReader reader;

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    reader = myCommand.ExecuteReader();
                    table.Load(reader);
                    reader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Fshire me sukses!");

        }

    }
}
