import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VinaService from "../../services/vina/VinaService";
import SireviService from "../../services/sirevi/SireviService";
import UparivanjeCustomService from "../../services/uparivanje/UparivanjeCustomService";
import { uparivanjeSiraById } from "../../services/uparivanje/UparivanjeSiraPopis";
import useBreakpoint from "../../hooks/useBreakpoint";
import UparivanjeSirPregledGrid from "./UparivanjeSirPregledGrid";
import UparivanjeSirPregledTablica from "./UparivanjeSirPregledTablica";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

export default function UparivanjeSirPregled() {

    const [vina, setVina] = useState([]);
    const [sirevi, setSirevi] = useState([]);
    const [custom, setCustom] = useState([]);
    const [pojam, setPojam] = useState('');

    const navigate = useNavigate();
    const sirina = useBreakpoint();

    const [sortConfig, setSortConfig] = useState({
        key: 'naziv',
        direction: 'asc'
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

    function getVina(sirId) {
        const customZaSir = custom.filter(u => u.sirId === sirId);

        const ids = customZaSir.length > 0
            ? customZaSir.map(u => u.vinoId)
            : (uparivanjeSiraById[sirId] || []);

        const lista = vina
            .filter(v => ids.includes(v.id))
            .map(v => v.naziv);

        return lista.length ? lista.join(", ") : "-nema preporuke-";
    }

    function getVinaObjekti(sirId) {
        const customZaSir = custom.filter(u => u.sirId === sirId);

        const ids = customZaSir.length > 0
            ? customZaSir.map(u => u.vinoId)
            : (uparivanjeSiraById[sirId] || []);

        return vina.filter(v => ids.includes(v.id));
    }

    function obrisi(sirId) {
        if (!confirm("Sigurno obrisati?")) return;
        setSirevi(prev => prev.filter(s => s.id !== sirId));
    }

    const filtriraniSirevi = sirevi.filter(s => {
        const p = pojam.toLowerCase();
        return (
            s.naziv?.toLowerCase().includes(p) ||
            getVina(s.id).toLowerCase().includes(p)
        );
    });

    function handleSort(key) {
        let direction = 'asc';

        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        } else if (sortConfig.key === key && sortConfig.direction === 'desc') {
            direction = null;
        }

        setSortConfig({ key, direction });
    }

    function getSortValue(sir, key) {
        if (key === "vina") return getVina(sir.id);
        return sir[key] ?? "";
    }

    const sortedSirevi = () => {
        if (!sortConfig.direction) return filtriraniSirevi;

        return [...filtriraniSirevi].sort((a, b) => {
            let aValue = getSortValue(a, sortConfig.key);
            let bValue = getSortValue(b, sortConfig.key);

            if (typeof aValue === "string") {
                return sortConfig.direction === "asc"
                    ? aValue.localeCompare(bValue, "hr")
                    : bValue.localeCompare(aValue, "hr");
            }

            return sortConfig.direction === "asc"
                ? aValue - bValue
                : bValue - aValue;
        });
    };

    function getSortIcon(key) {
        if (sortConfig.key !== key || !sortConfig.direction) return <FaSort />;
        return sortConfig.direction === "asc" ? <FaSortUp /> : <FaSortDown />;
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

            {['xs', 'sm', 'md'].includes(sirina) ? (
                <UparivanjeSirPregledGrid
                    sirevi={sortedSirevi()}
                    getVina={getVina}
                    navigate={navigate}
                    obrisi={obrisi}
                />
            ) : (
                <UparivanjeSirPregledTablica
                    sirevi={sortedSirevi()}
                    handleSort={handleSort}
                    getSortIcon={getSortIcon}
                    getVina={getVina}
                    navigate={navigate}
                    obrisi={obrisi}
                />
            )}
        </div>
    );
}