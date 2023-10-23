using KrakenSoftware.Starfield.Planner.Data.Context;
using KrakenSoftware.Starfield.Planner.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace KrakenSoftware.Starfield.Planner.Data
{
    public class StructureModule : IStructureModule
    {
        private readonly ApplicationDbContext _dbContext;

        public StructureModule(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IReadOnlyList<Structure> GetStructures()
        {
            var data = _dbContext.Structures.Include(x => x.BuildCost).ToList();
            return data;
        }

        public void CreateStructure(Structure structure)
        {
            _dbContext.Structures.Add(structure);
            _dbContext.SaveChanges();
        }

        public void DeleteStructure(long id)
        {
            var entry = _dbContext.Structures.Include(x => x.BuildCost).SingleOrDefault(x => x.Id == id);
            if (entry == null) return;
            _dbContext.Structures.Remove(entry);
            _dbContext.SaveChanges();
        }
    }

    public interface IStructureModule
    {
        IReadOnlyList<Structure> GetStructures();
        void CreateStructure(Structure structure);
        void DeleteStructure(long id);
    }
}