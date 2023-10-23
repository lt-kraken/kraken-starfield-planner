using KrakenSoftware.Starfield.Planner.Data.Models;

namespace KrakenSoftware.Starfield.Planner.WebApi.Mappers
{
    public static class StructureToDataModelConverter
    {
        public static Structure ConvertToDataModel(this ViewModels.Structure data)
        {
            return new Structure()
            {
                Name = data.Name,
                Category = data.Category,
                PowerDemand = data.PowerDemand,
                PowerProductionMax = data.PowerProductionMax,
                PowerProductionMin = data.PowerProductionMin,
                BuildCost = data.BuildCost.Select(ConvertToDataModel).ToList()
            };
        }

        private static Resource ConvertToDataModel(this ViewModels.Resource data)
        {
            return new Resource()
            {
                Name = data.Name,
                Amount = data.Amount,
                Weight = data.Weight
            };
        }
    }
}
