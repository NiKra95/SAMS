using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SAMS_WebAPI.Entities
{
    public class CompanyAdmin
    {
        [ForeignKey(nameof(ApplicationUser))]
        public string Id { get; set; }

        public ApplicationUser ApplicationUser { get; set; }

        public int CompanyId { get; set; }

        public Company Company { get; set; }

        public bool CompanyCreator { get; set; }
    }
}
