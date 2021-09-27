using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Needle.Dto
{
    public class LoginDto
    {
        [Required]
        [DataType(DataType.PhoneNumber)]
        public string NumberPhone { get; set; }
        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}
