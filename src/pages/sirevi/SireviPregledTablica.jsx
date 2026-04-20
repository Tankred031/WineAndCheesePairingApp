import { Button, Table } from "react-bootstrap";

export default function SireviPregledTablica({ sirevi, navigate, obrisi }) {

    const VRSTE = [
        { id: 1, naziv: "kravlji" },
        { id: 2, naziv: "ovčji" },
        { id: 3, naziv: "kozji" },
        { id: 4, naziv: "miješano" }
    ];

    const MASNOCE = [
        { id: 1, naziv: "niske" },
        { id: 2, naziv: "srednje" },
        { id: 3, naziv: "visoke" }
    ];

    const TIPOVI = [
        { id: 1, naziv: "svježi" },
        { id: 2, naziv: "polutvrdi" },
        { id: 3, naziv: "tvrdi" },
        { id: 4, naziv: "plavi" },
        { id: 5, naziv: "ekstra tvrdi" }
    ];

    const ZRENJA = [
        { id: 1, naziv: "mladi" },
        { id: 2, naziv: "srednje zreli" },
        { id: 3, naziv: "dugo zreli" }
    ];

    const INTEZITETI = [
        { id: 1, naziv: "blagi" },
        { id: 2, naziv: "srednji" },
        { id: 3, naziv: "jaki" }
    ];

    function getVrstaNaziv(id) {
        return VRSTE.find(v => v.id === id)?.naziv || '';
    }

    function getMasnocaNaziv(id) {
        return MASNOCE.find(m => m.id === id)?.naziv || '';
    }

    function getTipNaziv(id) {
        return TIPOVI.find(t => t.id === id)?.naziv || '';
    }

    function getZrenjeNaziv(id) {
        return ZRENJA.find(z => z.id === id)?.naziv || '';
    }

    function getIntezitetNaziv(id) {
        return INTEZITETI.find(i => i.id === id)?.naziv || '';
    }




    return (

        <Table bordered striped hover responsive className="align-middle">
            <thead>
                <tr>
                    <th>Naziv</th>
                    <th>Tip</th>
                    <th>Vrsta</th>
                    <th>Zrenje</th>
                    <th>Regija</th>
                    <th>Intezitet</th>
                    <th>Masnoća</th>
                    <th>Okus</th>
                    <th className="text-center">Akcija</th>
                </tr>
            </thead>
            <tbody>
                {sirevi && sirevi.map((sir) => (
                    <tr key={sir.id}>
                        <td>{sir.naziv}</td>
                        <td>{getTipNaziv(sir.tip_id)}</td>
                        <td>{getVrstaNaziv(sir.vrsta_id)}</td>
                        <td>{getZrenjeNaziv(sir.zrenje_id)}</td>
                        <td>{sir.regija}</td>
                        <td>{getIntezitetNaziv(sir.intezitet_id)}</td>
                        <td>{getMasnocaNaziv(sir.masnoca_id)}</td>
                        <td>{sir.okus}</td>
                        <td>
                            <div className="d-flex gap-1">
                                <Button
                                    variant="warning"
                                    size="sm"
                                    onClick={() => navigate(`/sirevi/${sir.id}`)}
                                >
                                    Promjena
                                </Button>

                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => obrisi(sir.id)}
                                >
                                    Obriši
                                </Button>

                                <Button
                                    variant="info"
                                    size="sm"
                                    onClick={() => navigate(`/uparivanje/sir/${sir.id}`, {
                                        state: { from: "sirevi" }
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
