using System;

namespace Domain.ViewModel
{
    public class DTOOrdemServicoItemResponse
    {
        public int Codigo { get; set; }
        public int CodigoPeca { get; set; }
        public DTOPecasResponse Peca { get; set; }
        public string DescricaoReparo { get; set; }
        public double ValorEstimado { get; set; }
        public double ValorReal { get; set; }
        public string Status { get; set; }
    }
}
