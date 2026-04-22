import { Table, Button } from "react-bootstrap";

export default function UparivanjeSirPregledTablica({
    sirevi,
    handleSort,
    getSortIcon,
    getVina,
    navigate,
    obrisi
}) {

    return (
        <Table striped bordered hover responsive className="align-middle">

            <thead>
                <tr>
                    <th onClick={() => handleSort("naziv")} className="sortable-header">
                        Sir {getSortIcon("naziv")}
                    </th>

                    <th onClick={() => handleSort("vina")} className="sortable-header">
                        Vina {getSortIcon("vina")}
                    </th>

                    <th className="text-center">Akcija</th>
                </tr>
            </thead>

            <tbody>
                {sirevi.map(sir => (
                    <tr key={sir.id}>
                        <td>{sir.naziv}</td>
                        <td>{getVina(sir.id)}</td>

                        <td>
                            <div className="d-flex gap-1 justify-content-center">
                                <Button
                                    variant="warning"
                                    size="sm"
                                    onClick={() => navigate(`/uparivanje/sir/${sir.id}`)}
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
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}