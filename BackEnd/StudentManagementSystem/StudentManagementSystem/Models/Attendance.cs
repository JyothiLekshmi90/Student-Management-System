using System.ComponentModel.DataAnnotations;

namespace StudentManagementSystem.Models
{
    public class Attendance
    {
        [Key]
        public int Attendance_Id { get; set; } 

        public int Student_Id { get; set; }   
        public int TotalDays { get; set; }     
        public int PresentDays { get; set; }  
        public int AbsentDays { get; set; }  
    }
}
