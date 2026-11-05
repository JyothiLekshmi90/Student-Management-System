using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using StudentManagementSystem.Data;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// 1. Define a consistent CORS policy name variable
var myAllowSpecificOrigins = "_myAllowSpecificOrigins";

// 2. Configure the CORS Services
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: myAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:5173") // Your React URL (no trailing slash)
                                .AllowAnyHeader()
                                .AllowAnyMethod();
                      });
});

var connectionString = builder.Configuration.GetConnectionString("constring");

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));

// JWT Authentication Setup
var key = "this is my custom Secret key for authentication";
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key))
    };
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
        c.RoutePrefix = string.Empty; // Sets Swagger UI as the application root
    });
    app.MapOpenApi();
}

app.UseHttpsRedirection();

// 🔴 THE ORDER AND NAME CORRECTION BELOW IS CRITICAL:
app.UseRouting(); // Ensures routing path tables resolve before checking access

// FIXED: Using the exact variable matching your defined service name policy
app.UseCors(myAllowSpecificOrigins);

// Authentication MUST go before Authorization
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
