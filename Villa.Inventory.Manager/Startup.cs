using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Villa.Inventory.Manager.Startup))]
namespace Villa.Inventory.Manager
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
