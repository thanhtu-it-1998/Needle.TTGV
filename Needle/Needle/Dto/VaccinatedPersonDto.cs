using Needle.Data.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Needle.Dto
{
    public class VaccinatedPersonDto
    {
        public int Id { get; set; }
        [Required]
        public string FullName { get; set; }
        [Required]
        [DataType(DataType.Date)]
        public DateTime Dob { get; set; }
        public Gender Gender { get; set; }
        [Required]
        [DataType(DataType.PhoneNumber)]
        public string PhoneNumber { get; set; }
        public string InsuranceCardNumber { get; set; }
        [Required]
        [RegularExpression(@"^[0-9\s-]*$")]
        public string IdentityCardNumber { get; set; }
        public string Image { get; set; }
        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }
        [Required]
        public string City { get; set; }
        public string District { get; set; }
        public string Ward { get; set; }
        [Required]
        public string Address { get; set; }
        public bool Status { get; set; }
        public string Code { get; set; }
    }
}
