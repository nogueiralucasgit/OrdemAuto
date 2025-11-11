using Domain.Entities;
using Domain.ViewModel;

namespace Domain.Interfaces
{
    public interface ICadastroRepository
    {
        Task<CWPecas> ConsultarPecas(int id);
        Task<List<CWPecas>> PesquisarPecas();
        Task<List<CWVeiculo>> PesquisarVeiculos();
        Task AdicionarPecas(CWPecas cwPecas);
        Task EditarPecas(CWPecas cwPecas);
        Task<CWVeiculo> ConsultarVeiculo(int id);
        Task AdicionarVeiculo(CWVeiculo cwVeiculo);
        Task EditarVeiculo(CWVeiculo cwVeiculo);
        Task<List<CWOrdemServicoItem>> GarantirPecas(List<CWOrdemServicoItem> itens);
    }
}
