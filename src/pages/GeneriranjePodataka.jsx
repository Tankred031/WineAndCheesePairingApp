import VinaService from "../services/vina/VinaService";
import SireviService from "../services/sirevi/SireviService";
import { useState } from "react";
import { faker } from '@faker-js/faker'
faker.locale = 'hr'
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap"

export default function GeneriranjePodataka() {
    const [brojVina, setBrojVina] = useState(10);
    const [brojSireva, setBrojSireva] = useState(12);
    const [brojUparivanja, setUparivanja] = useState(10);
    const [poruka, setPoruka] = useState(null);
    const [loading, setLoading] = useState(false);

    /*
    // Faker na hrvatskom jeziku
    const faker = new Faker({
        locale: [hr]
    });
    */

    
    const generirajVina = async (broj) => {

        const sorte = [
            "Pinotage", "Merlot", "Pinot Noir", "Chardonnay",
            "Chenin Blanc", "Riesling", "Syrah", "Malbec",
            "Graševina", "Plavac Mali", "Mourverdre", "Debit",
            "Laški Rizling", "Šipon", "Mataro", "Cabernet Franc",
            "Babić", "Alicante Bouchet", "Pošip", "Marselan",
            "Cinsault", "Ugni Blanc", "Pinot Meunier", "Nero D'Avola"
        ];

        const regije = [
            "Istra", "Dalmacija", "Slavonija", "Bordeaux",
            "Toskana", "Rioja", "Napa Valley", "Burgundy", "Baranja"
        ];

        const godine = [2018, 2019, 2020, 2021, 2022, 2023];

        const oznake = ["Reserve", "Grand", "Selection", "Premium"];

        // generator naziva
        const generirajNaziv = (i) => {
            const baza = `${sorte[i % sorte.length]}, ${regije[i % regije.length]
                } ${godine[i % godine.length]}`;

            if (i < sorte.length) {
                return baza;
            }

            return `${baza} ${faker.helpers.arrayElement(oznake)} ${Math.floor(i / sorte.length)}`;
        };

        for (let i = 0; i < broj; i++) {


            const tip_id = faker.number.int({ min: 1, max: 5 });

            const alkoholMin = tip_id === 2 // bijelo
                ? faker.number.float({ min: 8, max: 11, multipleOf: 0.1 })
                : faker.number.float({ min: 11, max: 14, multipleOf: 0.1 });

            const alkoholMax = alkoholMin + faker.number.float({ min: 1, max: 3, multipleOf: 0.1 });

            await VinaService.dodaj({
                naziv: generirajNaziv(i),

                tip_id: tip_id,
                regija: faker.helpers.arrayElement(regije),

                temperatura_min: faker.number.int({ min: 6, max: 12 }),
                temperatura_max: faker.number.int({ min: 13, max: 18 }),

                slatkoca_id: faker.number.int({ min: 1, max: 4 }),

                arome: faker.word.words(3),
                tijelo: faker.helpers.arrayElement(["lagano", "srednje", "puno"]),

                alkohol_min: alkoholMin,
                alkohol_max: alkoholMax
            })
        }
    }


    const generirajSireve = async (broj) => {

        const naziviSireva = [
            "Raclette", "Ossau-Iraty", "Mont d'Or", "Vacherin Fribourgeois",
            "Appenzeller", "Caciocavallo", "Queso Cabrales", "Mahón",
            "Red Leicester", "Paneer", "Mascarpone", "Emmental",
            "Gruyere", "Comte", "Pecorino", "Manchego",
            "Halloumi", "Paški sir", "Beaufort", "Chaource",
            "Cantal", "Reggianito", "Kefalotyri"
        ];

        const dodatci = ["Classic", "Reserve", "Premium", "Aged", "Bio"];

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

            const baza = naziviSireva[i % naziviSireva.length];
            const dodatak = faker.helpers.arrayElement(dodatci);

            return `${baza} ${dodatak} ${Math.floor(i / naziviSireva.length)}`;
        };

        for (let i = 0; i < broj; i++) {
            await SireviService.dodaj({
                naziv: generirajNaziv(i),

                tip: faker.helpers.arrayElement(["mekani", "polutvrdi", "tvrdi", "plavi"]),
                vrsta_id: faker.number.int({ min: 1, max: 4 }),
                zrenje: faker.helpers.arrayElement(["kratko", "srednje", "dugo"]),
                regija: faker.location.city(),
                intezitet: faker.helpers.arrayElement(["blag", "srednji", "jak"]),
                masnoca_id: faker.number.int({ min: 1, max: 3 }),
                okus: faker.helpers.arrayElement(okusi)
            })
        }
    }

    const handleGenerirajVina = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            await generirajVina(brojVina)
            setPoruka({ tip: "success", tekst: "Vina generirana!" })
        } catch (e) {
            setPoruka({ tip: "danger", tekst: "Greška kod vina" })
        }

        setLoading(false)
    }

    const handleGenerirajSireve = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            await generirajSireve(brojSireva)
            setPoruka({ tip: "success", tekst: "Sirevi generirani!" })
        } catch (e) {
            setPoruka({ tip: "danger", tekst: "Greška kod sireva" })
        }

        setLoading(false)
    }

    const handleObrisiVina = async () => {
        const res = await VinaService.get()
        for (const v of res.data) {
            await VinaService.obrisi(v.id)
        }
    }

    const handleObrisiSireve = async () => {
        const res = await SireviService.get()
        for (const s of res.data) {
            await SireviService.obrisi(s.id)
        }
    }


    return (
        <Container className="mt-4">
            <h1>Generiranje podataka</h1>
            <p className="text-muted">
                Generiranje testnih podataka za vina, sireve i njihovo uparivanje.
            </p>

            {poruka && (
                <Alert variant={poruka.tip} dismissible onClose={() => setPoruka(null)}>
                    {poruka.tekst}
                </Alert>
            )}

            <Row>
                {/* VINA */}
                <Col md={4}>
                    <Form onSubmit={handleGenerirajVina}>
                        <Form.Group className="mb-3">
                            <Form.Label>Broj vina</Form.Label>
                            <Form.Control
                                type="number"
                                min="1"
                                max="50"
                                value={brojVina}
                                onChange={(e) => setBrojVina(parseInt(e.target.value))}
                                disabled={loading}
                            />
                            <Form.Text className="text-muted">
                                Unesite broj vina (1-50)
                            </Form.Text>
                        </Form.Group>
                        <Button
                            variant="primary"
                            type="submit"
                            disabled={loading}
                            className="w-100"
                        >
                            {loading ? 'Generiranje...' : 'Generiraj vina'}
                        </Button>
                    </Form>
                </Col>

                {/* SIREVI */}
                <Col md={4}>
                    <Form onSubmit={handleGenerirajSireve}>
                        <Form.Group className="mb-3">
                            <Form.Label>Broj sireva</Form.Label>
                            <Form.Control
                                type="number"
                                min="1"
                                max="200"
                                value={brojSireva}
                                onChange={(e) => setBrojSireva(parseInt(e.target.value))}
                                disabled={loading}
                            />
                            <Form.Text className="text-muted">
                                Unesite broj sireva (preporuka: do 100)
                            </Form.Text>
                        </Form.Group>
                        <Button
                            variant="primary"
                            type="submit"
                            disabled={loading}
                            className="w-100"
                        >
                            {loading ? 'Generiranje...' : 'Generiraj sireve'}
                        </Button>
                    </Form>
                </Col>


                {/* UPARIVANJA
                <Col md={4}>
                    <Form onSubmit={handleGenerirajPairing}>
                        <Form.Group className="mb-3">
                            <Form.Label>Broj uparivanja</Form.Label>
                            <Form.Control
                                type="number"
                                min="1"
                                max="100"
                                value={brojPairing}
                                onChange={(e) => setBrojPairing(parseInt(e.target.value))}
                                disabled={loading}
                            />
                            <Form.Text className="text-muted">
                                Unesite broj uparivanja (1-100)
                            </Form.Text>
                        </Form.Group>
                        <Button
                            variant="primary"
                            type="submit"
                            disabled={loading}
                            className="w-100"
                        >
                            {loading ? 'Generiranje...' : 'Generiraj uparivanja'}
                        </Button>
                    </Form>
                </Col> */}
            </Row>

            <Alert variant="warning" className="mt-3">
                <strong>Upozorenje:</strong> Ove akcije će dodati nove podatke u postojeće.
                Ako želite početi ispočetka, prvo obrišite postojeće podatke.
            </Alert>

            <hr className="my-4" />

            <h3>Brisanje podataka</h3>
            <p className="text-muted">
                Brisanje svih vina, sireva i uparivanja iz baze.
            </p>

            <Row className="mt-3">
                <Col md={4}>
                    <Button
                        variant="danger"
                        onClick={handleObrisiVina}
                        disabled={loading}
                        className="w-100 mb-2"
                    >
                        {loading ? 'Brisanje...' : 'Obriši sva vina'}
                    </Button>
                </Col>
                <Col md={4}>
                    <Button
                        variant="danger"
                        onClick={handleObrisiSireve}
                        disabled={loading}
                        className="w-100 mb-2"
                    >
                        {loading ? 'Brisanje...' : 'Obriši sve sireve'}
                    </Button>
                </Col>
                {/* <Col md={4}>
                    <Button
                        variant="danger"
                        onClick={handleObrisiPairing}
                        disabled={loading}
                        className="w-100 mb-2"
                    >
                        {loading ? 'Brisanje...' : 'Obriši sva uparivanja'}
                    </Button>
                </Col> */}
            </Row>

            <Alert variant="danger" className="mt-3">
                <strong>Oprez!</strong> Brisanje podataka je trajna akcija i ne može se poništiti.
            </Alert>
        </Container>
    );
}