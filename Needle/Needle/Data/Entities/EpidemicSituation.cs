using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Needle.Data.Entities
{
    public class EpidemicSituation
    {
        [Key]
        public int Id { get; set; }
        public int IdArea { get; set; }
        public int TotalCases { get; set; }
        public int TotalCaseToDay { get; set; }
        public int NumberOfDeaths { get; set; }
        public DateTime CreatedUpdate { get; set; }

        [ForeignKey("IdArea")]
        public virtual Area Area { get; set; }
    }
}
