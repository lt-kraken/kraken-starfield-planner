using System.Text.Json.Serialization;

namespace KrakenSoftware.Starfield.Planner.WebApi.ViewModels
{
    public class Resource
    {
        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("amount")]
        public int Amount { get; set; }

        [JsonPropertyName("weight")]
        public double Weight { get; set; }
    }
}
