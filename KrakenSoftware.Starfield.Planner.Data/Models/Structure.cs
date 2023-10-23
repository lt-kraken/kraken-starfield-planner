using Microsoft.EntityFrameworkCore;

namespace KrakenSoftware.Starfield.Planner.Data.Models
{
    public class Structure : Entity
    {
        public string Name { get; set; }

        public int? PowerDemand { get; set; }

        public int? PowerProductionMin { get; set; }

        public int? PowerProductionMax { get; set; }

        public string Category { get; set; }

        public List<Resource> BuildCost { get; set; } = new List<Resource>();
    }
}
