using Microsoft.AspNetCore.Mvc;

namespace KrakenSoftware.Starfield.Planner.WebApi.Controllers
{
    [ApiController]
    [Route("v1/[controller]")]
    public class PingController : ControllerBase
    {
        private readonly ILogger<PingController> _logger;

        public PingController(ILogger<PingController> logger)
        {
            _logger = logger;
        }

        [HttpGet("isalive", Name = "IsAlive")]
        public bool IsAlive()
        {
            _logger.LogInformation($"API is online - method {nameof(IsAlive)}");
            return true;
        }
    }
}
