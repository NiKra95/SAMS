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

            CreateMap<CompanyDTO, Company>().ReverseMap();

            CreateMap<UserDetailsDTO, ApplicationUser>();

            CreateMap<ApplicationUser, UserDetailsDTO>()
                .ForMember(x => x.Id, options => options.MapFrom(prop => prop.Id))
                .ForMember(x => x.FirstName, options => options.MapFrom(prop => prop.FirstName))
                .ForMember(x => x.LastName, options => options.MapFrom(prop => prop.LastName))
                .ForMember(x => x.Email, options => options.MapFrom(prop => prop.Email))
                .ForMember(x => x.Address, options => options.MapFrom(prop => prop.Address))
                .ForMember(x => x.Gender, options => options.MapFrom(prop => prop.Gender.ToString()))
                .ForMember(x => x.DateOfBirth, options => options.MapFrom(prop => prop.DateofBirth))
                .ForMember(x => x.Picture, options => options.MapFrom(prop => prop.Picture));

            CreateMap<EditUserDetailsDTO, ApplicationUser>().ReverseMap();

            CreateMap<ApplicationAdminCreationDTO, ApplicationUser>().ReverseMap();

            CreateMap<ApplicationAdminDTO, ApplicationUser>();

            CreateMap<ApplicationUser, ApplicationAdminDTO>()
                .ForMember(x => x.Id, options => options.MapFrom(prop => prop.Id))
                .ForMember(x => x.FirstName, options => options.MapFrom(prop => prop.FirstName))
                .ForMember(x => x.LastName, options => options.MapFrom(prop => prop.LastName))
                .ForMember(x => x.Email, options => options.MapFrom(prop => prop.Email))
                .ForMember(x => x.Address, options => options.MapFrom(prop => prop.Address))
                .ForMember(x => x.Gender, options => options.MapFrom(prop => prop.Gender.ToString()))
                .ForMember(x => x.DateofBirth, options => options.MapFrom(prop => prop.DateofBirth))
                .ForMember(x => x.Picture, options => options.MapFrom(prop => prop.Picture));

            CreateMap<CompanyAdminCreationDTO, CompanyAdmin>().ReverseMap();

            CreateMap<CompanyAdminEditDTO, ApplicationUser>().ReverseMap();

            CreateMap<CompanyAdminDTO, CompanyAdmin>();

            CreateMap<CompanyAdmin, CompanyAdminDTO>()
                .ForMember(x => x.FirstName, options => options.MapFrom(prop => prop.ApplicationUser.FirstName))
                .ForMember(x => x.LastName, options => options.MapFrom(prop => prop.ApplicationUser.LastName))
                .ForMember(x => x.Email, options => options.MapFrom(prop => prop.ApplicationUser.Email))
                .ForMember(x => x.Address, options => options.MapFrom(prop => prop.ApplicationUser.Address))
                .ForMember(x => x.Gender, options => options.MapFrom(prop => prop.ApplicationUser.Gender.ToString()))
                .ForMember(x => x.DateofBirth, options => options.MapFrom(prop => prop.ApplicationUser.DateofBirth))
                .ForMember(x => x.Picture, options => options.MapFrom(prop => prop.ApplicationUser.Picture))
                .ForMember(x => x.CompanyName, options => options.MapFrom(prop => prop.Company.Name));


            CreateMap<EmployeeCreationDTO, Employee>().ReverseMap();

            CreateMap<EmployeeEditDTO, Employee>().ReverseMap();

            CreateMap<EmployeeDTO, Employee>();

            CreateMap<Employee, EmployeeDTO>()
               .ForMember(x => x.Id, options => options.MapFrom(prop => prop.Id))
               .ForMember(x => x.FirstName, options => options.MapFrom(prop => prop.ApplicationUser.FirstName))
               .ForMember(x => x.LastName, options => options.MapFrom(prop => prop.ApplicationUser.LastName))
               .ForMember(x => x.Email, options => options.MapFrom(prop => prop.ApplicationUser.Email))
               .ForMember(x => x.Address, options => options.MapFrom(prop => prop.ApplicationUser.Address))
               .ForMember(x => x.Gender, options => options.MapFrom(prop => prop.ApplicationUser.Gender.ToString()))
               .ForMember(x => x.DateofBirth, options => options.MapFrom(prop => prop.ApplicationUser.DateofBirth))
               .ForMember(x => x.Picture, options => options.MapFrom(prop => prop.ApplicationUser.Picture));

            CreateMap<AbsenceCreationDTO, Absence>().ReverseMap();

            CreateMap<AbsenceDTO, Absence>().ReverseMap();

            CreateMap<CompanyAbsenceDTO, Absence>();

            CreateMap<Absence, CompanyAbsenceDTO>()
               .ForMember(x => x.EmployeeName, options => options
                                  .MapFrom(prop => String.Format("{0} {1}", prop.Employee.ApplicationUser.FirstName,
                                                                          prop.Employee.ApplicationUser.LastName)))
               .ForMember(x => x.EmployeeMaximumAnnualLeave, options => options.MapFrom(prop => prop.Employee.MaximumAnnualLeave))
               .ForMember(x => x.EmployeeRemainingAnuualLeave, options => options.MapFrom(prop => prop.Employee.RemainingAnnualLeave));

            CreateMap<ApprovedUserAbsenceDTO, Absence>().ReverseMap();

            CreateMap<ApprovedAbsencesInCompanyDTO, Absence>();

            CreateMap<Absence, ApprovedAbsencesInCompanyDTO>()
               .ForMember(x => x.EmployeeFullName, options => options
                                  .MapFrom(prop => String.Format("{0} {1}", prop.Employee.ApplicationUser.FirstName,
                                                                          prop.Employee.ApplicationUser.LastName)));

        }
    }
}
