using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Needle.Data.Entities
{
    public class Vaccine
    {
        [Key]
        public int Id { get; set; }
        public string NameVaccine { get; set; }
        public int Qty { get; set; }
        public string Description { get; set; }
    }
}
