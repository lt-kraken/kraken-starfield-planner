namespace KrakenSoftware.Starfield.Planner.WebApi.ViewModels
{
    public class MonitorViewModel
    {
        public bool ApiAvailable { get; } = true;

        public bool DatabaseAvailable { get; set; } = false;
    }
}
