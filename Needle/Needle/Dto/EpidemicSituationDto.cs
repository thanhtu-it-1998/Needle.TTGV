using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Needle.Dto
{
    public class EpidemicSituationDto
    {
        public int TotalCases { get; set; }
        public int TotalCaseToDay { get; set; }
        public int NumberOfDeaths { get; set; }
        public DateTime CreatedUpdate { get; set; }
        public string City { get; set; }
        public string District { get; set; }
        public string Ward { get; set; }
        public string Address { get; set; }
    }
}
