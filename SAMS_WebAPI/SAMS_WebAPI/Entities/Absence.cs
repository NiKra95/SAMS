﻿using System.ComponentModel.DataAnnotations.Schema;

namespace SAMS_WebAPI.Entities
{
    public class Absence
    {
        public int Id { get; set; }
        public string EmployeeId { get; set; }

        public Employee Employee { get; set; }

        public AbsenceType AbsenceType { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public int DurationInDays { get; set; }   

        public string Description { get; set; }

        public AbsenceStatus AbsenceStatus { get; set; }

    }
}
