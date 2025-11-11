const OrdemItemFormulario = ({ onSubmit, onCancel, pecas, codigoOrdem }) => {

    const [itens, setItens] = useState([]);

    const [formData, setFormData] = useState({
        codigoPeca: "",
        descricaoReparo: "",
        valorEstimado: "",
        valorReal: "",
        status: "EmAndamento",
        novaPeca: {
            modelo: "",
            valor: ""
        },
        usarNovaPeca: false
    });

    // trocar peça existente
    const handleChangePeca = (e) => {
        const codigo = e.target.value;

        setFormData(prev => ({
            ...prev,
            codigoPeca: codigo,
            usarNovaPeca: false
        }));

        const peca = pecas.find(p => p.codigo == codigo);
        if (peca) {
            setFormData(prev => ({
                ...prev,
                valorEstimado: peca.valor,
                valorReal: peca.valor
            }));
        }
    };

    // trocar valores gerais
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.startsWith("novaPeca")) {
            const field = name.replace("novaPeca.", "");
            setFormData(prev => ({
                ...prev,
                novaPeca: {
                    ...prev.novaPeca,
                    [field]: value
                }
            }));
            return;
        }

        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const adicionarItem = () => {
        if (!formData.usarNovaPeca && !formData.codigoPeca) {
            alert("Selecione uma peça ou cadastre uma nova.");
            return;
        }

        const item = {
            codigoPeca: formData.usarNovaPeca ? 0 : Number(formData.codigoPeca),
            descricaoReparo: formData.descricaoReparo,
            valorEstimado: Number(formData.valorEstimado),
            valorReal: Number(formData.valorReal),
            status: formData.status,
            novaPeca: formData.usarNovaPeca
                ? {
                    modelo: formData.novaPeca.modelo,
                    valor: Number(formData.novaPeca.valor)
                }
                : null
        };

        setItens(prev => [...prev, item]);

        // reset
        setFormData({
            codigoPeca: "",
            descricaoReparo: "",
            valorEstimado: "",
            valorReal: "",
            status: "EmAndamento",
            novaPeca: { modelo: "", valor: "" },
            usarNovaPeca: false
        });
    };

    const removerItem = (index) => {
        setItens(itens.filter((_, i) => i !== index));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (itens.length === 0) {
            alert("Adicione pelo menos uma peça!");
            return;
        }

        onSubmit(itens, codigoOrdem);
    };

    return (
        <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3">
                <Form.Label>Peça Existente</Form.Label>
                <Form.Select
                    disabled={formData.usarNovaPeca}
                    value={formData.codigoPeca}
                    onChange={handleChangePeca}
                >
                    <option value="">Selecione...</option>
                    {pecas.map(p => (
                        <option key={p.codigo} value={p.codigo}>
                            {p.modelo} - R$ {p.valor}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>

            <Button
                variant="outline-primary"
                className="mb-3"
                onClick={() =>
                    setFormData(prev => ({ ...prev, usarNovaPeca: !prev.usarNovaPeca }))
                }
            >
                {formData.usarNovaPeca ? "Cancelar peça nova" : "Cadastrar nova peça"}
            </Button>

            <Collapse in={formData.usarNovaPeca}>
                <div className="p-3 border rounded">

                    <Form.Group>
                        <Form.Label>Modelo da Peça</Form.Label>
                        <Form.Control
                            type="text"
                            name="novaPeca.modelo"
                            value={formData.novaPeca.modelo}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mt-2">
                        <Form.Label>Valor</Form.Label>
                        <Form.Control
                            type="number"
                            name="novaPeca.valor"
                            value={formData.novaPeca.valor}
                            onChange={handleChange}
                        />
                    </Form.Group>

                </div>
            </Collapse>

            <div className="row mt-3">
                <div className="col-md-6">
                    <Form.Group>
                        <Form.Label>Descrição do Reparo</Form.Label>
                        <Form.Control
                            type="text"
                            name="descricaoReparo"
                            value={formData.descricaoReparo}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </div>

                <div className="col-md-3">
                    <Form.Group>
                        <Form.Label>Valor Estimado</Form.Label>
                        <Form.Control
                            type="number"
                            name="valorEstimado"
                            value={formData.valorEstimado}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </div>

                <div className="col-md-3">
                    <Form.Group>
                        <Form.Label>Valor Real</Form.Label>
                        <Form.Control
                            type="number"
                            name="valorReal"
                            value={formData.valorReal}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </div>
            </div>

            <Button className="mt-3" onClick={adicionarItem}>
                Adicionar
            </Button>

            <hr />

            {itens.length > 0 && (
                <Table bordered striped>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Peça</th>
                            <th>Reparo</th>
                            <th>Estimado</th>
                            <th>Real</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {itens.map((i, idx) => (
                            <tr key={idx}>
                                <td>{idx + 1}</td>
                                <td>
                                    {i.codigoPeca > 0
                                        ? `ID ${i.codigoPeca}`
                                        : `Nova: ${i.novaPeca.modelo}`}
                                </td>
                                <td>{i.descricaoReparo}</td>
                                <td>R$ {i.valorEstimado}</td>
                                <td>R$ {i.valorReal}</td>
                                <td>
                                    <Button size="sm" variant="danger" onClick={() => removerItem(idx)}>
                                        Remover
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

            <div className="d-flex justify-content-end">
                <Button variant="secondary" className="me-2" onClick={onCancel}>
                    Cancelar
                </Button>
                <Button variant="primary" type="submit">
                    Salvar
                </Button>
            </div>

        </Form>
    );
};
