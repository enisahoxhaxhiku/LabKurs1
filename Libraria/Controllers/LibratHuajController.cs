using Librat.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;

namespace Librat.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class LibratHuajController : ControllerBase
    {


        public IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;

        public LibratHuajController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        [HttpGet]
        public JsonResult Get()
        {

            string query = @"select L.LibratH_Id , L.Titulli , L.NrKapitujve  , L.Pershkrimi_Librit_Huaj  , L.Foto_H  ,L.AutoretHId , L.PublicistetHID  ,L.RevistatHID  ,L.EventetHId  , L.KategoriaHID  FROM Librat_Huaj L INNER JOIN Kategorite_Serialit K ON K.KategoriaHID =L.KategoriaHID ";
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




        [HttpGet("kapitulli/{id}")]
        public JsonResult Get(int id)
        {


            string query = @" SELECT Lh.LibratH_Id, Lh.Titulli , Lh.NrKapitujve ,Lh.Foto_H ,Lh.Data_PostimitH,Lh.Pershkrimi_Librit_Huaj
	 ,K.Kategoria,A.AutoretHId ,A.Emri,A.Mbiemri,P.PublicistetHID ,P.Emri,P.Mbiemri,R.RevistatHID ,R.Emri,R.Pershkrimi 
	 ,EH.EventetHId,EH.Emri,eh.Koha
	 FROM Librat_Huaj Lh                   
	 INNER JOIN Autoret_Huaj A            
	 ON Lh.AutoretHId =A.AutoretHId 
	 INNER JOIN Publicistet_Huaj P
	 ON Lh.PublicistetHID =P.PublicistetHID
	 INNER JOIN Revistat_Huaj R
	 ON Lh.RevistatHID =R.RevistatHID 
	 INNER JOIN Eventet_Huaj EH
	 ON Lh.EventetHId =EH.EventetHId 
	 INNER JOIN Kategorite_Huaj K
	 ON Lh.KategoriaHID =K.KategoriaHID 

	 WHERE Lh.LibratH_Id =
"+id+@"";

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
            string query = @"select Lh.LibratH_Id, Lh.Titulli , Lh.NrKapitujve , Lh.Pershkrimi_Librit_Huaj ,Lh.Foto_H ,Lh.AutoretHId, Lh.PublicistetHID ,Lh.RevistatHID ,Lh.EventetHId , Lh.Kategoria FROM Librat_Huaj Lh INNER JOIN Kategorite_Huaj K ON K.KategoriaHID=Lh.KategoriaHID where Lh.KategoriaHID = " + id + @"";

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
        public JsonResult Post(Librat_Huaj Librat_Huaj)
        {
            string query = @"insert into Librat_Huaj values ('" + lib.Titulli + @"', '" + lib.NrKapitujve  + @"', '" + lib.Data_PostimitH + @"', '" + lib.Pershkrimi_Librit_Huaj + @"', '" + lib.Foto_H  + @"', '" + lib.AutoretHId  +  @"', '" + lib.PublicistetHID + @"', '" + lib.RevistatHID + @"' , '" + lib.EventetHId  + @"', '" + lib.KategoriaHID + @"')";

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
        public JsonResult Put(Librat_Huaj lib)
        {
            string query = @"Update  Librat_Huaj set Titulli = '" + lib.Titulli + @"',NrKapitujve  = '" + lib.NrFaqes  + @"',Data_PostimitH= '" + lib.Data_PostimitH + @"',PershkrimiH =  '" + ser.PershkrimiS + @"',Foto_S = '" + ser.Foto_S + @"',AktortSId = '" + ser.AktortSId + @"',ProducentiSID = '" + ser.ProducentiSID + @"',RegjisoriSID = '" + ser.RegjisoriSID + @"' ,SkenaristatSId = '" + ser.SkenaristatSId + @"',KategoriaSID = '" + ser.KategoriaSID + @"'WHERE SerialiID = " + ser.SerialiID + @"";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EnflixCon");
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

        [HttpDelete("{libid}")]
        public JsonResult Delete(int libid)
        {
            string query = @"delete from Librat_Huaj where LibratH_Id = " + libid + @"";

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

        [Route("SaveFotoLibrat_Huaj")]
        [HttpPost]
        public JsonResult SaveFotoLibrat_Huaj()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = _env.ContentRootPath + "/PhotosFotoLibrat_Huaj/" + filename;

                using (var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }

                return new JsonResult(filename);
            }
            catch (Exception)
            {

                return new JsonResult("pro.png");
            }
        }


        [HttpGet("{kaid}")]
        public JsonResult GetKapitulli(int kaid)
        {
            string query = @"select KA.KapitulliID , KA.NrKapitulli  from Librat_Huaj Lh INNER JOIN Libri_Huaj_Kapitulli  LHK ON Lh.LibratH_Id  = LH.LibratH_Id  INNER JOIN Kapitulli KA ON KA.KapitulliID =LHK.KapitulliID  where Lh.LibratH_Id = " + kaid + @"";

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


        [HttpGet("{kaid}/faqja")]
        public JsonResult GetFaqja(int kaid)
        {
            string query = @"SELECT KA.KapitulliID,F.NrFaqes  ,F.FaqjaID , Lh.Foto_H , F.TitulliKapitullit  
                         FROM Librat_Huaj Lh INNER JOIN Libri_HuajKapitulli  LHK ON Lh.LibratH_Id=LHK.LibratH_Id
                          INNER JOIN Kapitulli KA ON LHK.KapitulliID =KAB.KapitulliID  INNER JOIN KapitulliFaqja  KF ON KA.KapitulliID =KA.KapitulliID 
                              INNER JOIN Faqja F ON KA.FaqjaID =F.FaqjaID  WHERE KA.KapitulliID = " + kaid + @"";
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


        [HttpGet("{faaid}/faqja")]
        public JsonResult GetFaqja(int faaid)
        {
            string query = @"SELECT Lh.LibratH_Id ,KA.KapitulliID ,F.NrFaqes  ,F.PershkrimiF ,F.Linku, F.TitulliKapitullit   FROM Librat_Huaj Lh 
                   INNER JOIN Libri_HuajKapitulli  LHK ON Lh.LibratH_Id=LHK.LibratH_Id INNER JOIN Kapitulli KA ON LHK.KapitulliID=KA.KapitulliID 
                   INNER JOIN KapitulliFaqja  KF ON KA.KapitulliID=KA.KapitulliID 
                   INNER JOIN Faqja F ON KA.FaqjaID =F.FaqjaID  WHERE KA.FaqjaID = " + faaid + @"";
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



    }
}
