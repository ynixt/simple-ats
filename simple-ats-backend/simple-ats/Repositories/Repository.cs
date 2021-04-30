using SimpleAts.Data;

namespace SimpleAts.Repositories
{
  public abstract class Repository
  {
    protected SimpleAtsContext context;

    public Repository(SimpleAtsContext context)
    {
      this.context = context;
    }
  }
}
