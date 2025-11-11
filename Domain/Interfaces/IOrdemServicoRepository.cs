using Domain.Entities;
using Domain.ViewModel;

namespace Domain.Interfaces
{
    public interface IOrdemServicoRepository
    {
        Task<List<CWOrdemServico>> Pesquisar();
        Task<CWOrdemServico> Consultar(int id);
        Task Adicionar(CWOrdemServico cWOrdemServico);
        Task Editar(CWOrdemServico cWOrdemServico);
        Task AdicionarItem(CWOrdemServicoItem item);
    }
}
