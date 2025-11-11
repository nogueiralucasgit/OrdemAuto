import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import apiConfig from '../Api';

export const OrdemService = () => {

    const [state, setState] = useState({
        loading: false,
        error: null,
        success: false,
        mensagem: '',
        ordens: [],
        modal: { open: false, tipo: null, referencia: null, cadastros: [] }
    });

    const carregarOrdens = useCallback(async () => {
        setState(prev => ({ ...prev, loading: true }));
        try {
            const response = await axios.get(`${apiConfig.ordem.baseURL}${apiConfig.ordem.endpoints.pesquisar}`);
            setState(prev => ({ ...prev, ordens: response.data, loading: false }));
        } catch (err) {
            setState(prev => ({ ...prev, error: true, mensagem: "Erro ao carregar ordens", loading: false }));
        }
    }, []);

    const adicionarPecasOrdem = async (codigoOrdem, itens) => {
       return axios.post(`${apiConfig.ordem.baseURL}/OrdemServico/AdicionarPecas?codigoOrdem=${codigoOrdem}`, itens);
    }

    const cadastrarOrdem = async (formData) => {
        setState(prev => ({ ...prev, loading: true }));
        try {
            const response = await axios.post(
                `${apiConfig.ordem.baseURL}${apiConfig.ordem.endpoints.cadastrar}`,
                formData,
                { headers: { 'Content-Type': 'application/json' } }
            );

            carregarOrdens();
            fecharModal();
            setState(prev => ({ ...prev, success: true, mensagem: response.data?.mensagem || "Ordem cadastrada!", loading: false }));

        } catch (err) {
            setState(prev => ({ ...prev, error: true, mensagem: "Erro ao cadastrar ordem", loading: false }));
        }
    };

    const editarOrdem = async (formData) => {
        setState(prev => ({ ...prev, loading: true }));
        try {
            const response = await axios.put(
                `${apiConfig.ordem.baseURL}${apiConfig.ordem.endpoints.editar}`,
                formData,
                { headers: { 'Content-Type': 'application/json' } }
            );

            carregarOrdens();
            fecharModal();
            setState(prev => ({ ...prev, success: true, mensagem: response.data?.mensagem || "Ordem atualizada!", loading: false }));

        } catch (err) {
            setState(prev => ({ ...prev, error: true, mensagem: "Erro ao editar ordem", loading: false }));
        }
    };

    const abrirModal = (tipo, codigo) => {
        axios.get(`${apiConfig.cadastro.baseURL}/TodosCadastros`)
            .then(response => {
                const cadastros = response.data;

                if (tipo === 'nova') {
                    setState(prev => ({
                        ...prev,
                        modal: { open: true, tipo: 'nova', referencia: null, cadastros }
                    }));
                } else if (tipo === 'editar') {
                    const ordem = state.ordens.find(o => o.codigo === codigo);

                    setState(prev => ({
                        ...prev,
                        modal: { open: true, tipo: 'editar', referencia: ordem, cadastros }
                    }));
                }
            });
    };


    const fecharModal = () => {
        setState(prev => ({ ...prev, modal: { open: false, tipo: null, referencia: null } }));
    };

    useEffect(() => {
        carregarOrdens();
    }, []);

    return {
        ...state,
        carregarOrdens,
        cadastrarOrdem,
        adicionarPecasOrdem,
        editarOrdem,
        abrirModal,
        fecharModal
    };
};
