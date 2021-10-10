using Needle.Data.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Needle.Data.Entities
{
    public class VaccinatedPerson
    {
        [Key]
        public int Id { get; set; }
        public string FullName { get; set; }
        public DateTime Dob { get; set; }
        public Gender Gender { get; set; }
        public string PhoneNumber { get; set; }
        public string InsuranceCardNumber { get; set; }
        public string IdentityCardNumber { get; set; }
        public string Image { get; set; }
        public string Email { get; set; }
        public string City { get; set; }
        public string District { get; set; }
        public string Ward { get; set; }
        public string Address { get; set; }
        public bool Status { get; set; }
        public string Code { get; set; }
    }
}
