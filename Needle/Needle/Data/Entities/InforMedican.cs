using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Needle.Data.Entities
{
    public class InforMedican
    {
        [Key]
        public int Id { get; set; }
        public int IdVaccinatePerson { get; set; }

        public bool StandardOne { get; set; }
        public bool StandardTwo { get; set; }
        public bool StandardThree { get; set; }
        public bool StandardFour { get; set; }
        public bool StandardFive { get; set; }
    }
}
