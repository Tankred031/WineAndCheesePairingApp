import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import VinaService from "../../services/vina/VinaService";
import SireviService from "../../services/sirevi/SireviService";
import UparivanjeCustomService from "../../services/uparivanje/UparivanjeCustomService";
import { uparivanjeVinaById } from "../../services/uparivanje/UparivanjeVinaPopis";
import { VinaBoje } from "../../services/vina/VinaBoje";
import useBreakpoint from "../../hooks/useBreakpoint";
import UparivanjeVinoPregledGrid from "./UparivanjeVinoPregledGrid";
import UparivanjeVinoPregledTablica from "./UparivanjeVinoPregledTablica";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import useLoading from "../../hooks/useLoading";


export default function UparivanjeVinoPregled() {

    const [vina, setVina] = useState([]);
    const [sirevi, setSirevi] = useState([]);
    const [custom, setCustom] = useState([]);
    const [pojam, setPojam] = useState("");

    const navigate = useNavigate();
    const sirina = useBreakpoint();

    const { showLoading, hideLoading } = useLoading();

    const [sortConfig, setSortConfig] = useState({
        key: "naziv",
        direction: "asc"
    });

    useEffect(() => {
        ucitaj();
    }, []);

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function ucitaj() {
        showLoading("Učitavam podatke...");

        try {
            const v = await VinaService.get();
            const s = await SireviService.get();
            const c = await UparivanjeCustomService.get();

            await delay(500);

            setVina(v.data || []);
            setSirevi(s.data || []);
            setCustom(c.data || []);
        } catch (err) {
            console.error("Greška kod učitavanja:", err);
        } finally {
            hideLoading();
        }
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

            if (vino.tip_id === 2 && sir.intenzitet_id === 1) score += 2;
            if (vino.tip_id === 2 && sir.intenzitet_id === 3) score -= 1;

            if (vino.slatkoca_id === 4 && sir.tip_id === 4) score += 3;
            if (vino.slatkoca_id === 1 && sir.tip_id === 4) score -= 2;

            if (vino.tijelo_id === 3 && sir.intenzitet_id === 3) score += 2;
            if (vino.tijelo_id === 1 && sir.intenzitet_id === 3) score -= 2;

            const alkohol = (vino.alkohol_min + vino.alkohol_max) / 2;
            if (alkohol > 14 && sir.intenzitet_id === 3) score += 1;
            if (alkohol < 10 && sir.intenzitet_id === 3) score -= 1;

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

    async function obrisi(vinoId) {
        if (!confirm("Sigurno obrisati?")) return;

        showLoading("Brišem uparivanje...");

        try {
            await delay(500);

            setVina(prev => prev.filter(v => v.id !== vinoId));
        } catch (err) {
            console.error("Greška kod brisanja:", err);
        } finally {
            hideLoading();
        }
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

                <h4 className="section-title">Popis uparenih vina</h4>

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

            {['xs', 'sm', 'md'].includes(sirina) ? (
                <UparivanjeVinoPregledGrid
                    vina={sortedVina}
                    getBojaVina={getBojaVina}
                    getSirevi={getSirevi}
                    getOcjena={getOcjena}
                    getSireviObjekti={getSireviObjekti}
                    navigate={navigate}
                    obrisi={obrisi}
                />
            ) : (
                <UparivanjeVinoPregledTablica
                    sortedVina={sortedVina}
                    handleSort={handleSort}
                    getSortIcon={getSortIcon}
                    getBojaVina={getBojaVina}
                    getSirevi={getSirevi}
                    getOcjena={getOcjena}
                    getSireviObjekti={getSireviObjekti}
                    navigate={navigate}
                    obrisi={obrisi}
                />
            )}

            <p className="text-muted">{poruka}</p>
        </div>
    );
}