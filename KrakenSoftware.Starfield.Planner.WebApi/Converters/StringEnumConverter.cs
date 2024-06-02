using System.Text.Json;
using System.Text.Json.Serialization;
using KrakenSoftware.Starfield.Planner.WebApi.ViewModels;

namespace KrakenSoftware.Starfield.Planner.WebApi.Converters
{
    public class StringEnumConverter : JsonConverter<Status>
    {
        public override Status Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            return Enum.Parse<Status>(reader.GetString(), ignoreCase: true);
        }

        public override void Write(Utf8JsonWriter writer, Status value, JsonSerializerOptions options)
        {
            writer.WriteStringValue(value.ToString());
        }
    }
}
