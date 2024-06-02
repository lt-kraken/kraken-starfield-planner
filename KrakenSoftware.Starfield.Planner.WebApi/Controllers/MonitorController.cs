using KrakenSoftware.Starfield.Planner.Data;
using KrakenSoftware.Starfield.Planner.WebApi.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace KrakenSoftware.Starfield.Planner.WebApi.Controllers
{
    [ApiController]
    [Route("v1/[controller]")]
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
            return Ok();
        }

        [HttpGet("services", Name = "Services")]
        public IActionResult Services()
        {
            _logger.LogInformation($"API is online - method {nameof(Services)}");
            try
            {
                _structureModule.GetStructures();
                _logger.LogInformation($"Database is online - method {nameof(Services)}");
                return Ok(new MonitorViewModel()
                {
                    DatabaseAvailable = true
                });
            }
            catch (Exception)
            {
                _logger.LogInformation($"Database error - method {nameof(Services)}");
                return Conflict(new MonitorViewModel()
                {
                    DatabaseAvailable = false
                });
            }
        }
    }
}
