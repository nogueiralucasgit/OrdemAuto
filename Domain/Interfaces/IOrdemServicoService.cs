using Domain.Entities;
using Domain.ViewModel;

namespace Domain.Interfaces
{
    public interface IOrdemServicoService
    {
        Task<List<DTOOrdemServicoResponse>> Pesquisar();
        Task<DTOOrdemServicoResponse> Consultar(int id);
        Task Adicionar(DTOOrdemServicoRequest dtoOrdemServico);
        Task Editar(DTOOrdemServicoRequest dtoOrdemServico);

    }
}
