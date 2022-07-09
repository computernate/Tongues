using TonguesApi.Data;
using TonguesApi.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

var  AllOrigins = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<TonguesDatabaseSettings>(builder.Configuration.GetSection("TonguesDatabaseSettings"));
builder.Services.AddSingleton<GamesService>();
builder.Services.AddSingleton<UsersService>();
builder.Services.AddSingleton<WordsService>();

// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: AllOrigins,
                      policy  => {
                          policy.WithOrigins("0.0.0.0").AllowAnyOrigin()
                                                  .AllowAnyHeader()
                                                  .AllowAnyMethod();
                      });
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

/*

builder.Services.AddMvc();
Can't authorize until there is an https
builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = "tongues-9e5e5.firebaseapp.com";
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = "tongues-9e5e5.firebaseapp.com",
            ValidateAudience = true,
            ValidAudience = "tongues-9e5e5",
            ValidateLifetime = true
        };
    });
*/
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(AllOrigins);  

//app.UseHttpsRedirection();

app.UseAuthorization();
//app.UseAuthentication();

app.MapControllers();
app.Run();
