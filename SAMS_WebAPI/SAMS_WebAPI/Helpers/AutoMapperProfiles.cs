﻿using AutoMapper;
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

            //CreateMap<Absence, AbsenceDTO>()
            //   .ForMember(x => x.abs, options => options.MapFrom(prop => ))


        }
    }
}
