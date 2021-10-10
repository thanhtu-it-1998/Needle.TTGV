using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Needle.Data.Entities
{
    public class HealthConsultationAdDto
    {
        public int Id { get; set; }
        public int IdListOfHealthAdvice { get; set; }
        public bool Status { get; set; }
        public string Title { get; set; }
        public string Context { get; set; }
        public string Image { get; set; }
        public DateTime CreatedDate { get; set; }

    }
}
