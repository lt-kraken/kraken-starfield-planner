using KrakenSoftware.Starfield.Planner.WebApi.ViewModels;

namespace KrakenSoftware.Starfield.Planner.WebApi.Mappers
{
    public static class StructureToViewModelConverter
    {
        public static List<Structure> ConvertToViewModel(this IReadOnlyList<Data.Models.Structure> data)
        {
            var result = data.Select(x => new Structure()
            {
                Id = x.Id,
                Name = x.Name,
                Category = x.Category,
                PowerDemand = x.PowerDemand,
                PowerProductionMax = x.PowerProductionMax,
                PowerProductionMin = x.PowerProductionMin,
                BuildCost = x.BuildCost.Select(ConvertToViewModel).ToList()
            }).ToList();

            return result;
        }

        private static Resource ConvertToViewModel(this Data.Models.Resource data)
        {
            return new Resource()
            {
                Name = data.Name,
                Amount = data.Amount,
                Weight = data.Weight,
            };
        }
    }
}
