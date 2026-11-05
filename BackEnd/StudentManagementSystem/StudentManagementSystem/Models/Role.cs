using System.ComponentModel.DataAnnotations;

namespace StudentManagementSystem.Models
{
    public class Role
    {
        [Key] 
        public int Id { get; set; }
        public string? Role_Name {  get; set; }
    }
}
