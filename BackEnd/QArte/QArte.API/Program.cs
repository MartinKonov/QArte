
﻿using QArte.Persistance;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Hosting.Server;
using QArte.Persistance.PersistanceModels;
using MediatR;
using QArte.Services.ServiceInterfaces;
using QArte.Services.Services;
using Stripe;
using Coravel;
using Coravel.Scheduling.Schedule.Interfaces;

var builder = WebApplication.CreateBuilder(args);


// Add services to the container.


StripeConfiguration.ApiKey = builder.Configuration["Stripe:SecretKey"];



builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var connectionString = builder.Configuration.GetConnectionString("ConnectionStrings");

builder.Services.AddDbContext<QArteDBContext>(
               options => options.UseSqlServer(connectionString));


builder.Services.AddTransient<IBankAccountService, QArte.Services.Services.BankAccountService>();
builder.Services.AddTransient<IFeeService, QArte.Services.Services.FeeService>();
builder.Services.AddTransient<IGalleryService, QArte.Services.Services.GalleryService>();
builder.Services.AddTransient<IInvoiceService, QArte.Services.Services.InvoiceService>();
builder.Services.AddTransient<IPageService, QArte.Services.Services.PageService>();
builder.Services.AddTransient<IPaymentMethodsService, QArte.Services.Services.PaymentMethodService>();
builder.Services.AddTransient<IPictureService, QArte.Services.Services.PictureService>();
builder.Services.AddTransient<IRoleService, QArte.Services.Services.RoleService>();
builder.Services.AddTransient<ISettlementCycleService, QArte.Services.Services.SettlementCycleService>();
builder.Services.AddTransient<IUserService, QArte.Services.Services.UserService>();
builder.Services.AddTransient<QArte.Services.Services.QRCodeGeneratorService>();
builder.Services.AddTransient<QArte.Services.Services.StripeService>();
//builder.Services.AddTransient<QArte.Services.Services.PayoutSchedulerService>();

builder.Services.AddMediatR(typeof(Program));

builder.Services.AddScheduler();

builder.Services.AddSqlServer<QArteDBContext>(connectionString);

//cors?
builder.Services.AddCors(options =>
{
    options.AddPolicy("QarteApp", policyBuilder =>
    {
        policyBuilder.WithOrigins("http://localhost:5176", "https://localhost:7191", "http://localhost:5173");
        policyBuilder.AllowAnyHeader();
        policyBuilder.AllowAnyMethod();
        policyBuilder.AllowCredentials();
    });
});


var app = builder.Build();


app.Services.UseScheduler(scheduler => {
    scheduler
        .Schedule<PayoutSchedulerService>()
        .DailyAt(8, 0)
        .Zoned(TimeZoneInfo.Local);
});

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseRouting();

app.UseCors("QarteApp");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

