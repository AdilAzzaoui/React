using System;
namespace GestionStock.ViewModels
{
	public class ProductUpdateVM
	{
        public Type Art { get; set; }
        public string? SiteCode { get; set; }
        public string? Region { get; set; }
        public string? NumeroArticle { get; set; }
        public string? Province { get; set; }
        public string? GPS { get; set; }
        public string? FM1 { get; set; }
        public StatusUpdate Status { get; set; }
        public bool ServiceReportDone { get; set; }
        public string TechnicienId { get; set; }
        public string? Description { get; set; }
        public int ProductId { get; set; }

    }
    public enum StatusUpdate
    {
        Valide = 1,
        Removed_For_Repair = 2,
        Not_Pinging = 3
    }

}

