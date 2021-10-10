using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Needle.Dto
{
    public class HealthConsultationDto
    {
        public int Id { get; set; }
        public string TitleCategory { get; set; }
        public string Title { get; set; }
        public string Context { get; set; }
        public string Image { get; set; }
        public DateTime Date { get; set; }
    }
}
