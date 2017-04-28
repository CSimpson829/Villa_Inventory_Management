using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Web;

namespace Villa.Inventory.Manager.Models
{
    public class InventoryItem
    {
        [DisplayName("Inventory ID:")]
        public int inventory_id { get; set; }

        [DisplayName("Description:")]
        public String description { get; set; }

        [DisplayName("Category:")]
        public String category { get; set; }

        [DisplayName("Quantity:")]
        public int quantity { get; set; }

        [DisplayName("Serial Number:")]
        public String serial_number { get; set; }

        [DisplayName("Purchase Date:")]
        public DateTime purchase_date { get; set; }

        [DisplayName("Assigned Employee:")]
        public String assigned_employee { get; set; }

        [DisplayName("Logged Date:")]
        public DateTime logged_date { get; set; }

        [DisplayName("Logged Employee:")]
        public String logged_employee { get; set; }

        [DisplayName("Notes:")]
        public String notes { get; set; }


        //-------Not Columns in the Database--------
        [DisplayName("Purchase Date:")]
        public DateTime purchase_date_string { get; set; }
        [DisplayName("Purchase Time:")]
        public DateTime purchase_time_string { get; set; }

        [DisplayName("Logged Date:")]
        public DateTime logged_date_string { get; set; }
        [DisplayName("Logged Time:")]
        public DateTime logged_time_string { get; set; }
        //------------------------------------------
        
    }
    public enum categoryEnum
        {
            BarcodeScanner,
            Cable,
            Desktop,
            Dockingstation,
            iPad,
            Keyboard,
            Laptop,
            Monitor,
            Mouse,
            Phone,
            Printer,
            RouterFirewall,
            Scanner,
            Switch,
            Tablet,
            Tabletcase,
            Other            
        }
}