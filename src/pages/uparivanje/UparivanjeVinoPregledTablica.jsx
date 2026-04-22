import { Button, Table } from "react-bootstrap";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

export default function UparivanjeVinoPregledTablica({
    sortedVina,
    handleSort,
    getSortIcon,
    getBojaVina,
    getSirevi,
    getOcjena,
    getSireviObjekti,
    navigate,
    obrisi
}) {

    return (
        <Table striped bordered hover responsive className="align-middle">

            <thead>
                <tr>
                    <th onClick={() => handleSort("naziv")} className="sortable-header">
                        Vino <span>{getSortIcon("naziv")}</span>
                    </th>

                    <th className="text-center">Boja</th>

                    <th onClick={() => handleSort("sirevi")} className="sortable-header">
                        Sirevi <span>{getSortIcon("sirevi")}</span>
                    </th>

                    <th onClick={() => handleSort("ocjena")} className="sortable-header">
                        Ocjena <span>{getSortIcon("ocjena")}</span>
                    </th>

                    <th className="text-center">Akcija</th>
                </tr>
            </thead>

            <tbody>
                {sortedVina.map(vino => (
                    <tr key={vino.id}>
                        <td>{vino.naziv}</td>

                        <td className="text-center">
                            <div className="d-flex justify-content-center align-items-center">
                                <span
                                    className="color-dot"
                                    style={{ backgroundColor: getBojaVina(vino.id) }}
                                />
                            </div>
                        </td>

                        <td>{getSirevi(vino.id)}</td>

                        <td className="text-center">
                            {(() => {
                                const ocjena = getOcjena(vino, getSireviObjekti(vino.id));

                                return (
                                    <span
                                        className="badge px-3 py-2"
                                        style={{
                                            fontSize: "1.2rem",
                                            borderRadius: "6px",
                                            minWidth: "60px",
                                            color:
                                                ocjena === "A"
                                                    ? "lime"
                                                    : ocjena === "B"
                                                        ? "darkorange"
                                                        : "darkblue",
                                            backgroundColor: "#0d6efd"
                                        }}
                                    >
                                        {ocjena}
                                    </span>
                                );
                            })()}
                        </td>

                        <td>
                            <div className="d-flex gap-1 justify-content-center">
                                <Button
                                    variant="warning"
                                    size="sm"
                                    onClick={() => navigate(`/uparivanje/vino/${vino.id}`)}
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
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}