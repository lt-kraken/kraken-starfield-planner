using KrakenSoftware.Starfield.Planner.Data;
using KrakenSoftware.Starfield.Planner.WebApi.Mappers;
using KrakenSoftware.Starfield.Planner.WebApi.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MySqlConnector;

namespace KrakenSoftware.Starfield.Planner.WebApi.Controllers
{
    [ApiController]
    [Route("v1/[controller]")]
    public class StructureController : ControllerBase
    {
        private readonly IStructureModule _structureModule;

        public StructureController(IStructureModule structureModule)
        {
            _structureModule = structureModule;
        }

        [HttpGet]
        public IActionResult GetStructures()
        {
            var data = _structureModule.GetStructures();
            var result = data.ConvertToViewModel();
            return Ok(result);
        }

#if DEBUG
        [HttpPost]
        public IActionResult CreateStructure(Structure structure)
        {
            try
            {
                var data = structure.ConvertToDataModel();
                _structureModule.CreateStructure(data);
            }
            catch (DbUpdateException ex)
            {
                return Conflict(ex.InnerException is MySqlException 
                    ? new Error("An unknown error occurred; Are you sure that the name is unique?") 
                    : new Error("An unknown database error as occurred"));
            }
            catch (Exception)
            {
                return Conflict(new Error("An unknown error as occurred"));
            }

            return Ok();
        }

        [HttpDelete]
        public IActionResult DeleteStructure(long id)
        {
            _structureModule.DeleteStructure(id);
            return Ok();
        }
#endif
    }
}
