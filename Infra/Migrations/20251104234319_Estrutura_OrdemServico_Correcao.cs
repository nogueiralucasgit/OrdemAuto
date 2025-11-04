using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Infra.Migrations
{
    /// <inheritdoc />
    public partial class Estrutura_OrdemServico_Correcao : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "OrdemServico",
                columns: table => new
                {
                    nCdOrdemServico = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    sDsOrdem = table.Column<string>(type: "text", nullable: false),
                    tDtOrdem = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    tDtRetorno = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    nCdPrestador = table.Column<int>(type: "integer", nullable: false),
                    nCdSeguradora = table.Column<int>(type: "integer", nullable: false),
                    sDsObservacao = table.Column<string>(type: "text", nullable: false),
                    dVlTotal = table.Column<double>(type: "double precision", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrdemServico", x => x.nCdOrdemServico);
                    table.ForeignKey(
                        name: "FK_OrdemServico_PARCEIRO_NEGOCIO_nCdPrestador",
                        column: x => x.nCdPrestador,
                        principalTable: "PARCEIRO_NEGOCIO",
                        principalColumn: "nCdParceiro",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrdemServico_PARCEIRO_NEGOCIO_nCdSeguradora",
                        column: x => x.nCdSeguradora,
                        principalTable: "PARCEIRO_NEGOCIO",
                        principalColumn: "nCdParceiro",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OrdemServicoItem",
                columns: table => new
                {
                    nCdItemOrdemServico = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nCdOrdemServico = table.Column<int>(type: "integer", nullable: false),
                    nCdPeca = table.Column<int>(type: "integer", nullable: false),
                    sDsReparo = table.Column<string>(type: "text", nullable: false),
                    dVlEstimado = table.Column<double>(type: "double precision", nullable: false),
                    dVlReal = table.Column<double>(type: "double precision", nullable: false),
                    eStatus = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrdemServicoItem", x => x.nCdItemOrdemServico);
                    table.ForeignKey(
                        name: "FK_OrdemServicoItem_OrdemServico_nCdOrdemServico",
                        column: x => x.nCdOrdemServico,
                        principalTable: "OrdemServico",
                        principalColumn: "nCdOrdemServico",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrdemServicoItem_PECAS_nCdPeca",
                        column: x => x.nCdPeca,
                        principalTable: "PECAS",
                        principalColumn: "nCdPeca",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OrdemServico_nCdPrestador",
                table: "OrdemServico",
                column: "nCdPrestador");

            migrationBuilder.CreateIndex(
                name: "IX_OrdemServico_nCdSeguradora",
                table: "OrdemServico",
                column: "nCdSeguradora");

            migrationBuilder.CreateIndex(
                name: "IX_OrdemServicoItem_nCdOrdemServico",
                table: "OrdemServicoItem",
                column: "nCdOrdemServico");

            migrationBuilder.CreateIndex(
                name: "IX_OrdemServicoItem_nCdPeca",
                table: "OrdemServicoItem",
                column: "nCdPeca");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OrdemServicoItem");

            migrationBuilder.DropTable(
                name: "OrdemServico");
        }
    }
}
