using System.ComponentModel.DataAnnotations;

namespace StudentManagementSystem.Models
{
    public class Mark
    {
        [Key]
        public int Mark_Id { get; set; }
        public int Student_Id { get; set; }
        public string? English {  get; set; }
        public string? Hindi {  get; set; }
        public string? Malayalam {  get; set; }
        public string? Maths {  get; set; }
        public string? History {  get; set; }
        public string? Geography {  get; set; }
        public string? Biology {  get; set; }
        public string? Physics { get;set;  }
        public string? Chemistry {  get; set; }
        public string? Computer {  get; set; }

    }
}
