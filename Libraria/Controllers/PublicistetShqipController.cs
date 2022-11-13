using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;
using Librat.Models;

namespace Librat.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PublicistetShqipController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public PublicistetShqipController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]

        public JsonResult Get()
        {

            string query = @"select PublicistetID, Emri , Mbiemri , Biografia from Publicistet_Shqip";
            DataTable table = new DataTable();

            string sqlDataSource = _configuration.GetConnectionString("LibratCon");

            SqlDataReader prodReader;

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    prodReader = myCommand.ExecuteReader();
                    table.Load(prodReader);

                    prodReader.Close();
                    myCon.Close();
                }


            }
            return new JsonResult(table);
        }


        [HttpGet("{id}")]
        public JsonResult Get(int id)
        {
            string query = @"select * from Publicistet_Shqip where PublicistetID = " + id + @"";

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

        public JsonResult Post(PublicistetShqip p)
        {

            string query = @"insert into Publicistet_Shqip values 
                        ('" + p.Emri + @"','" + p.Mbiemri + @"','" + p.Biografia + @"')";
            DataTable table = new DataTable();

            string sqlDataSource = _configuration.GetConnectionString("LibratCon");

            SqlDataReader prodReader;

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    prodReader = myCommand.ExecuteReader();
                    table.Load(prodReader);

                    prodReader.Close();
                    myCon.Close();
                }


            }
            return new JsonResult("Shtuar me sukses!");
        }


        [HttpPut]
        public JsonResult Put(PublicistetShqip p)
        {

            string query = @"update Publicistet_Shqip set Emri = '" + p.Emri + @"', Mbiemri = '" + p.Mbiemri + @"',Biografia='" + p.Biografia + @"'where PublicistetID = " + p.PublicistetID + @"";
            DataTable table = new DataTable();

            string sqlDataSource = _configuration.GetConnectionString("LibratCon");

            SqlDataReader prodReader;

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    prodReader = myCommand.ExecuteReader();
                    table.Load(prodReader);

                    prodReader.Close();
                    myCon.Close();
                }


            }
            return new JsonResult("Ndryshuar me sukses!");
        }
        [HttpDelete("{pID}")]
        public JsonResult Delete(int pID)
        {

            string query = @"delete from Publicistet_Shqip where PublicistetID = " + pID + @"";

            DataTable table = new DataTable();

            string sqlDataSource = _configuration.GetConnectionString("LibratCon");

            SqlDataReader prodReader;

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    prodReader = myCommand.ExecuteReader();
                    table.Load(prodReader);

                    prodReader.Close();
                    myCon.Close();
                }


            }
            return new JsonResult("Fshire me sukses!");
        }

    }
}
