using System.Text.Json.Serialization;

namespace KrakenSoftware.Starfield.Planner.Data.Models
{
    public class Resource : Entity
    {
        public string Name { get; set; }

        public int Amount { get; set; }

        public double Weight { get; set; }
    }
}
