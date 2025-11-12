import React, { useEffect, useState } from "react";
import axios from "axios";
import apiConfig from '../Api';
import { useNavigate } from "react-router-dom";
import OrdemTable from "../components/ordem/OrdemTable";

const CardDashboard = ({ label, value, icon, onClick }) => (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3">
        <div
            role="button"
            className="card text-center border-0 shadow-sm rounded-3"
            onClick={onClick}
            style={{
                cursor: onClick ? "pointer" : "default",
                transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                height: "120px"
            }}
            onMouseEnter={e => {
                if (onClick) {
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.1)";
                }
            }}
            onMouseLeave={e => {
                if (onClick) {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.05)";
                }
            }}
        >
            <div className="card-body d-flex flex-column justify-content-center p-3">
                <div className="d-flex align-items-center justify-content-start gap-4">

                    <i
                        className={`${icon} fa-2x text-primary`}
                        style={{ minWidth: "40px", textAlign: "center" }}
                    ></i>

                    <div className="text-start flex-grow-1">
                        <h6 className="card-title fw-medium mb-1 text-muted" style={{ fontSize: "1rem" }}>
                            {label}
                        </h6>

                        <div className="fs-4 fw-bold text-dark">
                            {value ?? "--"}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
);

const Dashboard = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [dados, setDados] = useState(null);
    const [selected, setSelected] = useState([]);

    useEffect(() => {
        const carregar = async () => {
            try {
                const response = await axios.get(
                    `${apiConfig.ordem.baseURL}${apiConfig.ordem.endpoints.dashboard}`
                );
                setDados(response.data);
            } catch (err) {
                console.error("Erro ao carregar dashboard:", err);
            } finally {
                setLoading(false);
            }
        };

        carregar();
    }, []);

    if (loading) return <p>Carregando...</p>;
    if (!dados) return <p>Erro ao carregar informações.</p>;

    return (
        <div className="container mt-5">
            <h1 className="fw-bold text-primary mb-4">Dashboard</h1>

            <div className="row g-3">

                <CardDashboard
                    label="OS Criadas"
                    value={dados.totalCotacoes}
                    icon="fas fa-file-signature"
                    onClick={() => navigate("/ordens")}
                />

                <CardDashboard
                    label="OS em Andamento"
                    value={dados.osEmAndamento}
                    icon="fas fa-hourglass-half"
                    onClick={() => navigate("/ordens")}
                />

                <CardDashboard
                    label="OS Concluídas"
                    value={dados.osConcluidas}
                    icon="fas fa-check-circle"
                    onClick={() => navigate("/ordens")}
                />

                <CardDashboard
                    label="Veículos Cadastrados"
                    value={dados.totalVeiculos}
                    icon="fas fa-truck"
                    onClick={() => navigate("/veiculos")}
                />

            </div>


            <div className="mt-5">
                <div className="d-flex justify-content-between align-items-end mb-4 mt-5">

                    <div>
                        <h1 className="fw-bold mb-1" style={{ color: "#158CBA" }}>
                            Últimas ordens criadas
                        </h1>
                        <p className="text-muted mb-0">
                            Gestão, acompanhamento e manutenção de ordens.
                        </p>
                    </div>

                    <div className="text-end text-muted">
                        <small className="fw-semibold">
                            {new Date().toLocaleDateString("pt-BR", {
                                weekday: "long",
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                            })}
                        </small>
                    </div>
                </div>

                <OrdemTable
                    ordens={dados.ultimasOrdens}
                    loading={loading}
                    setSelected={setSelected}
                />

            </div>
        </div>
    );
};


export default Dashboard;
