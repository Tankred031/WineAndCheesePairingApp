import VinaService from "../services/vina/VinaService";
import SireviService from "../services/sirevi/SireviService";
import { useState } from "react";
import { faker } from '@faker-js/faker'
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap"

export default function GeneriranjePodataka() {
    const [brojVina, setBrojVina] = useState(10);
    const [brojSireva, setBrojSireva] = useState(12);
    const [brojUparivanja, setUparivanja] = useState(10);
    const [poruka, setPoruka] = useState(null);
    const [loading, setLoading] = useState(false);


    // Faker na hrvatskom jeziku
    const faker = new faker({
        locale: [hr]
    });

    const generirajVina = async (broj) => {

        for (let i = 0; i < broj; i++) {
            await VinaService.dodaj({
                naziv: faker.word.words(2),
                tip_id: faker.number.int({ min: 1, max: 5 }),
                regija: faker.location.city(),
                temperatura_min: faker.number.int({ min: 6, max: 12 }),
                temperatura_max: faker.number.int({ min: 13, max: 18 }),
                slatkoca_id: faker.number.int({ min: 1, max: 4 }),
                arome: faker.word.words(3),
                tijelo: faker.helpers.arrayElement(["lagano", "srednje", "puno"]),
                alkohol_min: faker.number.float({ min: 8, max: 12, precision: 0.1 }),
                alkohol_max: faker.number.float({ min: 12, max: 16, precision: 0.1 })
            })
        }
    }


    const generirajSireve = async (broj) => {

        for (let i = 0; i < broj; i++) {
            await SireviService.dodaj({
                naziv: faker.word.words(2),
                tip: faker.helpers.arrayElement(["mekani", "polutvrdi", "tvrdi", "plavi"]),
                vrsta_id: faker.number.int({ min: 1, max: 4 }),
                zrenje: faker.helpers.arrayElement(["kratko", "srednje", "dugo"]),
                regija: faker.location.city(),
                intezitet: faker.helpers.arrayElement(["blag", "srednji", "jak"]),
                masnoca_id: faker.number.int({ min: 1, max: 3 }),
                okus: faker.word.words(3)
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
                                Unesite broj sireva (1-200)
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