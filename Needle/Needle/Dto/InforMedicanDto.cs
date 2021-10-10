using Needle.Data.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Needle.Dto
{
    public class InforMedicanDto
    {
        [Required]
        public string FullName { get; set; }
        [Required]
        [DataType(DataType.Date)]
        public DateTime Dob { get; set; }
        public Gender Gender { get; set; }
        [Required]
        [DataType(DataType.PhoneNumber)]
        public string PhoneNumber { get; set; }
        [Required]
        [RegularExpression(@"^[0-9\s-]*$")]
        public string IdentityCardNumber { get; set; }
        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }
        [Required]
        public bool StandardOne { get; set; }
        [Required]
        public bool StandardTwo { get; set; }
        [Required]
        public bool StandardThree { get; set; }
        [Required]
        public bool StandardFour { get; set; }
        [Required]
        public bool StandardFive { get; set; }
    }
}
