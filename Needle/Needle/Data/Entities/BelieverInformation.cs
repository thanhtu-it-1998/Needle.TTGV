using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Needle.Data.Entities
{
    public class BelieverInformation
    {
        public int Id { get; set; }
        public int IdVaccinatePerson { get; set; }
        public int IdVaccine { get; set; }
        public int IdArea { get; set; }
        public int NumberNeedle { get; set; }
    }
}
