using KrakenSoftware.Starfield.Planner.Data;
using KrakenSoftware.Starfield.Planner.WebApi.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace KrakenSoftware.Starfield.Planner.WebApi.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class MonitorController : ControllerBase
    {
        private readonly IStructureModule _structureModule;
        private readonly ILogger<MonitorController> _logger;

        public MonitorController(IStructureModule structureModule, ILogger<MonitorController> logger)
        {
            _structureModule = structureModule;
            _logger = logger;
        }

        [HttpGet("ready", Name = "Ready")]
        public IActionResult Ready()
        {
            _logger.LogInformation($"API is online - method {nameof(Ready)}");
            return Ok(new MonitorViewModel(Status.Healthy, "Service is running smoothly"));
        }

        [HttpGet("services", Name = "Services")]
        public IActionResult Services()
        {
            _logger.LogInformation($"API is online - method {nameof(Services)}");
            try
            {
                _structureModule.GetStructures();
                _logger.LogInformation($"Database is online - method {nameof(Services)}");
                return Ok(new MonitorViewModel(Status.Healthy, "Service is running smoothly"));
            }
            catch (Exception ex)
            {
                _logger.LogInformation($"Database error - method {nameof(Services)}");
                _logger.LogCritical(ex, "An unhandled exception occurred.");

                return Conflict(new MonitorViewModel(Status.Unhealthy, new List<ErrorCode>()
                {
                    new ErrorCode(500, "Database connection failed", "Timeout while trying to connect to the database server.")
                }));
            }
        }
    }
}
