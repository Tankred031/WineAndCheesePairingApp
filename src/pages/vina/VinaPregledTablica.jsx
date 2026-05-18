import { Button, Table } from "react-bootstrap";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

export default function VinaPregledTablica({
    vina,
    navigate,
    obrisi,
    sortKolona,
    sortSmjer,
    setSortKolona,
    setSortSmjer,
    setCurrentPage
}) {

    const TIPOVI_VINA = [
        { id: '1', naziv: 'crveno' },
        { id: '2', naziv: 'bijelo' },
        { id: '3', naziv: 'pjenušavo' },
        { id: '4', naziv: 'desertno' },
        { id: '5', naziv: 'rose' }
    ];

    const SLATKOCE = [
        { id: '1', naziv: 'suho' },
        { id: '2', naziv: 'polusuho' },
        { id: '3', naziv: 'poluslatko' },
        { id: '4', naziv: 'slatko' }
    ];

    const TIJELA = [
        { id: '1', naziv: 'lagano' },
        { id: '2', naziv: 'srednje' },
        { id: '3', naziv: 'puno' }
    ];

    // =====================================================
    // HELPERS
    // =====================================================

    const round1 = (num) => Math.round(num * 10) / 10;

    function getTipNaziv(id) {
        return TIPOVI_VINA.find(t => t.id === id)?.naziv || '';
    }

    function getSlatkocaNaziv(id) {
        return SLATKOCE.find(s => s.id === id)?.naziv || '';
    }

    function getTijeloNaziv(id) {
        return TIJELA.find(
            t => t.id === id
        )?.naziv || '';
    }

    function format1dec(broj) {
        return Number(broj).toLocaleString("hr-HR", {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1
        });
    }

    // =====================================================
    // SORT
    // =====================================================

    function handleSort(kolona) {

        if (sortKolona === kolona) {

            setSortSmjer(
                sortSmjer === "asc"
                    ? "desc"
                    : "asc"
            );

        } else {

            setSortKolona(kolona);
            setSortSmjer("asc");
        }

        // reset pagination na prvu stranicu
        setCurrentPage(1);
    }

    function getSortIcon(kolona) {

        if (sortKolona !== kolona) {
            return <FaSort />;
        }

        return sortSmjer === "asc"
            ? <FaSortUp />
            : <FaSortDown />;
    }

    // =====================================================
    // RENDER
    // =====================================================

    return (

        <Table
            striped
            bordered
            hover
            responsive
            className="align-middle"
        >

            <thead>

                <tr>

                    <th
                        onClick={() => handleSort("naziv")}
                        className="sortable-header"
                    >
                        Naziv
                        <span className="sort-icon">
                            {getSortIcon("naziv")}
                        </span>
                    </th>

                    <th
                        onClick={() => handleSort("tip_id")}
                        className="sortable-header"
                    >
                        Tip
                        <span className="sort-icon">
                            {getSortIcon("tip_id")}
                        </span>
                    </th>

                    <th
                        onClick={() => handleSort("regija")}
                        className="sortable-header"
                    >
                        Regija
                        <span className="sort-icon">
                            {getSortIcon("regija")}
                        </span>
                    </th>

                    <th
                        onClick={() => handleSort("temperatura")}
                        className="sortable-header"
                    >
                        Temperatura
                        <span className="sort-icon">
                            {getSortIcon("temperatura")}
                        </span>
                    </th>

                    <th
                        onClick={() => handleSort("slatkoca_id")}
                        className="sortable-header"
                    >
                        Slatkoća
                        <span className="sort-icon">
                            {getSortIcon("slatkoca_id")}
                        </span>
                    </th>

                    <th
                        onClick={() => handleSort("arome")}
                        className="sortable-header"
                    >
                        Arome
                        <span className="sort-icon">
                            {getSortIcon("arome")}
                        </span>
                    </th>

                    <th
                        onClick={() => handleSort("tijelo_id")}
                        className="sortable-header"
                    >
                        Tijelo
                        <span className="sort-icon">
                            {getSortIcon("tijelo_id")}
                        </span>
                    </th>

                    <th
                        onClick={() => handleSort("alkohol")}
                        className="sortable-header"
                    >
                        Alkohol
                        <span className="sort-icon">
                            {getSortIcon("alkohol")}
                        </span>
                    </th>

                    <th className="text-center">
                        Akcija
                    </th>

                </tr>

            </thead>

            <tbody>

                {vina?.map((vino) => (

                    <tr key={vino.id}>

                        <td>
                            {vino.naziv}
                        </td>

                        <td>
                            {getTipNaziv(vino.tip_id)}
                        </td>

                        <td>
                            {vino.regija}
                        </td>

                        <td>
                            {format1dec(vino.temperatura_min)}
                            {" - "}
                            {format1dec(vino.temperatura_max)}
                            {" °C"}
                        </td>

                        <td>
                            {getSlatkocaNaziv(vino.slatkoca_id)}
                        </td>

                        <td>
                            {vino.arome}
                        </td>

                        <td>
                            {getTijeloNaziv(vino.tijelo_id)}
                        </td>

                        <td>
                            {format1dec(vino.alkohol_min)}
                            {" - "}
                            {format1dec(vino.alkohol_max)}
                            {" %"}
                        </td>

                        <td>

                            <div className="d-flex gap-1">

                                <Button
                                    variant="warning"
                                    size="sm"
                                    onClick={() =>
                                        navigate(`/vina/${vino.id}`)
                                    }
                                >
                                    Promjena
                                </Button>

                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() =>
                                        obrisi(vino.id)
                                    }
                                >
                                    Obriši
                                </Button>

                                <Button
                                    variant="info"
                                    size="sm"
                                    onClick={() =>
                                        navigate(
                                            `/uparivanje/vino/${vino.id}`,
                                            {
                                                state: {
                                                    from: "vina"
                                                }
                                            }
                                        )
                                    }
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