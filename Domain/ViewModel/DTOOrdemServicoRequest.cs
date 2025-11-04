using System;
using System.Collections.Generic;

namespace Domain.ViewModel
{
    public class DTOOrdemServicoRequest
    {
        public string Descricao { get; set; }
        public DateTime DataOrdem { get; set; }
        public DateTime DataRetorno { get; set; }
        public int CodigoPrestador { get; set; }
        public int CodigoSeguradora { get; set; }
        public int CodigoVeiculo { get; set; }
        public string Observacao { get; set; }
        public double ValorTotal { get; set; }
        public List<DTOOrdemServicoItemRequest> Itens { get; set; } = new();
    }
}
