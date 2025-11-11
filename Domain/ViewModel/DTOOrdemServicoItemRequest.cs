using System;

namespace Domain.ViewModel
{
    public class DTOOrdemServicoItemRequest
    {
        public int CodigoPeca { get; set; }
        public string DescricaoReparo { get; set; }
        public DTOPecasResponse? novaPeca { get; set; } = new DTOPecasResponse();
        public double ValorEstimado { get; set; }   
        public double ValorReal { get; set; }
        public string Status { get; set; }
    }
}
