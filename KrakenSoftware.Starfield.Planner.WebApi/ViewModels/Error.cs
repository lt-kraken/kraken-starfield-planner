namespace KrakenSoftware.Starfield.Planner.WebApi.ViewModels
{
    public class Error
    {
        public Error(string message)
        {
            Message = message;
        }

        public string Message { get; }
    }
}
