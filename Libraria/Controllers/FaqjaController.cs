using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;
using Librat.Models;
namespace Librat.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FaqjaController : ControllerBase
    {

        private readonly IConfiguration _configuration;

        public FaqjaController(IConfiguration configuration)
        {
            _configuration = configuration;
        }


        [HttpGet]

        public JsonResult Get()
        {

            string query = @"select  FaqjaID , TitulliKapitullit , NrFaqes , PershkrimiF , Linku from Faqja";
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


        [HttpPost]

        public JsonResult Post(Faqja f)
        {
            string query = @"insert into Faqja values ('" + f.TitulliKapitullit + @"','" + f.NrFaqes + @"','" + f.PershkrimiF + @"','" + f.Linku+ @"')";

            DataTable table = new DataTable();
            SqlDataReader Reader;

            string sqlDataSource = _configuration.GetConnectionString("LibratCon");

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand cmd = new SqlCommand(query, myCon))
                {
                    Reader = cmd.ExecuteReader();
                    table.Load(Reader);
                    Reader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Shtuar me sukses");
        }



        [HttpPut]

        public JsonResult Put(Faqja f)
        {

            string query = @"update Faqja set TitulliKapitullit= '" + f.TitulliKapitullit + @"', NrFaqes= '" + f.NrFaqes + @"', PershkrimiF= '" + f.PershkrimiF + @"', Linku= '" + f.Linku+ @"'where FaqjaID= " + f.FaqjaID + @"";

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



        [HttpDelete("{eID}")]

        public new JsonResult Delete(int fID)
        {

            string query = @"delete from Faqja where FaqjaID= " + fID + @"";

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
