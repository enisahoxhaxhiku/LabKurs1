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
    public class LibratShqipController : ControllerBase
    {
        private IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;

        public LibratShqipController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"select lsh.LibratShId, lsh.Titulli, lsh.Foto_Sh, lsh.Data_PostimitSh, lsh.Pershkrimi_Librit_Shqip, lsh.ISBN_Librit_Shqip, K.Kategoria from Librat_Shqip lsh INNER JOIN Kategorite_Shqip K ON K.KategoriaShId = lsh.KategoriaID";

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


        [HttpGet("Kategoria/{id}")]
        public JsonResult GetKategoria(int id)
        {
            string query = @"select lsh.LibratShId, lsh.Titulli, lsh.Foto_Sh, lsh.Data_PostimitSh, lsh.Pershkrimi_Librit_Shqip, lsh.ISBN_Librit_Shqip, K.Kategoria from Librat_Shqip lsh INNER JOIN Kategorite_Shqip K ON K.KategoriaShId = lsh.KategoriaID where lsh.KategoriaID = " + id + @"";

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
            string query = @"select lsh.LibratShId, lsh.Titulli, lsh.Foto_Sh, lsh.Data_PostimitSh, 
                           lsh.Pershkrimi_Librit_Shqip, lsh.ISBN_Librit_Shqip, K.Kategoria, Ash.AutoretShId, Ash.Emri, Ash.Mbiemri, Psh.PublicistetID, Psh.Emri, Psh.Mbiemri, Rsh.Revistat_Shqip, R.Emri, Rsh.Pershkrimi, Esh.EventetId, Esh.Emri, Esh.Koha
                           from Librat_Shqip lsh INNER JOIN Kategorite_Shqip K ON K.KategoriaShId = lsh.KategoriaID
                           INNER JOIN Autoret_Shqip Ash ON A.AutoretShId = lsh.AutoriID
                           INNER JOIN Publicistet_Shqip Psh ON Psh.PublicistetID = lsh.PublicistiID
                           INNER JOIN Revistat_Shqip Rsh ON Rsh.RevistatShID = lsh.RevistaID
                           INNER JOIN Eventet_Shqip Esh ON Esh.EventetId = lsh.EventiID where LibratShId = " + id + @"";

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

       // [Authorize]
        [HttpPost]
        public JsonResult Post(Librat_Shqip fil)
        {
            string query = @"insert into Librat_Shqip values ('" + fil.Titulli + @"', '" + fil.Foto_Sh + @"', '" + fil.Data_PostimitSh + @"', '" + fil.Pershkrimi_Librit_Shqip + @"', '" + fil.ISBN_Librit_Shqip + @"', '" + fil.AutoriID + @"', '" + fil.KategoriaID + @"', '" + fil.PublicistiID + @"' , '" + fil.RevistaID + @"', '" + fil.EventiID + @"')";

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

       // [Authorize]
        [HttpPut]
        public JsonResult Put(Librat_Shqip fil)
        {
            string query = @"Update Librat_Shqip set Titulli = '" + fil.Titulli + @"', Foto_Sh = '" + fil.Foto_Sh + @"', Data_PostimitSh = '" + fil.Data_PostimitSh + @"', Pershkrimi_Librit_Shqip = '" + fil.Pershkrimi_Librit_Shqip + @"', ISBN_Librit_Shqip = '" + fil.ISBN_Librit_Shqip + @"', AutoriID = '" + fil.AutoriID + @"', KategoriaID = '" + fil.KategoriaID + @"', PublicistiID = '" + fil.PublicistiID + @"', RevistaID = '" + fil.RevistaID + @"', EventiID = '" + fil.EventiID + @"' where LibratShId = " + fil.LibratShId + @"";

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

        [Route("SaveFotoLibri")]
        [HttpPost]
        public JsonResult SaveFotoLibri()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = _env.ContentRootPath + "/PhotosLibri/" + filename;

                using (var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }

                return new JsonResult(filename);
            }
            catch (Exception)
            {

                return new JsonResult("kronike_ne_gur.png");
            }
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"delete from Librat_Shqip where LibratShId = " + id + @"";

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