using System;
using System.Collections.Generic;

namespace Domain.ViewModel
{
    public class DTOOrdemServicoResponse
    {
        public int Codigo { get; set; }
        public string Descricao { get; set; }
        public DateTime DataOrdem { get; set; }
        public DateTime DataRetorno { get; set; }
        public DTOParceiroNegocioResponse Prestador { get; set; }
        public DTOParceiroNegocioResponse Seguradora { get; set; }
        public int CodigoVeiculo { get; set; }
        public DTOVeiculoResponse Veiculo { get; set; }
        public string Observacao { get; set; }
        public double ValorTotal { get; set; }
        public List<DTOOrdemServicoItemResponse> Itens { get; set; } = new();
    }
}
