using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;
using Librat.Models;


namespace Librat.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RevistatHuajController : ControllerBase
    {

        private readonly IConfiguration _configuration;

        public RevistatHuajController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]

        public JsonResult Get()
        {
            string query = @"select RevistatHID , Emri , Pershkrimi , More from Revistat_Huaj";

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
            string query = @"Select * from Revistat_Huaj where RevistatHID = " +id+@"";

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

        public JsonResult Post(RevistatHuaj r)
        {
            string query = @"insert into Revistat_Huaj values ('" + r.Emri + @"','" + r.Pershkrimi  + @"','" + r.More  + @"')";

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

        public JsonResult Put(RevistatHuaj r)
        {

            string query = @"update Revistat_Huaj set Emri = '" + r.Emri + @"', Pershkrimi = '" + r.Pershkrimi + @"', More = '" + r.More + @"'where RevistatHID = " + r.RevistatHID + @"";

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

           string query = @"delete from Revistat_Huaj where RevistatHID = " + rID + @"";

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