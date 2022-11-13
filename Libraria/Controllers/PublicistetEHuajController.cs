using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;
using Librat.Models;

namespace Librat.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PublicistetEHuajController : ControllerBase
    {

        private readonly IConfiguration _configuration;

        public PublicistetEHuajController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]

        public JsonResult Get()
        {

            string query = @"select PublicistetHID ,Emri , Mbiemri ,Biografia from Publicistet_Huaj";

            DataTable table = new DataTable();

            string sqlDataSource = _configuration.GetConnectionString("LibratCon");

            SqlDataReader prodSReader;

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();

                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    prodSReader = myCommand.ExecuteReader();
                    table.Load(prodSReader);

                    prodSReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);



        }


        [HttpGet("{id}")]
        public JsonResult Get(int id)
        {
            string query = @"select * from Publicistet_Huaj where PublicistetHID = " + id + @"";

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

        public JsonResult Post(PublicistetEHuaj p)
        {
            string query = @"insert into Publicistet_Huaj values ('" + p.Emri + @"','" + p.Mbiemri + @"','"
                + p.Biografia + @"')";

            DataTable table = new DataTable();

            string sqlDataSource = _configuration.GetConnectionString("LibratCon");

            SqlDataReader prodSReader;

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();

                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    prodSReader = myCommand.ExecuteReader();
                    table.Load(prodSReader);

                    prodSReader.Close();
                    myCon.Close();

                }

            }
            return new JsonResult("Eshte shtuar me sukses!");
        }




        [HttpPut]

        public JsonResult Put(PublicistetEHuaj p)
        {

            string query = @"update Publicistet_Huaj set Emri = '" + p.Emri + @"', Mbiemri ='" + p.Mbiemri + @"', Biografia = '" + p.Biografia
                + @"'where PublicistetHID = " + p.PublicistetHID + @"";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("LibratCon");

            SqlDataReader prodSReader;

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {

                myCon.Open();

                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    prodSReader = myCommand.ExecuteReader();
                    table.Load(prodSReader);

                    prodSReader.Close();
                    myCon.Close();

                }


            }
            return new JsonResult("Eshte ndryshuar me sukses!");


        }

        [HttpDelete("{pID}")]

        public JsonResult Delete(int pID)
        {
            string query = @"delete from Publicistet_Huaj where PublicistetHID = " + pID + @"";

            DataTable table = new DataTable();

            string sqlDataSource = _configuration.GetConnectionString("LibratCon");

            SqlDataReader prodSReader;

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {

                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    prodSReader = myCommand.ExecuteReader();
                    table.Load(prodSReader);

                    prodSReader.Close();
                    myCon.Close();
                }

            }

            return new JsonResult("Fshire me sukses!");



        }

    }
}
