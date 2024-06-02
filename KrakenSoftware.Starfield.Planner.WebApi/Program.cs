using KrakenSoftware.Starfield.Planner.Data;
using KrakenSoftware.Starfield.Planner.Data.Context;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var origins = "_myAllowSpecificOrigins";

// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: origins,
        policy =>
        {
            policy.WithOrigins("*");
        });
});

// Basic
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// MySQL
#if DEBUG
    var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
#else
    var connectionString = Environment.GetEnvironmentVariable("DB_CONNECTION_STRING");
#endif

builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString), op => op.EnableRetryOnFailure(
        maxRetryCount: 5,
        maxRetryDelay: TimeSpan.FromSeconds(30),
        errorNumbersToAdd: null));
});

// DI
builder.Services.AddScoped<IStructureModule, StructureModule>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(origins);

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
