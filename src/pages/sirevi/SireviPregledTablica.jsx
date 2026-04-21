import { Button, Table } from "react-bootstrap";
import { useState } from "react";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

export default function SireviPregledTablica({ sirevi, navigate, obrisi }) {

    const [sortConfig, setSortConfig] = useState({
        key: 'naziv',
        direction: 'asc'
    });

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

    function handleSort(key) {
        let direction = 'asc';

        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        } else if (sortConfig.key === key && sortConfig.direction === 'desc') {
            direction = null;
        }

        setSortConfig({ key, direction });
    }

    function getSortIcon(key) {
        if (sortConfig.key !== key || !sortConfig.direction) return <FaSort />;
        return sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />;
    }

    function getSortValue(sir, key) {
        switch (key) {
            case 'tip_id':
                return TIPOVI.find(t => t.id === sir.tip_id)?.naziv;
            case 'vrsta_id':
                return VRSTE.find(v => v.id === sir.vrsta_id)?.naziv;
            case 'zrenje_id':
                return ZRENJA.find(z => z.id === sir.zrenje_id)?.naziv;
            case 'masnoca_id':
                return MASNOCE.find(m => m.id === sir.masnoca_id)?.naziv;
            case 'intezitet_id':
                return INTEZITETI.find(i => i.id === sir.intezitet_id)?.naziv;
            default:
                return sir[key];
        }
    }

    function sortedSirevi() {
        if (!sirevi || !sortConfig.direction) return sirevi;

        return [...sirevi].sort((a, b) => {
            let aValue = getSortValue(a, sortConfig.key);
            let bValue = getSortValue(b, sortConfig.key);

            if (aValue == null) aValue = '';
            if (bValue == null) bValue = '';

            if (typeof aValue === 'string') {
                return sortConfig.direction === 'asc'
                    ? aValue.localeCompare(bValue, 'hr')
                    : bValue.localeCompare(aValue, 'hr');
            }

            return sortConfig.direction === 'asc'
                ? aValue - bValue
                : bValue - aValue;
        });
    }

    return (
        <Table bordered striped hover responsive className="align-middle">
            <thead>
                <tr>
                    <th onClick={() => handleSort('naziv')} style={{ cursor: 'pointer' }}>
                        Naziv {getSortIcon('naziv')}
                    </th>

                    <th onClick={() => handleSort('tip_id')} style={{ cursor: 'pointer' }}>
                        Tip {getSortIcon('tip_id')}
                    </th>

                    <th onClick={() => handleSort('vrsta_id')} style={{ cursor: 'pointer' }}>
                        Vrsta {getSortIcon('vrsta_id')}
                    </th>

                    <th onClick={() => handleSort('zrenje_id')} style={{ cursor: 'pointer' }}>
                        Zrenje {getSortIcon('zrenje_id')}
                    </th>

                    <th onClick={() => handleSort('regija')} style={{ cursor: 'pointer' }}>
                        Regija {getSortIcon('regija')}
                    </th>

                    <th onClick={() => handleSort('intezitet_id')} style={{ cursor: 'pointer' }}>
                        Intezitet {getSortIcon('intezitet_id')}
                    </th>

                    <th onClick={() => handleSort('masnoca_id')} style={{ cursor: 'pointer' }}>
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
                {sortedSirevi()?.map((sir) => (
                    <tr key={sir.id}>
                        <td>{sir.naziv}</td>
                        <td>{TIPOVI.find(t => t.id === sir.tip_id)?.naziv}</td>
                        <td>{VRSTE.find(v => v.id === sir.vrsta_id)?.naziv}</td>
                        <td>{ZRENJA.find(z => z.id === sir.zrenje_id)?.naziv}</td>
                        <td>{sir.regija}</td>
                        <td>{INTEZITETI.find(i => i.id === sir.intezitet_id)?.naziv}</td>
                        <td>{MASNOCE.find(m => m.id === sir.masnoca_id)?.naziv}</td>
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