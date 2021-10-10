using Microsoft.EntityFrameworkCore;
using Needle.Data.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Needle.Data
{
    public class ApplicationDbContext : IdentityDbContext<User>
    {
        public ApplicationDbContext(DbContextOptions options) : base(options) {  }
        public DbSet<VaccinatedPerson> VaccinatedPersons { get; set; }
        public DbSet<MedicalDeclaration> MedicalDeclarations { get; set; }
        public DbSet<InforMedican> InforMedicans { get; set; }
        public DbSet<Area> Areas { get; set; }
        public DbSet<Vaccine> Vaccines { get; set; }
        public DbSet<BelieverInformation> BelieverInformations { get; set; }
        public DbSet<EpidemicSituation> EpidemicSituations { get; set; }
        public DbSet<ListOfHealthAdvice> ListOfHealthAdvices { get; set; }
        public DbSet<HealthConsultation> HealthConsultations { get; set; }
    }
}
