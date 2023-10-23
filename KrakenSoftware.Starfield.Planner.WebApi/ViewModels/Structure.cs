using System.Text.Json.Serialization;

namespace KrakenSoftware.Starfield.Planner.WebApi.ViewModels
{
    public class Structure
    {
        [JsonPropertyName("id")]
        public long Id { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("powerDemand")]
        public int? PowerDemand { get; set; }

        [JsonPropertyName("powerProductionMin")]
        public int? PowerProductionMin { get; set; }

        [JsonPropertyName("powerProductionMax")]
        public int? PowerProductionMax { get; set; }

        [JsonPropertyName("category")]
        public string Category { get; set; }

        [JsonPropertyName("build_cost")]
        public List<Resource> BuildCost { get; set; }
    }
}
