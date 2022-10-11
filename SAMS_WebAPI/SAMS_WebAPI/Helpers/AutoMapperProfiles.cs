using AutoMapper;
using SAMS_WebAPI.DTOs;
using SAMS_WebAPI.Entities;

namespace SAMS_WebAPI.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<CompanyCreationDTO, Company>().ReverseMap();
            CreateMap<CompanyAdminCreationDTO, CompanyAdmin>().ReverseMap();
        }
    }
}
