import Loading from '../components/ui/Loading';
import FlashMessage from '../components/ui/FlashMessage';
import OrdemTable from '../components/ordem/OrdemTable';
import { OrdemService } from '../services/OrdemService';
import { Modal } from "react-bootstrap";
import React, { useState } from 'react';
import OrdemFormulario from '../components/ordem/OrdemFormulario';

const OrdemPage = () => {
    const { loading, error, success, mensagem, ordens, modal, carregarOrdens, abrirModal, fecharModal, cadastrarOrdem, adicionarPecasOrdem, editarOrdem } = OrdemService();
    const [selected, setSelected] = useState([]);

    return (
        <div className="container">
            {success && <FlashMessage message={mensagem} type="success" duration={3000} />}
            {error && <FlashMessage message={mensagem} type="error" duration={3000} />}
            {loading ? (<Loading show={true} />) : (
                <><div className="d-flex justify-content-between align-items-end mb-4 mt-5">

                    {/* Título */}
                    <div>
                        <h1 className="fw-bold mb-1" style={{ color: "#158CBA" }}>
                            Ordens de Serviço
                        </h1>
                        <p className="text-muted mb-0">
                            Gestão, acompanhamento e manutenção de ordens.
                        </p>
                    </div>

                    {/* Data */}
                    <div className="text-end text-muted">
                        <small className="fw-semibold">
                            {new Date().toLocaleDateString('pt-BR', {
                                weekday: 'long',
                                day: '2-digit',
                                month: 'long',
                                year: 'numeric'
                            })}
                        </small>
                    </div>

                </div>


                    <div className="mt-4 mb-3 d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                            <button className="btn btn-primary me-2" onClick={() => abrirModal('nova', null)}>
                                <i className="fas fa-plus me-2"></i>Incluir
                            </button>

                            <button className="btn btn-secondary me-2" disabled={selected.length !== 1} onClick={() => {
                                const codigo = selected[0]?.codigo;
                                abrirModal('editar', codigo);
                            }}>
                                <i className="fas fa-pen me-2"></i>Editar
                            </button>
                        </div>

                        <div>
                            <button onClick={carregarOrdens} className="btn btn-outline-secondary" disabled={loading}>
                                {loading ? 'Atualizando...' : 'Atualizar Lista'}
                            </button>
                        </div>
                    </div>

                    <OrdemTable ordens={ordens} loading={loading} setSelected={setSelected} />

                    {modal.open && (
                        <Modal show={modal.open} onHide={fecharModal} centered size="lg" animation={true}>
                            <Modal.Header closeButton>
                                <Modal.Title>
                                    {modal.tipo === 'nova' && 'Nova Ordem de Serviço'}
                                    {modal.tipo === 'editar' && 'Editar Ordem de Serviço'}
                                </Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <OrdemFormulario
                                    onSubmit={async (formData, itensPecas) => {

                                        console.log(itensPecas);
        
                                        const payload = {
                                            ...formData,
                                            codigoPrestador: Number(formData.codigoPrestador),
                                            codigoSeguradora: Number(formData.codigoSeguradora),
                                            codigoVeiculo: Number(formData.codigoVeiculo),
                                            valorTotal: Number(formData.valorTotal),
                                            itens: itensPecas.map(i => ({
                                                codigoPeca: i.codigoPeca,
                                                descricaoReparo: i.descricaoReparo,
                                                valorEstimado: i.valorEstimado,
                                                valorReal: i.valorReal,
                                                status: i.status,
                                                novaPeca: i.novaPeca
                                                    ? {
                                                        codigo: 0,
                                                        nome: i.novaPeca.nome || i.descricaoReparo,
                                                        cor: i.novaPeca.cor || "",
                                                        modelo: i.novaPeca.modelo || "",
                                                        valor: Number(i.novaPeca.valor) || 0,
                                                        ano: i.novaPeca.ano || null
                                                    }
                                                    : null
                                            }))
                                        };


                                        if (modal.tipo == 'nova') {
                                            await cadastrarOrdem(payload);
                                        } else {
                                            await editarOrdem(payload, modal.chavePrimaria);
                                        }
                                        fecharModal();
                                        carregarOrdens();
                                    }}

                                    onCancel={fecharModal}
                                    ordem={modal.referencia}
                                    cadastros={modal.cadastros}
                                />

                            </Modal.Body>
                        </Modal>
                    )}
                </>
            )}
        </div>
    );
};

export default OrdemPage;
