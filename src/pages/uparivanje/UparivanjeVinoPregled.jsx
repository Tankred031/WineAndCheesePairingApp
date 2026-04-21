import { useEffect, useState, useMemo } from "react";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import VinaService from "../../services/vina/VinaService";
import SireviService from "../../services/sirevi/SireviService";
import UparivanjeCustomService from "../../services/uparivanje/UparivanjeCustomService";
import { uparivanjeVinaById } from "../../services/uparivanje/UparivanjeVinaPopis";
import { VinaBoje } from "../../services/vina/VinaBoje";

import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

export default function UparivanjeVinoPregled() {

    const [vina, setVina] = useState([]);
    const [sirevi, setSirevi] = useState([]);
    const [custom, setCustom] = useState([]);
    const [pojam, setPojam] = useState("");

    const navigate = useNavigate();

    const [sortConfig, setSortConfig] = useState({
        key: "naziv",
        direction: "asc"
    });

    useEffect(() => {
        ucitaj();
    }, []);

    async function ucitaj() {
        const v = await VinaService.get();
        const s = await SireviService.get();
        const c = await UparivanjeCustomService.get();

        setVina(v.data || []);
        setSirevi(s.data || []);
        setCustom(c.data || []);
    }

    function getSirevi(vinoId) {
        const customZaVino = custom.filter(u => u.vinoId === vinoId);

        const ids = customZaVino.length > 0
            ? customZaVino.map(u => u.sirId)
            : (uparivanjeVinaById[vinoId] || []);

        const lista = sirevi
            .filter(s => ids.includes(s.id))
            .map(s => s.naziv);

        return lista.length ? lista.join(", ") : "-nema preporuke-";
    }

    function getSireviObjekti(vinoId) {
        const customZaVino = custom.filter(u => u.vinoId === vinoId);

        const ids = customZaVino.length > 0
            ? customZaVino.map(u => u.sirId)
            : (uparivanjeVinaById[vinoId] || []);

        return sirevi.filter(s => ids.includes(s.id));
    }

    function getScore(vino, sirevi) {
        let score = 0;

        sirevi.forEach(sir => {

            if (vino.tip_id === 1 && sir.tip_id === 3) score += 2;
            if (vino.tip_id === 1 && sir.tip_id === 1) score -= 1;

            if (vino.tip_id === 2 && sir.intezitet_id === 1) score += 2;
            if (vino.tip_id === 2 && sir.intezitet_id === 3) score -= 1;

            if (vino.slatkoca_id === 4 && sir.tip_id === 4) score += 3;
            if (vino.slatkoca_id === 1 && sir.tip_id === 4) score -= 2;

            if (vino.tijelo_id === 3 && sir.intezitet_id === 3) score += 2;
            if (vino.tijelo_id === 1 && sir.intezitet_id === 3) score -= 2;

            const alkohol = (vino.alkohol_min + vino.alkohol_max) / 2;
            if (alkohol > 14 && sir.intezitet_id === 3) score += 1;
            if (alkohol < 10 && sir.intezitet_id === 3) score -= 1;

            if (vino.tip_id === 3 && sir.tip_id === 1) score += 1;
            if (vino.tip_id === 4 && sir.tip_id !== 4) score -= 1;
        });

        return score;
    }

    function getOcjena(vino, sirevi) {
        const score = getScore(vino, sirevi);

        if (score >= 6) return "A";
        if (score >= 2) return "B";
        return "C";
    }

    function getBojaVina(vinoId) {
        return VinaBoje[vinoId]?.hex || "#ccc";
    }

    function obrisi(vinoId) {
        if (!confirm("Sigurno obrisati?")) return;
        setVina(prev => prev.filter(v => v.id !== vinoId));
    }

    const filtriranaVina = useMemo(() => {
        const p = pojam.toLowerCase();

        return vina.filter(v => {
            const sireviText = getSirevi(v.id).toLowerCase();

            return (
                v.naziv?.toLowerCase().includes(p) ||
                sireviText.includes(p)
            );
        });
    }, [vina, pojam, sirevi, custom]);

    function handleSort(key) {
        let direction = "asc";

        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        } else if (sortConfig.key === key && sortConfig.direction === "desc") {
            direction = null;
        }

        setSortConfig({ key, direction });
    }

    function getSortValue(vino, key) {
        switch (key) {
            case "naziv":
                return vino.naziv;
            case "ocjena":
                return getOcjena(vino, getSireviObjekti(vino.id));
            case "sirevi":
                return getSirevi(vino.id);
            default:
                return vino[key] ?? "";
        }
    }

    const sortedVina = useMemo(() => {
        if (!sortConfig.direction) return filtriranaVina;

        return [...filtriranaVina].sort((a, b) => {
            let aValue = getSortValue(a, sortConfig.key);
            let bValue = getSortValue(b, sortConfig.key);

            if (aValue == null) aValue = "";
            if (bValue == null) bValue = "";

            if (typeof aValue === "string") {
                return sortConfig.direction === "asc"
                    ? aValue.localeCompare(bValue, "hr")
                    : bValue.localeCompare(aValue, "hr");
            }

            return sortConfig.direction === "asc"
                ? aValue - bValue
                : bValue - aValue;
        });
    }, [filtriranaVina, sortConfig]);

    function getSortIcon(key) {
        if (sortConfig.key !== key || !sortConfig.direction) return <FaSort />;
        return sortConfig.direction === "asc" ? <FaSortUp /> : <FaSortDown />;
    }

    let poruka;

    if (vina.length === 0) {
        poruka = "Nema učitanih vina - stoga nema ni uparivanja";
    } else {
        const brojUspjesnih = vina.filter(v =>
            getSirevi(v.id) !== "-nema preporuke-"
        ).length;

        const opis = brojUspjesnih === vina.length ? "svih" : "samo";

        poruka = (
            <>
                Učitano ukupno <strong>{vina.length}</strong> vina - i uspješno upareno {opis} <strong>{brojUspjesnih}</strong>.
            </>
        );
    }

    return (
        <div className="mt-4">

            <div className="d-flex justify-content-between align-items-center mb-3 mt-3 w-100">

                <h4>Popis uparenih vina</h4>

                <input
                    type="text"
                    placeholder="Traži vino ili sir..."
                    className="form-control w-25"
                    style={{
                        backgroundColor: "lightgrey",
                        border: "2px solid grey"
                    }}
                    value={pojam}
                    onChange={(e) => setPojam(e.target.value)}
                />
            </div>

            <Table bordered striped hover className="align-middle">

                <thead>
                    <tr>
                        <th onClick={() => handleSort("naziv")} style={{ cursor: "pointer" }}>
                            Vino {getSortIcon("naziv")}
                        </th>

                        <th>Boja</th>

                        <th onClick={() => handleSort("sirevi")} style={{ cursor: "pointer" }}>
                            Sirevi {getSortIcon("sirevi")}
                        </th>

                        <th onClick={() => handleSort("ocjena")} style={{ cursor: "pointer" }}>
                            Ocjena {getSortIcon("ocjena")}
                        </th>

                        <th>Akcija</th>
                    </tr>
                </thead>

                <tbody>
                    {sortedVina.map(vino => (
                        <tr key={vino.id}>
                            <td>{vino.naziv}</td>

                            <td className="color-cell">
                                <span
                                    className="color-dot"
                                    style={{ backgroundColor: getBojaVina(vino.id) }}
                                />
                            </td>

                            <td>{getSirevi(vino.id)}</td>

                            <td className="text-center">
                                {(() => {
                                    const ocjena = getOcjena(vino, getSireviObjekti(vino.id));

                                    return (
                                        <span
                                            className="badge px-3 py-2"
                                            style={{
                                                fontSize: "1.4rem",
                                                borderRadius: "6px",
                                                minWidth: "60px",
                                                display: "inline-block",
                                                textAlign: "center",
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
                            </td>
                        </tr>
                    ))}
                </tbody>

            </Table>

            <p className="text-muted">{poruka}</p>
        </div>
    );
}