using Librat.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;

namespace Librat.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KapitulliFaqjaController : ControllerBase
    {

        private IConfiguration _configuration;

        public KapitulliFaqjaController(IConfiguration configuration)
        {
            _configuration = configuration;
        }



        [HttpGet]
        public JsonResult Get()
        {
            string query = @"SELECT KA.KapitulliID ,KA.FaqjaID  ,F.NrFaqes  FROM KapitulliFaqja KF INNER JOIN Faqja F ON KA.FaqjaID =F.FaqjaID ";

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


        public JsonResult Post(KapitulliFaqja kf)
        {
            string query = "INSERT into KapitulliFaqja values (' " + kf.KapitulliID + "','" + kf.FaqjaID +  @"')";
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

        [HttpDelete("{kfID}")]

        public new JsonResult Delete(int kfID)
        {

            string query = @"delete from KapitulliFaqja where FaqjaID= " + kfID + @"";

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
