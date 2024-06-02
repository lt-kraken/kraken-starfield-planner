using System.Text.Json.Serialization;
using KrakenSoftware.Starfield.Planner.WebApi.Converters;

namespace KrakenSoftware.Starfield.Planner.WebApi.ViewModels
{
    public class MonitorViewModel
    {
        public MonitorViewModel(Status status, string message)
        {
            Status = status;
            Message = message;
        }

        public MonitorViewModel(Status status, List<ErrorCode> errors)
        {
            Status = status;
            Errors = errors;
        }

        public Status Status { get; set; }

        public string? Message { get; set; }

        public List<ErrorCode>? Errors { get; set; }
    }

    [JsonConverter(typeof(StringEnumConverter))]
    public enum Status
    {
        Healthy = 0,
        Unhealthy = 1,
    }

    public class ErrorCode
    {
        public ErrorCode(int code, string message, string details)
        {
            Code = code;
            Message = message;
            Details = details;
        }

        public int Code { get; set; }

        public string Message { get; set; }

        public string Details { get; set; }
    }
}
