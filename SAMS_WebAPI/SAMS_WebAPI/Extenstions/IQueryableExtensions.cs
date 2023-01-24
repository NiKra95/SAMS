using SAMS_WebAPI.DTOs;

namespace SAMS_WebAPI.Extenstions
{
    public static class IQueryableExtensions
    {
        public static IQueryable<T> Paginate<T>(this IQueryable<T> queryable, PaginationDTO paginationDTO)
        {
            return queryable.Skip((paginationDTO.Page - 1) * paginationDTO.RecordsPerPage).Take(paginationDTO.RecordsPerPage);
        }
    }
}
