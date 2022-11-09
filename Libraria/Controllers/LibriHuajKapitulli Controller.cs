using Librat.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;


namespace Librat.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LibriHuajKapitulliController : ControllerBase
    {



        private IConfiguration _configuration;

        public LibriHuajKapitulliController(IConfiguration configuration)
        {
            _configuration = configuration;
        }



        [HttpGet]
        public JsonResult Get()
        {
            string query = @"SELECT LHK.KapitulliID ,LHK.KapitulliID ,KA.NrKapitulli  FROM Libri_HuajKapitulli  LHK INNER JOIN Kapitulli KA on LHK.KapitulliID =KA.KapitulliID  ";

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


        public JsonResult Post(Libri_HuajKapitulli  lhk)
        {
            string query = "INSERT into Libri_HuajKapitulli  values (' " + lhk.LibratH_Id  + "','" + lhk.KapitulliID + @"')";
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

            return new JsonResult("Shtuar me sukses!");
        }


        [HttpDelete("{lhkID}")]

        public new JsonResult Delete(int lhkID)
        {

            string query = @"delete from Libri_HuajKapitulli where KapitulliID= " + lhkID + @"";

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
