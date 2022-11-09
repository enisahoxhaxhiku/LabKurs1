using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;
using Librat.Models;


namespace Librat.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RevistatShqipController : ControllerBase
    {

        private readonly IConfiguration _configuration;

        public RevistatShqipController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]

        public JsonResult Get()
        {
            string query = @"select RevistatShID , Emri , Pershkrimi , More from Revistat_Shqip";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("LibratCon");

            SqlDataReader revisteReader;

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();

                using (SqlCommand cmd = new SqlCommand(query, myCon))
                {
                    revisteReader = cmd.ExecuteReader();
                    table.Load(revisteReader);

                    revisteReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }

        [HttpGet("{id}")]
        public JsonResult Get(int id) {
            string query = @"Select * from Revistat_Shqip where RevistatShID = " +id+@"";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("LibratCon");
            SqlDataReader reader;
            using(SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand cmd = new SqlCommand(query, myCon)) { 
                   reader=cmd.ExecuteReader();
                    table.Load(reader);
                    reader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }


        [HttpPost]

        public JsonResult Post(RevistatShqip r)
        {
            string query = @"insert into Revistat_Shqip values ('" + r.Emri + @"','" + r.Pershkrimi  + @"','" + r.More  + @"')";

            DataTable table = new DataTable();
            SqlDataReader revisteReader;

            string sqlDataSource = _configuration.GetConnectionString("LibratCon");

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand cmd = new SqlCommand(query, myCon))
                {
                    revisteReader = cmd.ExecuteReader();
                    table.Load(revisteReader);
                    revisteReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Shtuar me sukses");
        }


        [HttpPut]

        public JsonResult Put(RevistatShqip r)
        {

            string query = @"update Revistat_Shqip set Emri = '" + r.Emri + @"', Pershkrimi = '" + r.Pershkrimi + @"', More = '" + r.More + @"'where RevistatShID = " + r.RevistatShID + @"";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("LibratCon");

            SqlDataReader revisteReader;

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    revisteReader = myCommand.ExecuteReader();
                    table.Load(revisteReader);

                    revisteReader.Close();
                    myCon.Close();


                }
            }
            return new JsonResult("Ndryshuar me sukses!");



        }

        [HttpDelete("{rID}")]

        public new JsonResult Delete(int rID) {

           string query = @"delete from Revistat_Shqip where RevistatShID = " + rID + @"";

            DataTable table = new DataTable();

            string sqlDataSource = _configuration.GetConnectionString("LibratCon");
            SqlDataReader revisteReader;

            using(SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using(SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    revisteReader = myCommand.ExecuteReader();
                    table.Load(revisteReader);
                    revisteReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Fshire me sukses!");
        
        }






}
}