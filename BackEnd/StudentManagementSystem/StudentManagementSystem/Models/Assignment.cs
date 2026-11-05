using System.ComponentModel.DataAnnotations;

namespace StudentManagementSystem.Models
{
    public class Assignment
    {
        [Key]
        public int assignment_Id { get; set; }
        public int TeacherId { get; set; }
        public string? Subject {  get; set; }
        public string? Description {  get; set; }
        public DateTime? Submission_Date {  get; set; }
    }
}
