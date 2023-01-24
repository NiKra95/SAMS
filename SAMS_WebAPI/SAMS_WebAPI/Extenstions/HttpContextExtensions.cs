using Microsoft.EntityFrameworkCore;

namespace SAMS_WebAPI.Extenstions
{
    public static class HttpContextExtensions
    {
        public async static Task InsertParametersPaginationInHeader<T>(this HttpContext httpContext, IQueryable<T> queryable)
        {
            if (httpContext == null)
            {
                throw new ArgumentNullException(nameof(httpContext));
            }

            int count = queryable.Count();
            //double count = await queryable.CountAsync();
            httpContext.Response.Headers.Add("totalAmountOfRecords", count.ToString());
        }
    }
}
