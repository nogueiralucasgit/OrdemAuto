using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ViewModel
{
    public class DTOConsultarTodos
    {
        public List<DTOPecasResponse> pecas { get; set; } = new List<DTOPecasResponse>();
        public List<DTOParceiroNegocioResponse> seguradora { get; set; } = new List<DTOParceiroNegocioResponse>();
        public List<DTOParceiroNegocioResponse> prestadora { get; set; } = new List<DTOParceiroNegocioResponse>();
        public List<DTOVeiculoResponse> veiculo { get; set; } = new List<DTOVeiculoResponse>();
    }
}
