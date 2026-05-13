import { IME_APLIKACIJE } from "../constants";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import VinaService from "../services/vina/VinaService";
import SireviService from "../services/sirevi/SireviService";
import UparivanjaCustomService from "../services/uparivanje/UparivanjeCustomService";
import { useState, useEffect } from "react";
import { Card, Carousel, Col, Row } from "react-bootstrap";
import { uparivanjeVinaById } from "../services/uparivanje/UparivanjeVinaPopis";
import { uparivanjeSiraById } from "../services/uparivanje/UparivanjeSiraPopis";
import { DATA_SOURCE } from "../constants";
import useAuth from "../hooks/useAuth";
import OperaterServiceLocalStorage from "../services/operateri/OperaterServiceLocalStorage";

export default function Home() {

    const vinograd1 = "/img/vineyard1.webp";
    const vinograd2 = "/img/vineyard2.webp";
    const podrum = "/img/vinecellar.webp";
    const sir = "/img/cheese-storage.webp";
    const vino = "/img/pouring2.jpg";
    const wine2 = "/img/wine2.jpg";
    const wine3 = "/img/wine3.jpg";

    const [brojVina, setBrojVina] = useState(0);
    const [brojSireva, setBrojSireva] = useState(0);
    const [brojUspjesnihUparivanja, setBrojUspjesnihUparivanja] = useState(0);
    const [brojUparenihSireva, setBrojUparenihSireva] = useState(0);
    const [animatedVina, setAnimatedVina] = useState(0);
    const [animatedSirevi, setAnimatedSirevi] = useState(0);
    const [animatedUspjesnihUparivanja, setAnimatedUspjesnihUparivanja] = useState(0);
    const [animatedUpareniSirevi, setAnimatedUpareniSirevi] = useState(0);
    const { isLoggedIn, logout } = useAuth();

    const promijeniIzvor = async (noviIzvor) => {

        let izvor = 'memorija';

        if (noviIzvor === 'localStorage') {

            const servis =
                await OperaterServiceLocalStorage.get();
            if (servis.data.length > 0) {
                izvor = noviIzvor;
            }
        }


        localStorage.setItem('dataSource', izvor);

        logout();

        window.location.reload();
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const vinaRezultat = await VinaService.get();
                const sirevi = await SireviService.get();
                const uparivanja = await UparivanjaCustomService.get();

                setBrojVina(vinaRezultat.data.length || 0);
                setBrojSireva(sirevi.data.length || 0);
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

                const brojSirevaUparenih = sirevi.data.filter(sir => {

                    const customZaSir = custom.filter(u => u.sirId === sir.id);

                    const staticka = uparivanjeSiraById[sir.id] || [];

                    const ima = customZaSir.length > 0
                        ? customZaSir.some(u => u.vinoId !== null)
                        : staticka.length > 0;

                    return ima;

                }).length;

                setBrojUparenihSireva(brojSirevaUparenih);

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
            }, 100);
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
                setAnimatedUspjesnihUparivanja(prev =>
                    Math.min(prev + 1, brojUspjesnihUparivanja));
            }, 150);
            return () => clearTimeout(timer);
        }
    }, [animatedUspjesnihUparivanja, brojUspjesnihUparivanja]);

    useEffect(() => {
        if (animatedUpareniSirevi < brojUparenihSireva) {

            const timer = setTimeout(() => {

                setAnimatedUpareniSirevi(prev =>
                    Math.min(prev + 1, brojUparenihSireva)
                );

            }, 150);

            return () => clearTimeout(timer);
        }

    }, [animatedUpareniSirevi, brojUparenihSireva]);

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>

            {isMobile ? (

                // MOBILNI HERO
                <div className="mobile-hero mt-5">
                    <img
                        src="/Wine-Olives.png"
                        alt="Wine_Olives"
                        className="home-logo"
                    />
                </div>

            ) : (

                // DESKTOP CAROUSEL
                <Carousel className="mt-5" interval={3000} controls={false}>

                    <Carousel.Item>
                        <div
                            className="carousel-bg"
                            style={{ backgroundImage: `url(${vinograd1})` }}
                        >
                        </div>
                    </Carousel.Item>

                    <Carousel.Item>
                        <div
                            className="carousel-bg"
                            style={{ backgroundImage: `url(${wine3})` }}
                        >
                        </div>
                    </Carousel.Item>

                    <Carousel.Item>
                        <div
                            className="carousel-bg"
                            style={{ backgroundImage: `url(${vinograd2})` }}
                        >
                        </div>
                    </Carousel.Item>

                    <Carousel.Item>
                        <div
                            className="carousel-bg"
                            style={{ backgroundImage: `url(${podrum})` }}
                        >
                        </div>
                    </Carousel.Item>

                    <Carousel.Item>
                        <div
                            className="carousel-bg"
                            style={{ backgroundImage: `url(${wine2})` }}
                        >
                        </div>
                    </Carousel.Item>

                    <Carousel.Item>
                        <div
                            className="carousel-bg"
                            style={{ backgroundImage: `url(${sir})` }}
                        >
                        </div>
                    </Carousel.Item>

                    <Carousel.Item>
                        <div
                            className="carousel-bg"
                            style={{ backgroundImage: `url(${vino})` }}
                        >
                        </div>
                    </Carousel.Item>

                </Carousel>

            )}

            <div style={{ textAlign: "center", marginTop: "80px" }}>
                <h1 className="h1">Dobrodošli na {IME_APLIKACIJE}</h1>
                <p style={{ fontSize: "18px", color: "#7B0323" }}>
                    Pronađite savršenu kombinaciju vina i sira
                </p>
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
                            <div className="statistikaTekst">{animatedVina}</div>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="mb-3 shadow-lg border-0 statistikaPanel">
                        <Card.Body className="text-center">
                            <p className="text-white">Sireva</p>
                            <div className="statistikaTekst">{animatedSirevi}</div>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="shadow-lg border-0 statistikaPanel">
                        <Card.Body className="text-center">
                            <p className="text-white">Uparena vina i sirevi</p>
                            <div className="statistikaTekst">
                                {animatedUspjesnihUparivanja} / {animatedUpareniSirevi}
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {isLoggedIn && (
                <>
                    <hr className="mt-5" />

                    <Row className="mb-5">
                        <Col className="text-center">

                            <h5>Izvor podataka:</h5>

                            <div className="btn-group">

                                <button
                                    onClick={() =>
                                        promijeniIzvor('memorija')
                                    }
                                    className={`btn ${DATA_SOURCE === 'memorija'
                                        ? 'btn-info'
                                        : 'btn-primary'
                                        }`}
                                >
                                    Memorija
                                </button>

                                <button
                                    onClick={() =>
                                        promijeniIzvor('localStorage')
                                    }
                                    className={`btn ${DATA_SOURCE === 'localStorage'
                                        ? 'btn-info'
                                        : 'btn-primary'
                                        }`}
                                >
                                    LocalStorage
                                </button>

                            </div>

                        </Col>
                    </Row>
                </>
            )}

        </>
    );
}