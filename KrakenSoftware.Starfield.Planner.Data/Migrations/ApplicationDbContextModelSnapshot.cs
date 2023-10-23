﻿// <auto-generated />
using System;
using KrakenSoftware.Starfield.Planner.Data.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace KrakenSoftware.Starfield.Planner.Data.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.12")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("KrakenSoftware.Starfield.Planner.Data.Models.Resource", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    b.Property<int>("Amount")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<long?>("StructureId")
                        .HasColumnType("bigint");

                    b.Property<double>("Weight")
                        .HasColumnType("double");

                    b.HasKey("Id");

                    b.HasIndex("StructureId");

                    b.ToTable("Resource");
                });

            modelBuilder.Entity("KrakenSoftware.Starfield.Planner.Data.Models.Structure", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    b.Property<string>("Category")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.Property<int?>("PowerDemand")
                        .HasColumnType("int");

                    b.Property<int?>("PowerProductionMax")
                        .HasColumnType("int");

                    b.Property<int?>("PowerProductionMin")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("Name")
                        .IsUnique();

                    b.ToTable("Structures");
                });

            modelBuilder.Entity("KrakenSoftware.Starfield.Planner.Data.Models.Resource", b =>
                {
                    b.HasOne("KrakenSoftware.Starfield.Planner.Data.Models.Structure", null)
                        .WithMany("BuildCost")
                        .HasForeignKey("StructureId");
                });

            modelBuilder.Entity("KrakenSoftware.Starfield.Planner.Data.Models.Structure", b =>
                {
                    b.Navigation("BuildCost");
                });
#pragma warning restore 612, 618
        }
    }
}
