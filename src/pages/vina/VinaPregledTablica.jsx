import { Button, Table } from "react-bootstrap";
import { useState } from "react";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

export default function VinaPregledTablica({ vina, navigate, obrisi }) {

    const [sortConfig, setSortConfig] = useState({ key: 'naziv', direction: 'asc' });

    const TIPOVI_VINA = [
        { id: 1, naziv: "crveno" },
        { id: 2, naziv: "bijelo" },
        { id: 3, naziv: "pjenušavo" },
        { id: 4, naziv: "desertno" },
        { id: 5, naziv: "rose" }
    ];

    const SLATKOCE = [
        { id: 1, naziv: "suho" },
        { id: 2, naziv: "polusuho" },
        { id: 3, naziv: "poluslatko" },
        { id: 4, naziv: "slatko" }
    ];

    function getTipNaziv(id) {
        return TIPOVI_VINA.find(t => t.id === id)?.naziv || '';
    }

    function getSlatkocaNaziv(id) {
        return SLATKOCE.find(s => s.id === id)?.naziv || '';
    }

    function format1dec(broj) {
        return Number(broj).toLocaleString("hr-HR", {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1
        });
    }

    const handleSort = (key) => {
        let direction = 'asc';

        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        } else if (sortConfig.key === key && sortConfig.direction === 'desc') {
            direction = 'asc';
        }

        setSortConfig({ key, direction });
    };

    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return <FaSort />;
        return sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />;
    };

    const sortedVina = () => {
        if (!vina) return [];

        const { key, direction } = sortConfig;
        if (!direction) return vina;

        return [...vina].sort((a, b) => {

            let aValue;
            let bValue;

            if (key === "alkohol") {
                aValue = (a.alkohol_min + a.alkohol_max) / 2;
                bValue = (b.alkohol_min + b.alkohol_max) / 2;
            }
            else if (key === "temperatura") {
                aValue = (a.temperatura_min + a.temperatura_max) / 2;
                bValue = (b.temperatura_min + b.temperatura_max) / 2;
            }
            else {
                aValue = a[key];
                bValue = b[key];
            }

            if (aValue == null) return 1;
            if (bValue == null) return -1;

            if (typeof aValue === "string") {
                return direction === "asc"
                    ? aValue.localeCompare(bValue, "hr")
                    : bValue.localeCompare(aValue, "hr");
            }

            return direction === "asc"
                ? aValue - bValue
                : bValue - aValue;
        });
    };

    return (
        <Table striped bordered hover responsive className="align-middle">
            <thead>
                <tr>
                    <th onClick={() => handleSort("naziv")} style={{ cursor: "pointer" }}>
                        Naziv {getSortIcon("naziv")}
                    </th>

                    <th onClick={() => handleSort("tip_id")} style={{ cursor: "pointer" }}>
                        Tip {getSortIcon("tip_id")}
                    </th>

                    <th onClick={() => handleSort("regija")} style={{ cursor: "pointer" }}>
                        Regija {getSortIcon("regija")}
                    </th>

                    <th onClick={() => handleSort("temperatura")} style={{ cursor: "pointer" }}>
                        Temperatura {getSortIcon("temperatura")}
                    </th>

                    <th onClick={() => handleSort("slatkoca_id")} style={{ cursor: "pointer" }}>
                        Slatkoća {getSortIcon("slatkoca_id")}
                    </th>

                    <th onClick={() => handleSort("arome")} style={{ cursor: "pointer" }}>
                        Arome {getSortIcon("arome")}
                    </th>

                    <th onClick={() => handleSort("tijelo")} style={{ cursor: "pointer" }}>
                        Tijelo {getSortIcon("tijelo")}
                    </th>

                    <th onClick={() => handleSort("alkohol")} style={{ cursor: "pointer" }}>
                        Alkohol {getSortIcon("alkohol")}
                    </th>

                    <th className="text-center">Akcija</th>
                </tr>
            </thead>

            <tbody>
                {sortedVina()?.map((vino) => (
                    <tr key={vino.id}>
                        <td>{vino.naziv}</td>
                        <td>{getTipNaziv(vino.tip_id)}</td>
                        <td>{vino.regija}</td>
                        <td>
                            {format1dec(vino.temperatura_min)} - {format1dec(vino.temperatura_max)} °C
                        </td>
                        <td>{getSlatkocaNaziv(vino.slatkoca_id)}</td>
                        <td>{vino.arome}</td>
                        <td>{vino.tijelo}</td>
                        <td>
                            {format1dec(vino.alkohol_min)} - {format1dec(vino.alkohol_max)} %
                        </td>

                        <td>
                            <div className="d-flex gap-1">
                                <Button
                                    variant="warning"
                                    size="sm"
                                    onClick={() => navigate(`/vina/${vino.id}`)}
                                >
                                    Promjena
                                </Button>

                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => obrisi(vino.id)}
                                >
                                    Obriši
                                </Button>

                                <Button
                                    variant="info"
                                    size="sm"
                                    onClick={() => navigate(`/uparivanje/vino/${vino.id}`, {
                                        state: { from: "vina" }
                                    })}
                                >
                                    Uparivanje
                                </Button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}