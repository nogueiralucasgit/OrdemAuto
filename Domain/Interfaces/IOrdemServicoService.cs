using Domain.Entities;
using Domain.Entities.Domain.Enums;
using Domain.ViewModel;

namespace Domain.Interfaces
{
    public interface IOrdemServicoService
    {
        Task<List<DTOOrdemServicoResponse>> Pesquisar();
        Task<DTOOrdemServicoResponse> Consultar(int id);
        Task Adicionar(DTOOrdemServicoRequest dtoOrdemServico);
        Task AdicionarPecas(List<DTOOrdemServicoItemRequest> dto, int codigoOrdem);
        Task Editar(int id, DTOOrdemServicoRequest dtoOrdemServico);
        Task<int> Contar(eStatusItemOrdemServico? eStatusItem = null);
    }
}
