import { IME_APLIKACIJE } from "../constants";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import VinaService from "../services/vina/VinaService";
import SireviService from "../services/sirevi/SireviService";
import UparivanjaCustomService from "../services/uparivanje/UparivanjeCustomService";
import { useState, useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { uparivanjeVinaById } from "../services/uparivanje/UparivanjeVinaPopis";

export default function Home() {

    const [brojVina, setBrojVina] = useState(0);
    const [brojSireva, setBrojSireva] = useState(0)
    const [brojUspjesnihUparivanja, setBrojUspjesnihUparivanja] = useState(0);
    const [animatedVina, setAnimatedVina] = useState(0);
    const [animatedSirevi, setAnimatedSirevi] = useState(0);
    const [animatedUspjesnihUparivanja, setAnimatedUspjesnihUparivanja] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const vinaRezultat = await VinaService.get();
                const sirevi = await SireviService.get();
                const uparivanja = await UparivanjaCustomService.get();

                setBrojVina(vinaRezultat.data.length);
                setBrojSireva(sirevi.data.length);
                const custom = uparivanja.data || [];

                const broj = vinaRezultat.data.filter(vino => {

                    const customZaVino = custom.filter(u => u.vinoId === vino.id);

                    const staticka = uparivanjeVinaById[vino.id] || [];

                    const ima = customZaVino.length > 0
                        ? customZaVino.some(u => u.sirId !== null)
                        : staticka.length > 0;

                    return ima;

                }).length;

                setBrojUspjesnihUparivanja(broj);
            } catch (error) {
                console.error('Greška pri dohvaćanju podataka:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (animatedVina < brojVina) {
            const timer = setTimeout(() => {
                setAnimatedVina(prev => Math.min(prev + 1, brojVina));
            }, 150);
            return () => clearTimeout(timer);
        }
    }, [animatedVina, brojVina]);

    useEffect(() => {
        if (animatedSirevi < brojSireva) {
            const timer = setTimeout(() => {
                setAnimatedSirevi(prev => Math.min(prev + 1, brojSireva));
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [animatedSirevi, brojSireva]);

    useEffect(() => {
        if (animatedUspjesnihUparivanja < brojUspjesnihUparivanja) {
            const timer = setTimeout(() => {
                setAnimatedUspjesnihUparivanja(prev => Math.min(prev + 1, brojUspjesnihUparivanja));
            }, 200);
            return () => clearTimeout(timer);
        }
    }, [animatedUspjesnihUparivanja, brojUspjesnihUparivanja]);

    return (
        <>
            <div style={{ textAlign: "center", marginTop: "80px" }}>
                <img src="/Wine&Cheese.png" alt="Wine & Cheese" className="home-logo" />
                <h1 className="h1">Dobrodošli na {IME_APLIKACIJE}</h1>
                <p style={{ fontSize: "18px", color: "#7B0323" }}>Pronađite savršenu kombinaciju vina i sira</p>
            </div>

            <div style={{ maxWidth: '300px', margin: 'auto' }}>
                <DotLottieReact
                    src="/bottle.lottie"

                    loop
                    autoplay

                />
            </div>

            <Row className="mt-4 justify-content-center">
                <Col md={4}>
                    <Card className="mb-3 shadow-lg border-0 statistikaPanel">
                        <Card.Body className="text-center">
                            <p className="text-white">Vina</p>
                            <div className="statistikaTekst">
                                {animatedVina}
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="mb-3 shadow-lg border-0 statistikaPanel">
                        <Card.Body className="text-center">
                            <p className="text-white">Sirevi</p>
                            <div className="statistikaTekst">
                                {animatedSirevi}
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="shadow-lg border-0 statistikaPanel">
                        <Card.Body className="text-center">
                            <p className="text-white">Uparivanja</p>
                            <div className="statistikaTekst">
                                {animatedUspjesnihUparivanja}
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
}