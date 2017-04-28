using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Villa.Inventory.Manager.Models
{
    public class HomeModel
    {
        public List<InventoryItem> InventoryItem { get; set; }
        public InventoryItem InventoryEditItem { get; set; }
        public UserModel UserModel { get; set; }
        //public UserModel User { get; set; }
        
    }
}