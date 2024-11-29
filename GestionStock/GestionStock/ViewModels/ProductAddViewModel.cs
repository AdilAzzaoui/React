using System;
namespace GestionStock.ViewModels
{
	public class ProductAddViewModel
	{
		public Type Art { get; set; }
        public string SiteCode { get; set; }
        public string Region { get; set; }
        public string Province { get; set; }
        public string TechnicienId { get; set; }
        public string GPS { get; set; }
        public string FM1 { get; set; }
        public Status Status { get; set; }

    }
    public enum Type
    {
        Tunnel_150302_50_50mm = 1,
        _148145_50mm = 2,
        _151206_50_50mm = 3,
        _148078_50_35mm = 4,
        _150978_35mm = 5,
        _159048_35_35mm = 6
    }
    public enum Status
    {
        Removed_For_Repair = 1,
        Not_Pinging = 2
    }
}

