import { Button, Table } from "react-bootstrap";

export default function VinaPregledTablica({ vina, navigate, obrisi }) {

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

    return (
        <Table striped bordered hover responsive className="align-middle">
            <thead>
                <tr>
                    <th>Naziv</th>
                    <th>Tip</th>
                    <th>Regija</th>
                    <th>Temperatura</th>
                    <th>Slatkoća</th>
                    <th>Arome</th>
                    <th>Tijelo</th>
                    <th>Alkohol</th>
                    <th className="text-center">Akcija</th>
                </tr>
            </thead>
            <tbody>
                {vina && vina.map((vino) => (
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