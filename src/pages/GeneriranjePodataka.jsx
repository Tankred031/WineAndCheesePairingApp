import VinaService from "../services/vina/VinaService";
import SireviService from "../services/sirevi/SireviService";
import OperaterService from "../services/operateri/OperaterService";
import { useState } from "react";
import { faker } from "@faker-js/faker";
faker.locale = "hr";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { PrefixStorage, DATA_SOURCE } from "../constants";
import { operateri } from "../services/operateri/OperaterPodaci";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

import VinaServiceMemorija from "../services/vina/VinaServiceMemorija";
import SireviServiceMemorija from "../services/sirevi/SireviServiceMemorija";
import ZanimljivostiServiceMemorija from "../services/zanimljivosti/ZanimljivostiServiceMemorija";
import OperaterServiceMemorija from "../services/operateri/OperaterServiceMemorija";

import VinaServiceFireBase from "../services/vina/VinaServiceFirebase";
import SireviServiceFireBase from "../services/sirevi/SireviServiceFirebase";
import ZanimljivostiServiceFireBase from "../services/zanimljivosti/ZanimljivostiServiceFirebase";
import OperaterServiceFireBase from "../services/operateri/OperaterServiceFirebase";


export default function GeneriranjePodataka() {


    const [brojVina, setBrojVina] = useState(10);
    const [brojSireva, setBrojSireva] = useState(12);
    const [brojOperatera, setBrojOperatera] = useState(5);
    const [poruka, setPoruka] = useState(null);
    const [loading, setLoading] = useState(false);

    const koristiLocalStorage =
        localStorage.getItem("dataSource") === "localStorage"

    const koristiFirebase =
        localStorage.getItem("dataSource") === "firebase"

    // =========================================
    // GENERIRANJE VINA
    // =========================================

    const generirajVina = async (broj) => {

        const sorte = [
            "Pinotage",
            "Merlot",
            "Pinot Noir",
            "Chardonnay",
            "Chenin Blanc",
            "Riesling",
            "Syrah",
            "Malbec",
            "Graševina",
            "Plavac Mali",
            "Mourverdre",
            "Debit",
            "Laški Rizling",
            "Šipon",
            "Mataro",
            "Cabernet Franc",
            "Babić",
            "Alicante Bouchet",
            "Pošip",
            "Marselan",
            "Cinsault",
            "Ugni Blanc",
            "Pinot Meunier",
            "Nero D'Avola"
        ];

        const regije = [
            "Istra",
            "Dalmacija",
            "Slavonija",
            "Bordeaux",
            "Toskana",
            "Rioja",
            "Napa Valley",
            "Burgundy",
            "Baranja"
        ];

        const godine = [2018, 2019, 2020, 2021, 2022, 2023];

        const oznake = [
            "Reserve",
            "Grand",
            "Selection",
            "Premium"
        ];

        const generirajNaziv = (i) => {

            const baza =
                `${sorte[i % sorte.length]}, ` +
                `${regije[i % regije.length]} ` +
                `${godine[i % godine.length]}`;

            if (i < sorte.length) {
                return baza;
            }

            return `${baza} ${faker.helpers.arrayElement(oznake)}`;
        };

        for (let i = 0; i < broj; i++) {

            const tip_id = String(
                faker.number.int({
                    min: 1,
                    max: 5
                })
            );

            const alkoholMin =
                tip_id === "2"
                    ? faker.number.float({
                        min: 8,
                        max: 11,
                        multipleOf: 0.1
                    })
                    : faker.number.float({
                        min: 11,
                        max: 14,
                        multipleOf: 0.1
                    });

            const alkoholMax =
                alkoholMin +
                faker.number.float({
                    min: 1,
                    max: 3,
                    multipleOf: 0.1
                });

            await VinaService.dodaj({

                naziv: generirajNaziv(i),
                tip_id: tip_id,
                regija: faker.helpers.arrayElement(regije),
                temperatura_min: faker.number.int({
                    min: 6,
                    max: 12
                }),
                temperatura_max: faker.number.int({
                    min: 13,
                    max: 18
                }),
                slatkoca_id: String(
                    faker.number.int({
                        min: 1,
                        max: 4
                    })
                ),
                arome: faker.word.words(3),
                tijelo_id: String(faker.number.int({
                    min: 1,
                    max: 3
                })
                ),

                alkohol_min: alkoholMin,
                alkohol_max: alkoholMax
            });
        }
    };



    // =========================================
    // GENERIRANJE SIREVA
    // =========================================

    const generirajSireve = async (broj) => {

        const naziviSireva = [
            "Raclette",
            "Ossau-Iraty",
            "Mont d'Or",
            "Vacherin Fribourgeois",
            "Appenzeller",
            "Caciocavallo",
            "Queso Cabrales",
            "Mahón",
            "Red Leicester",
            "Paneer",
            "Mascarpone",
            "Emmental",
            "Gruyere",
            "Comte",
            "Pecorino",
            "Manchego",
            "Halloumi",
            "Paški sir",
            "Beaufort",
            "Chaource",
            "Cantal",
            "Reggianito",
            "Kefalotyri"
        ];

        const dodatci = [
            "Classic",
            "Reserve",
            "Premium",
            "Aged",
            "Bio"
        ];

        const okusi = [
            "orašasto, blago slano",
            "kremasto, mliječno",
            "pikantno, intenzivno",
            "zemljano, gljivasto",
            "maslac, blago slatko",
            "dimljeno, bogato",
            "svježe, blago kiselo",
            "aromatično, puno",
            "slano, izraženo",
            "voćno, lagano"
        ];

        const generirajNaziv = (i) => {

            if (i < naziviSireva.length) {
                return naziviSireva[i];
            }

            const baza =
                naziviSireva[i % naziviSireva.length];

            const dodatak =
                faker.helpers.arrayElement(dodatci);

            return `${baza} ${dodatak} ${Math.floor(i / naziviSireva.length)}`;
        };

        for (let i = 0; i < broj; i++) {

            await SireviService.dodaj({

                naziv: generirajNaziv(i),

                tip_id: String(
                    faker.number.int({
                        min: 1,
                        max: 5
                    })
                ),

                vrsta_id: String(
                    faker.number.int({
                        min: 1,
                        max: 4
                    })
                ),

                zrenje_id: String(
                    faker.number.int({
                        min: 1,
                        max: 3
                    })
                ),

                regija: faker.location.city(),

                intenzitet_id: String(
                    faker.number.int({
                        min: 1,
                        max: 3
                    })
                ),

                masnoca_id: String(
                    faker.number.int({
                        min: 1,
                        max: 3
                    })
                ),

                okus: faker.helpers.arrayElement(okusi)
            });
        }
    };



    // =========================================
    // GENERIRANJE OPERATERA
    // =========================================

    const generirajOperatere = async (broj) => {

        // DOHVATI SVE OPERATERE
        const rezultat = await OperaterService.get();

        const sviOperateri = rezultat.data;

        // OBRIŠI POSTOJEĆEG ADMINA AKO POSTOJI
        const adminOperater = sviOperateri.find(
            op => op.email === "admin@edunova.hr"
        );

        if (adminOperater) {

            await OperaterService.obrisi(
                adminOperater.sifra
            );
        }

        // DODAJ ADMINA
        await OperaterService.dodaj({

            email: "admin@edunova.hr",
            lozinka: "Edunova123!",
            uloga: "admin"
        });



        // GENERIRAJ OSTALE OPERATERE
        for (let i = 0; i < broj; i++) {

            await OperaterService.dodaj({

                // ČISTI I PREDVIDLJIVI EMAILOVI
                email: `korisnik${i + 1}@test.hr`,
                lozinka: "Edunova123!",
                uloga: "operater"
            });
        }
    };



    // =========================================
    // HANDLERI - GENERIRANJE
    // =========================================

    const handleGenerirajVina = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            await generirajVina(brojVina);

            setPoruka({
                tip: "success",
                tekst: "Vina generirana!"
            });

        } catch {

            setPoruka({
                tip: "danger",
                tekst: "Greška kod vina"
            });
        }

        setLoading(false);
    };



    const handleGenerirajSireve = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            await generirajSireve(brojSireva);

            setPoruka({
                tip: "success",
                tekst: "Sirevi generirani!"
            });

        } catch {

            setPoruka({
                tip: "danger",
                tekst: "Greška kod sireva"
            });
        }

        setLoading(false);
    };



    const handleGenerirajOperatere = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            await generirajOperatere(brojOperatera);

            setPoruka({
                tip: "success",
                tekst: "Operateri generirani!"
            });

        } catch {

            setPoruka({
                tip: "danger",
                tekst: "Greška kod operatera"
            });
        }

        setLoading(false);
    };



    // =========================================
    // BRISANJE VINA
    // =========================================

    const handleObrisiVina = async () => {

        if (!window.confirm(
            "Obrisati sva vina?"
        )) return;

        setLoading(true);

        try {

            const res = await VinaService.get();

            for (const v of res.data) {

                // NE sifra -> id
                await VinaService.obrisi(v.id);
            }

            setPoruka({
                tip: "success",
                tekst: "Sva vina obrisana!"
            });

        } catch {

            setPoruka({
                tip: "danger",
                tekst: "Greška kod brisanja vina"
            });

        } finally {

            setLoading(false);
        }
    };



    // =========================================
    // BRISANJE SIREVA
    // =========================================

    const handleObrisiSireve = async () => {

        if (!window.confirm(
            "Obrisati sve sireve?"
        )) return;

        setLoading(true);

        try {

            const res = await SireviService.get();

            for (const s of res.data) {

                // NE sifra -> id
                await SireviService.obrisi(s.id);
            }

            setPoruka({
                tip: "success",
                tekst: "Svi sirevi obrisani!"
            });

        } catch {

            setPoruka({
                tip: "danger",
                tekst: "Greška kod brisanja sireva"
            });

        } finally {

            setLoading(false);
        }
    };

    // =========================================
    // BRISANJE OPERATERA
    // =========================================

    const handleObrisiOperatere = async () => {

        if (!window.confirm(
            "Obrisati sve operatere?"
        )) return;

        setLoading(true);

        try {

            const res =
                await OperaterService.get();

            for (const o of res.data) {

                await OperaterService.obrisi(
                    o.sifra
                );
            }

            setPoruka({
                tip: "success",
                tekst: "Svi operateri obrisani!"
            });

        } catch (e) {

            console.error(e);

            setPoruka({
                tip: "danger",
                tekst: "Greška kod brisanja operatera"
            });

        } finally {

            setLoading(false);
        }
    };


    // =========================================
    // PRETAKANJE U LOCAL STORAGE
    // =========================================

    const handleMemorijaULocalStorage = async () => {

        if (!window.confirm(
            "Jesi siguran?"
        )) return;

        setLoading(true);

        setPoruka(null);

        try {

            // DOHVAT PODATAKA
            const vina = await VinaService.get();

            const sirevi = await SireviService.get();

            // LOCAL STORAGE
            localStorage.setItem(
                PrefixStorage.VINA,
                JSON.stringify(vina.data)
            );

            localStorage.setItem(
                PrefixStorage.SIREVI,
                JSON.stringify(sirevi.data)
            );

            localStorage.setItem(
                PrefixStorage.OPERATERI,
                JSON.stringify(operateri)
            );

            setPoruka({
                tip: "success",
                tekst: "Podaci prebačeni u localStorage!"
            });

        } catch {

            setPoruka({
                tip: "danger",
                tekst: "Greška kod pretakanja"
            });

        } finally {

            setLoading(false);
        }
    };


    const handleMemorijaUFirebase = async () => {

        if (!window.confirm(
            'Jesi siguran da želiš pretočiti podatke u Firebase?'
        )) return;

        setLoading(true);
        setPoruka(null);

        try {

            // =========================================
            // VINA
            // =========================================

            const vina =
                await VinaServiceMemorija.get();

            let sifreVina = [];

            for (const vino of vina.data) {

                const vinoBezId = { ...vino };

                delete vinoBezId.id;

                const fb = await VinaServiceFireBase.dodaj(
                    vinoBezId
                );
                console.log(fb.data.id);
                sifreVina.push({ sifram: vino.id, sifraf: fb.data.id })
            }

            // =========================================
            // SIREVI
            // =========================================

            const sirevi =
                await SireviServiceMemorija.get();

            let sifreSirevi = [];

            for (const sir of sirevi.data) {

                const sirBezId = { ...sir };

                delete sirBezId.id;

                const fb = await SireviServiceFireBase.dodaj(
                    sirBezId
                );
                console.log(fb.data.id);
                sifreSirevi.push({ sifram: sir.id, sifraf: fb.data.id })
            }


            // =========================================
            // ZANIMLJIVOSTI
            // =========================================

            const clanci =
                await ZanimljivostiServiceMemorija.get();

            let sifraClanci = [];

            for (const clanak of clanci.data) {

                const clanakBezId = { ...clanak };

                delete clanakBezId.id;

                const fb = await ZanimljivostiServiceFireBase.dodaj(
                    clanakBezId



                );
                console.log(fb.data.id);
                sifraClanci.push({
                    sifram: clanak.id,
                    sifraf: fb.data.id
                })
            }

            // =========================================
            // OPERATERI
            // =========================================

            const operateri =
                await OperaterServiceMemorija.get();

            let sifraOperateri = [];

            for (const operater of operateri.data) {

                const fb = await OperaterServiceFireBase.dodaj({

                    email: operater.email,

                    uloga: operater.uloga,

                    lozinka:
                        operater.lozinka || "test123"
                });
                console.log(fb.data.id);
                sifraOperateri.push({ sifram: operater.id, sifraf: fb.data.id })
            }

            setPoruka({
                tip: "success",
                tekst: "Podaci uspješno prebačeni u Firebase!"
            });

        } catch (e) {

            console.error(e);

            setPoruka({
                tip: "danger",
                tekst: "Greška kod pretakanja u Firebase"
            });

        } finally {

            setLoading(false);
        }
    };

    return (

        <Container className="mt-4">

            <h1>
                Generiranje podataka
            </h1>

            <p className="text-muted">
                Generiranje testnih podataka za vina, sireve i operatere.
            </p>



            {/* ALERT PORUKA */}

            {poruka && (

                <Alert
                    variant={poruka.tip}
                    dismissible
                    onClose={() => setPoruka(null)}
                >
                    {poruka.tekst}
                </Alert>
            )}


            <Row>
                {/* VINA */}

                <Col md={4}>
                    <Form onSubmit={handleGenerirajVina}>
                        <Form.Group className="mb-3">

                            <Form.Label>
                                Broj vina
                            </Form.Label>

                            <Form.Control
                                type="number"
                                min="1"
                                max="50"
                                value={brojVina}
                                onChange={(e) =>
                                    setBrojVina(
                                        parseInt(e.target.value)
                                    )
                                }
                                disabled={loading}
                            />

                            <Form.Text className="text-muted">
                                Unesite broj vina
                            </Form.Text>

                        </Form.Group>

                        <Button
                            variant="primary"
                            type="submit"
                            disabled={loading}
                            className="w-100"
                        >
                            {loading
                                ? "Generiranje..."
                                : "Generiraj vina"}
                        </Button>
                    </Form>
                </Col>



                {/* SIREVI */}

                <Col md={4}>
                    <Form onSubmit={handleGenerirajSireve}>
                        <Form.Group className="mb-3">

                            <Form.Label>
                                Broj sireva
                            </Form.Label>

                            <Form.Control
                                type="number"
                                min="1"
                                max="200"
                                value={brojSireva}
                                onChange={(e) =>
                                    setBrojSireva(
                                        parseInt(e.target.value)
                                    )
                                }
                                disabled={loading}
                            />

                            <Form.Text className="text-muted">
                                Unesite broj sireva
                            </Form.Text>
                        </Form.Group>

                        <Button
                            variant="primary"
                            type="submit"
                            disabled={loading}
                            className="w-100"
                        >
                            {loading
                                ? "Generiranje..."
                                : "Generiraj sireve"}
                        </Button>
                    </Form>
                </Col>



                {/* OPERATERI */}

                <Col md={4}>
                    <Form onSubmit={handleGenerirajOperatere}>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                Broj operatera
                            </Form.Label>

                            <Form.Control
                                type="number"
                                min="1"
                                max="50"
                                value={brojOperatera}
                                onChange={(e) =>
                                    setBrojOperatera(
                                        parseInt(e.target.value)
                                    )
                                }
                                disabled={loading}
                            />

                            <Form.Text className="text-muted">
                                Unesite broj operatera
                            </Form.Text>

                        </Form.Group>

                        <Button
                            variant="primary"
                            type="submit"
                            disabled={loading}
                            className="w-100"
                        >
                            {loading
                                ? "Generiranje..."
                                : "Generiraj operatere"}
                        </Button>
                    </Form>
                </Col>
            </Row>



            {/* UPOZORENJE */}

            <Alert
                variant="warning"
                className="mt-4"
            >
                <strong>
                    Upozorenje:
                </strong>

                {" "}
                Ove akcije dodaju nove podatke u postojeće.
            </Alert>

            <hr className="my-4" />

            {/* BRISANJE */}
            <h3>
                Brisanje podataka
            </h3>

            <p className="text-muted">
                Brisanje svih podataka iz baze.
            </p>



            <Row className="mt-3 align-items-start">

                {/* PRVI RED - BRISANJE */}

                <Row className="mt-3">

                    <Col md={4}>
                        <Button
                            variant="danger"
                            onClick={handleObrisiVina}
                            disabled={loading}
                            className="w-100 mb-2"
                        >
                            {loading
                                ? "Brisanje..."
                                : "Obriši sva vina"}
                        </Button>
                    </Col>

                    <Col md={4}>
                        <Button
                            variant="danger"
                            onClick={handleObrisiSireve}
                            disabled={loading}
                            className="w-100 mb-2"
                        >
                            {loading
                                ? "Brisanje..."
                                : "Obriši sve sireve"}
                        </Button>
                    </Col>

                    <Col md={4}>
                        <Button
                            variant="danger"
                            onClick={handleObrisiOperatere}
                            disabled={loading}
                            className="w-100 mb-2"
                        >
                            {loading
                                ? "Brisanje..."
                                : "Obriši sve operatere"}
                        </Button>
                    </Col>

                </Row>



                {/* DRUGI RED - PRETAKANJE */}

                <Row className="mt-2 justify-content-end">

                    <Col md={6}>

                        <OverlayTrigger
                            placement="top"
                            overlay={koristiLocalStorage ? (
                                <Tooltip>
                                    Pretakanje nije moguće jer ste već u localStorage modu
                                </Tooltip>
                            ) : (
                                <></>
                            )}
                        >
                            <span className="d-block">

                                <Button
                                    variant={
                                        koristiLocalStorage
                                            ? "secondary"
                                            : "success"
                                    }
                                    onClick={handleMemorijaULocalStorage}
                                    disabled={loading || koristiLocalStorage}
                                    className="w-100 mb-2"
                                >
                                    {
                                        koristiLocalStorage
                                            ? "Već koristite localStorage"
                                            : "Pretoči u localStorage"
                                    }
                                </Button>

                            </span>
                        </OverlayTrigger>

                    </Col>



                    <Col md={6}>

                        <OverlayTrigger
                            placement="top"
                            overlay={koristiFirebase ? (
                                <Tooltip>
                                    Pretakanje nije moguće jer ste već u Firebase modu
                                </Tooltip>
                            ) : (
                                <></>
                            )}
                        >
                            <span className="d-block">

                                <Button
                                    variant={
                                        koristiFirebase
                                            ? "secondary"
                                            : "warning"
                                    }
                                    onClick={handleMemorijaUFirebase}
                                    disabled={loading || koristiFirebase}
                                    className="w-100 mb-2"
                                >
                                    {
                                        koristiFirebase
                                            ? "Već koristite Firebase"
                                            : "Pretoči u Firebase"
                                    }
                                </Button>

                            </span>
                        </OverlayTrigger>

                    </Col>

                </Row>
            </Row>



            {/* OPREZ */}

            <Alert
                variant="danger"
                className="mt-3"
            >
                <strong>
                    Oprez!
                </strong>

                {" "}
                Brisanje podataka je trajna akcija.
            </Alert>
        </Container>
    );
}