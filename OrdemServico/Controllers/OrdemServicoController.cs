using Domain.Interfaces;
using Domain.ViewModel;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdemServicoController : ControllerBase
    {
        private readonly IOrdemServicoService _ordemServicoService;

        public OrdemServicoController(IOrdemServicoService ordemServicoService)
        {
            _ordemServicoService = ordemServicoService;
        }
        [HttpGet]
        public async Task<ActionResult<List<DTOOrdemServicoResponse>>> Pesquisar()
        {
            try
            {
                var ordens = await _ordemServicoService.Pesquisar();
                return Ok(ordens);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro interno: {ex.Message}");
            }
        }
        [HttpGet("{id:int}")]
        public async Task<ActionResult<DTOOrdemServicoResponse>> Consultar(int id)
        {
            try
            {
                var ordem = await _ordemServicoService.Consultar(id);
                return Ok(ordem);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro interno: {ex.Message}");
            }
        }
        [HttpPost("Cadastrar")]
        public async Task<ActionResult> Adicionar([FromBody] DTOOrdemServicoRequest dto)
        {
            try
            {
                await _ordemServicoService.Adicionar(dto);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro ao adicionar a ordem de serviço: {ex.Message}");
            }
        }
        [HttpPost("AdicionarPecas")]
        public async Task<ActionResult> AdicionarPecas([FromBody] List<DTOOrdemServicoItemRequest> dto, int codigoOrdem)
        {
            try
            {
                await _ordemServicoService.AdicionarPecas(dto, codigoOrdem);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro ao adicionar as peças: {ex.Message}");
            }
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Editar(int id, [FromBody] DTOOrdemServicoRequest dto)
        {
            try
            {
                await _ordemServicoService.Editar(dto);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro ao atualizar a ordem de serviço: {ex.Message}");
            }
        }
    }
}
