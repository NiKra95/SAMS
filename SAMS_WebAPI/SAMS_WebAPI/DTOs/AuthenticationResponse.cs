namespace SAMS_WebAPI.DTOs
{
    public class AuthenticationResponse
    {
        /// <summary>
        /// TRUE if the login attempt is successful, FALSE otherwise.
        /// </summary>
        public bool Success { get; set; }

        /// <summary>
        /// Login attempt result message
        /// </summary>
        public string Message { get; set; } = null!;

        /// <summary>
        /// The JWT token if the login attempt is successful, or NULL if not
        /// </summary>
        public string? Token { get; set; }

        /// <summary>
        /// The JWT token if the login attempt is successful, or NULL if not
        /// </summary>
        public DateTime Expiration { get; set; }
    }
}
