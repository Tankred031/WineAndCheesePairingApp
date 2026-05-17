import { Button, Table } from "react-bootstrap";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

export default function SireviPregledTablica({
    sirevi,
    navigate,
    obrisi,
    sortKolona,
    sortSmjer,
    setSortKolona,
    setSortSmjer,
    setCurrentPage
}) {

    const VRSTE = [
        { id: '1', naziv: 'kravlji' },
        { id: '2', naziv: 'ovčji' },
        { id: '3', naziv: 'kozji' },
        { id: '4', naziv: 'miješano' }
    ];

    const MASNOCE = [
        { id: '1', naziv: 'niske' },
        { id: '2', naziv: 'srednje' },
        { id: '3', naziv: 'visoke' }
    ];

    const TIPOVI = [
        { id: '1', naziv: 'svježi' },
        { id: '2', naziv: 'polutvrdi' },
        { id: '3', naziv: 'tvrdi' },
        { id: '4', naziv: 'plavi' },
        { id: '5', naziv: 'ekstra tvrdi' }
    ];

    const ZRENJA = [
        { id: '1', naziv: 'mladi' },
        { id: '2', naziv: 'srednje zreli' },
        { id: '3', naziv: 'dugo zreli' }
    ];

    const INTENZITETI = [
        { id: '1', naziv: 'blagi' },
        { id: '2', naziv: 'srednji' },
        { id: '3', naziv: 'jaki' }
    ];

    // =====================================================
    // SORT
    // =====================================================

    function handleSort(kolona) {

        if (sortKolona === kolona) {

            setSortSmjer(
                sortSmjer === "asc"
                    ? "desc"
                    : "asc"
            )

        } else {

            setSortKolona(kolona)
            setSortSmjer("asc")
        }

        // reset na prvu stranicu
        setCurrentPage(1)
    }

    function getSortIcon(kolona) {

        if (sortKolona !== kolona) {
            return <FaSort />
        }

        return sortSmjer === "asc"
            ? <FaSortUp />
            : <FaSortDown />
    }

    // =====================================================
    // HELPERS
    // =====================================================

    function getTipNaziv(id) {
        return TIPOVI.find(t => t.id === id)?.naziv || '';
    }

    function getVrstaNaziv(id) {
        return VRSTE.find(v => v.id === id)?.naziv || '';
    }

    function getZrenjeNaziv(id) {
        return ZRENJA.find(z => z.id === id)?.naziv || '';
    }

    function getIntenzitetNaziv(id) {
        return INTENZITETI.find(i => i.id === id)?.naziv || '';
    }

    function getMasnocaNaziv(id) {
        return MASNOCE.find(m => m.id === id)?.naziv || '';
    }

    return (

        <Table bordered striped hover responsive className="align-middle">

            <thead>

                <tr>

                    <th
                        onClick={() => handleSort('naziv')}
                        style={{ cursor: 'pointer' }}
                    >
                        Naziv {getSortIcon('naziv')}
                    </th>

                    <th
                        onClick={() => handleSort('tip_id')}
                        style={{ cursor: 'pointer' }}
                    >
                        Tip {getSortIcon('tip_id')}
                    </th>

                    <th
                        onClick={() => handleSort('vrsta_id')}
                        style={{ cursor: 'pointer' }}
                    >
                        Vrsta {getSortIcon('vrsta_id')}
                    </th>

                    <th
                        onClick={() => handleSort('zrenje_id')}
                        style={{ cursor: 'pointer' }}
                    >
                        Zrenje {getSortIcon('zrenje_id')}
                    </th>

                    <th
                        onClick={() => handleSort('regija')}
                        style={{ cursor: 'pointer' }}
                    >
                        Regija {getSortIcon('regija')}
                    </th>

                    <th
                        onClick={() => handleSort('intenzitet_id')}
                        style={{ cursor: 'pointer' }}
                    >
                        Intenzitet {getSortIcon('intenzitet_id')}
                    </th>

                    <th
                        onClick={() => handleSort('masnoca_id')}
                        style={{ cursor: 'pointer' }}
                    >
                        Masnoća {getSortIcon('masnoca_id')}
                    </th>

                    <th>
                        Okus
                    </th>

                    <th className="text-center">
                        Akcija
                    </th>

                </tr>

            </thead>

            <tbody>

                {sirevi?.map((sir) => (

                    <tr key={sir.id}>

                        <td>{sir.naziv}</td>

                        <td>
                            {getTipNaziv(sir.tip_id)}
                        </td>

                        <td>
                            {getVrstaNaziv(sir.vrsta_id)}
                        </td>

                        <td>
                            {getZrenjeNaziv(sir.zrenje_id)}
                        </td>

                        <td>
                            {sir.regija}
                        </td>

                        <td>
                            {getIntenzitetNaziv(sir.intenzitet_id)}
                        </td>

                        <td>
                            {getMasnocaNaziv(sir.masnoca_id)}
                        </td>

                        <td>
                            {sir.okus}
                        </td>

                        <td>

                            <div className="d-flex gap-1">

                                <Button
                                    variant="warning"
                                    size="sm"
                                    onClick={() =>
                                        navigate(`/sirevi/${sir.id}`)
                                    }
                                >
                                    Promjena
                                </Button>

                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() =>
                                        obrisi(sir.id)
                                    }
                                >
                                    Obriši
                                </Button>

                                <Button
                                    variant="info"
                                    size="sm"
                                    onClick={() =>
                                        navigate(
                                            `/uparivanje/sir/${sir.id}`,
                                            {
                                                state: {
                                                    from: "sirevi"
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