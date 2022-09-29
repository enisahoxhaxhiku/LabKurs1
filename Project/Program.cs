global using Microsoft.EntityFrameworkCore;
global using Project.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Project.Controllers;
using Swashbuckle.AspNetCore.Filters;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options =>
{
    options.AddPolicy("CORSPolicy",
        builder =>
        {
            builder
            .AllowAnyMethod()
            .AllowAnyHeader()
            .WithOrigins("http://localhost:3000", "https://appname.azurestaticapps.net");
        });
});
// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<ProjectContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options => {
    options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
    {
        Description = "Standard Authorization header using the bearer scheme(\"bearer {token}\") ",
        In = ParameterLocation.Header,
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey
    });
    options.OperationFilter<SecurityRequirementsOperationFilter>();
});
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8
            .GetBytes(builder.Configuration.GetSection("AppSettings:Token").Value)),
            ValidateIssuer = false,
            ValidateAudience = false
        };
    });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("CORSPolicy");





//===========================================================================================================
//                                          TAKIMET
//===========================================================================================================
app.MapGet("/get-all-takimet", [Authorize(Roles = "bHead, Admin, HeadAdmin")] async () => await TakimetController.Get());

app.MapGet("/get-takimet-by-takimet-id/{takimetId}", [Authorize(Roles = "bHead, Admin, HeadAdmin")] async (int takimetId) =>
{
    Takimet  takimetToReturn = await TakimetController.GetTakimetById(takimetId);

    if (takimetToReturn != null)
    {
        return Results.Ok(takimetToReturn);
    }
    else
    {
        return Results.BadRequest();
    }
});




app.MapGet("/get-takimet-by-id/{takimetId}", [Authorize(Roles = "bHead, Admin, HeadAdmin")] async (int takimetId) =>
{
    Takimet takimetToReturn = await TakimetController.GetTakimetById(takimetId);

    if (takimetToReturn != null)
    {
        return Results.Ok(takimetToReturn);
    }
    else
    {
        return Results.BadRequest();
    }
});

app.MapPost("/create-takimet", [Authorize(Roles = "bHead, Admin, HeadAdmin")] async (Takimet takimetToCreate) =>
{
    bool createSuccessful = await TakimetController.AddTakimet(takimetToCreate);
    if (createSuccessful)
    {
        return Results.Ok("Insert Successful");
    }
    else
    {
        return Results.BadRequest();
    }
});

app.MapPut("/update-takimet", [Authorize(Roles = "bHead, Admin, HeadAdmin")] async (Takimet takimetToUpdate) =>
{
    bool updateSuccessful = await TakimetController.UpdateTakimet(takimetToUpdate);
    if (updateSuccessful)
    {
        return Results.Ok("Update Successful");
    }
    else
    {
        return Results.BadRequest();
    }
});

app.MapDelete("/delete-takimet-by-id/{takimetId}", [Authorize(Roles = "bHead, Admin, HeadAdmin")] async (int takimetId) =>
{
    bool deleteSuccessful = await TakimetController.DeleteTakimet(takimetId);
    if (deleteSuccessful)
    {
        return Results.Ok("Delete Successful");
    }
    else
    {
        return Results.BadRequest();
    }
});




//===========================================================================================================
//                                          PERDORUESI
//===========================================================================================================
app.MapGet("/get-all-perdoruesit", [Authorize(Roles = "secretary, dHead, bHead, Admin, HeadAdmin")] async () => await PerdoruesiController.Get());

app.MapGet("/get-perdoruesit-by-id/{perdoruesiId}", [Authorize(Roles = "secretary, dHead, bHead, Admin, HeadAdmin")] async (int perdoruesiId) =>
{
    Perdoruesi perdoruesiToReturn = await PerdoruesiController.GetPerdoruesiById(perdoruesiId);

    if (perdoruesiToReturn != null)
    {
        return Results.Ok(perdoruesiToReturn);
    }
    else
    {
        return Results.BadRequest();
    }
});



app.MapPost("/create-perdoruesit", [Authorize(Roles = "secretary, dHead, bHead, Admin, HeadAdmin")] async (Perdoruesi perdoruesitToCreate) =>
{
    bool createSuccessful = await PerdoruesiController.AddPerdoruesi(perdoruesitToCreate);
    if (createSuccessful)
    {
        return Results.Ok("Insert Successful");
    }
    else
    {
        return Results.BadRequest();
    }
});

app.MapPut("/update-perdoruesit", [Authorize(Roles = "secretary, dHead, bHead, Admin, HeadAdmin")] async (Perdoruesi perdoruesitToUpdate) =>
{
    bool updateSuccessful = await PerdoruesiController.UpdatePerdoruesi(perdoruesitToUpdate);
    if (updateSuccessful)
    {
        return Results.Ok("Update Successful");
    }
    else
    {
        return Results.BadRequest();
    }
});

app.MapDelete("/delete-oerdoruesit-by-id/{perdoruesiId}", [Authorize(Roles = "secretary, dHead, bHead, Admin, HeadAdmin")] async (int perdoruesiId) =>
{
    bool deleteSuccessful = await PerdoruesiController.DeletePerdoruesi(perdoruesiId);
    if (deleteSuccessful)
    {
        return Results.Ok("Delete Successful");
    }
    else
    {
        return Results.BadRequest();
    }
});






//===========================================================================================================
//                                          REKOMNDIMET
//===========================================================================================================
app.MapGet("/get-all-rekomandimet", [Authorize(Roles = "worker, dHead, bHead, Admin, HeadAdmin")] async () => await RekomandimetController.Get());

app.MapGet("/get-rekomandimet-by-id/{rekomandimetId}", [Authorize(Roles = "worker, dHead, bHead, Admin, HeadAdmin")] async (int rekomandimetId) =>
{
    Rekomandimet rekomandimetToReturn = await RekomandimetController.GetRekomandimetById(rekomandimetId);

    if (rekomandimetToReturn != null)
    {
        return Results.Ok(rekomandimetToReturn);
    }
    else
    {
        return Results.BadRequest();
    }
});


app.MapPost("/create-rekomandimet", [Authorize(Roles = "dHead, bHead, Admin, HeadAdmin")] async (Rekomandimet rekomandimetToCreate) =>
{
    bool createSuccessful = await RekomandimetController.AddRekomandimet(rekomandimetToCreate);
    if (createSuccessful)
    {
        return Results.Ok("Insert Successful");
    }
    else
    {
        return Results.BadRequest();
    }
});

app.MapPut("/update-rekomandimet", [Authorize(Roles = "worker, dHead, bHead, Admin, HeadAdmin")] async (Rekomandimet rekomandimetToUpdate) =>
{
    bool updateSuccessful = await RekomandimetController.UpdateRekomandimet(rekomandimetToUpdate);
    if (updateSuccessful)
    {
        return Results.Ok("Update Successful");
    }
    else
    {
        return Results.BadRequest();
    }
});

app.MapDelete("/delete-rekomandimet-by-id/{rekomandimetId}", [Authorize(Roles = "dHead, bHead, Admin, HeadAdmin")] async (int rekomandimetId) =>
{
    bool deleteSuccessful = await RekomandimetController.DeleteRekomandimet(rekomandimetId);
    if (deleteSuccessful)
    {
        return Results.Ok("Delete Successful");
    }
    else
    {
        return Results.BadRequest();
    }
});



