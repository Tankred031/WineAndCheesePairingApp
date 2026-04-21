import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import VinaService from "../../services/vina/VinaService";
import SireviService from "../../services/sirevi/SireviService";
import UparivanjeCustomService from "../../services/uparivanje/UparivanjeCustomService";
import { uparivanjeSiraById } from "../../services/uparivanje/UparivanjeSiraPopis";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

export default function UparivanjeSirPregled() {

    const [vina, setVina] = useState([]);
    const [sirevi, setSirevi] = useState([]);
    const [custom, setCustom] = useState([]);
    const [pojam, setPojam] = useState('')

    const navigate = useNavigate();

    useEffect(() => {
        ucitaj()

    }, [])

    const [sortConfig, setSortConfig] = useState({
        key: 'naziv',
        direction: 'asc'
    });


    const filtriraniSirevi = sirevi.filter(s => {
        const p = pojam.toLowerCase();

        const vinaText = getVina(s.id).toLowerCase();

        return (
            s.naziv?.toLowerCase().includes(p) ||
            vinaText.includes(p)
        );
    });
    async function ucitaj() {
        const v = await VinaService.get();
        const s = await SireviService.get();
        const c = await UparivanjeCustomService.get();

        setVina(v.data || []);
        setSirevi(s.data || []);
        setCustom(c.data || []);
    }

    function getVina(sirId) {

        const customIds = custom
            .filter(u => u.sirId === sirId)
            .map(u => u.vinoId);

        const statickiIds = uparivanjeSiraById[sirId] || [];

        const customZaSir = custom.filter(u => u.sirId === sirId);

        // ako postoji bilo kakav custom zapis za to vino → koristi ga
        // čak i ako je prazan (to znači "nema preporuke")
        const ids = customZaSir.length > 0
            ? customZaSir.map(u => u.vinoId)
            : (uparivanjeSiraById[sirId] || [])

        const lista = vina
            .filter(v => ids.includes(v.id))
            .map(v => v.naziv);

        return lista.length ? lista.join(", ") : "-nema preporuke-";
    }

    const TIPOVI = [
        { id: 1, naziv: "svježi" },
        { id: 2, naziv: "polutvrdi" },
        { id: 3, naziv: "tvrdi" },
        { id: 4, naziv: "plavi" },
        { id: 5, naziv: "ekstra tvrdi" }
    ]

    function getTipNaziv(id) {
        return TIPOVI.find(v => v.id === id)?.naziv || ''
    }


    // DOHVAT OBJEKATA SIREVA
    function getVinaObjekti(sirId) {

        const customZaSir = custom.filter(u => u.sirId === sirId)

        const ids = customZaSir.length > 0
            ? customZaSir.map(u => u.vinoId)
            : (uparivanjeSiraById[sirId] || [])

        return vina.filter(v => ids.includes(v.id))
    }

    function obrisi(sirId) {
        if (!confirm("Sigurno obrisati?")) return;
        setSirevi(prev => prev.filter(s => s.id !== sirId));
    }

    let poruka;

    if (sirevi.length === 0) {
        poruka = "Nema učitanih sireva - stoga nema ni uparivanja";
    } else {
        const brojUspjesnih = sirevi.filter(s =>
            getVina(s.id) !== "-nema preporuke-"
        ).length;

        const opis = brojUspjesnih === sirevi.length ? "svih" : "samo";

        poruka = (
            <>
                Učitano ukupno <strong>{sirevi.length}</strong> sireva - i uspješno upareno {opis} <strong>{brojUspjesnih}</strong>.
            </>
        );
    }

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
                return TIPOVI.find(t => t.id === sir.tip_id)?.naziv || '';
            case 'vina':
                return getVina(sir.id); // 👈 sort po stringu vina
            default:
                return sir[key] ?? '';
        }
    }

    function sortedSirevi() {
        if (!filtriraniSirevi || !sortConfig.direction) return filtriraniSirevi;

        return [...filtriraniSirevi].sort((a, b) => {
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
        <div className="mt-4">

            <div className="d-flex justify-content-between align-items-center mb-3 mt-3 w-100">

                <h4 className="section-title">Popis uparenih sireva</h4>

                <input
                    type="text"
                    placeholder="Traži sir ili vino..."
                    className="form-control w-25"
                    style={{
                        backgroundColor: "lightgrey",
                        border: "2px solid grey"
                    }}
                    value={pojam}
                    onChange={(e) => setPojam(e.target.value)}
                />
            </div>

            <Table className="align-middle" bordered striped hover>
                <thead>
                    <tr>
                        <th onClick={() => handleSort('naziv')} style={{ cursor: 'pointer' }}>
                            Sirevi {getSortIcon('naziv')}
                        </th>

                        <th onClick={() => handleSort('vina')} style={{ cursor: 'pointer' }}>
                            Preporučena vina {getSortIcon('vina')}
                        </th>

                        <th onClick={() => handleSort('tip_id')} style={{ cursor: 'pointer' }}>
                            Tip {getSortIcon('tip_id')}
                        </th>
                        <th className="text-center">Akcija</th>
                    </tr>
                </thead>

                <tbody>
                    {sortedSirevi().map(sir => (
                        <tr key={sir.id}>
                            <td>{sir.naziv}</td>
                            <td>{getVina(sir.id)}</td>
                            <td style={{ textAlign: "center" }}>{getTipNaziv(sir.tip_id)}</td>

                            <td style={{ whiteSpace: "nowrap" }}>
                                <div className="d-flex justify-content-center gap-2">

                                    <Button
                                        variant="warning"
                                        size="sm"
                                        onClick={() => navigate(`/uparivanje/sir/${sir.id}`, {
                                            state: { from: "uparivanje" }
                                        })}
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
            <p className="mt-2 mb-0 text-muted">
                {poruka}
            </p>
        </div>
    );
}