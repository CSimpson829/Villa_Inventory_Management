using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Villa.Inventory.Manager.Models
{
    public class UserModel
    {
        public int user_id { get; set; }

        public String user_role { get; set; }

        public String username { get; set; }

        public String password { get; set; }

        public String first_name { get; set; }

        public String last_name { get; set; }

        public String email { get; set; }
    }
}