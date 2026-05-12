import VinaService from "../services/vina/VinaService";
import SireviService from "../services/sirevi/SireviService";
import { useState } from "react";
import { faker } from '@faker-js/faker'
faker.locale = 'hr'
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap"
import { PrefixStorage } from "../constants";
import OperaterService from "../services/operateri/OperaterService";
import { operateri} from "../services/operateri/OperaterPodaci";


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
            'Pinotage', 'Merlot', 'Pinot Noir', 'Chardonnay',
            'Chenin Blanc', 'Riesling', 'Syrah', 'Malbec',
            'Graševina', 'Plavac Mali', 'Mourverdre', 'Debit',
            'Laški Rizling', 'Šipon', 'Mataro', 'Cabernet Franc',
            'Babić', 'Alicante Bouchet', 'Pošip', 'Marselan',
            'Cinsault', 'Ugni Blanc', 'Pinot Meunier', "Nero D'Avola"
        ];

        const regije = [
            'Istra', 'Dalmacija', 'Slavonija', 'Bordeaux',
            'Toskana', 'Rioja', 'Napa Valley', 'Burgundy', 'Baranja'
        ];

        const godine = [2018, 2019, 2020, 2021, 2022, 2023];

        const oznake = ['Reserve', 'Grand', 'Selection', 'Premium'];

        const generirajNaziv = (i) => {

            const baza = `${sorte[i % sorte.length]}, ${regije[i % regije.length]
                } ${godine[i % godine.length]}`;

            if (i < sorte.length) {
                return baza;
            }

            return `${baza} ${faker.helpers.arrayElement(oznake)
                }`;
        };

        for (let i = 0; i < broj; i++) {

            const tip_id = String(
                faker.number.int({ min: 1, max: 5 })
            );

            const alkoholMin = tip_id === '2'
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
                    faker.number.int({ min: 1, max: 4 })
                ),

                arome: faker.word.words(3),

                tijelo: faker.helpers.arrayElement([
                    'lagano',
                    'srednje',
                    'puno'
                ]),

                alkohol_min: alkoholMin,
                alkohol_max: alkoholMax
            });
        }
    };


    const generirajSireve = async (broj) => {

        const naziviSireva = [
            'Raclette', 'Ossau-Iraty', "Mont d'Or",
            'Vacherin Fribourgeois',
            'Appenzeller', 'Caciocavallo',
            'Queso Cabrales', 'Mahón',
            'Red Leicester', 'Paneer',
            'Mascarpone', 'Emmental',
            'Gruyere', 'Comte',
            'Pecorino', 'Manchego',
            'Halloumi', 'Paški sir',
            'Beaufort', 'Chaource',
            'Cantal', 'Reggianito',
            'Kefalotyri'
        ];

        const dodatci = [
            'Classic',
            'Reserve',
            'Premium',
            'Aged',
            'Bio'
        ];

        const okusi = [
            'orašasto, blago slano',
            'kremasto, mliječno',
            'pikantno, intenzivno',
            'zemljano, gljivasto',
            'maslac, blago slatko',
            'dimljeno, bogato',
            'svježe, blago kiselo',
            'aromatično, puno',
            'slano, izraženo',
            'voćno, lagano'
        ];

        const generirajNaziv = (i) => {

            if (i < naziviSireva.length) {
                return naziviSireva[i];
            }

            const baza =
                naziviSireva[i % naziviSireva.length];

            const dodatak =
                faker.helpers.arrayElement(dodatci);

            return `${baza} ${dodatak} ${Math.floor(i / naziviSireva.length)
                }`;
        };

        for (let i = 0; i < broj; i++) {

            await SireviService.dodaj({

                naziv: generirajNaziv(i),

                tip_id: String(
                    faker.number.int({ min: 1, max: 5 })
                ),

                vrsta_id: String(
                    faker.number.int({ min: 1, max: 4 })
                ),

                zrenje_id: String(
                    faker.number.int({ min: 1, max: 3 })
                ),

                regija: faker.location.city(),

                intenzitet_id: String(
                    faker.number.int({ min: 1, max: 3 })
                ),

                masnoca_id: String(
                    faker.number.int({ min: 1, max: 3 })
                ),

                okus: faker.helpers.arrayElement(okusi)
            });
        }
    };
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

        if (!window.confirm(
            'Obrisati sva vina?'
        )) return;

        setLoading(true);

        try {

            const res = await VinaService.get();

            for (const v of res.data) {

                await VinaService.obrisi(v.id);
            }

            setPoruka({
                tip: 'success',
                tekst: 'Sva vina obrisana!'
            });

        } catch {

            setPoruka({
                tip: 'danger',
                tekst: 'Greška kod brisanja vina'
            });

        } finally {

            setLoading(false);
        }
    };
    const handleObrisiSireve = async () => {

        if (!window.confirm(
            'Obrisati sve sireve?'
        )) return;

        setLoading(true);

        try {

            const res = await SireviService.get();

            for (const s of res.data) {
                await SireviService.obrisi(s.id);
            }

            setPoruka({
                tip: 'success',
                tekst: 'Svi sirevi obrisani!'
            });

        } catch {

            setPoruka({
                tip: 'danger',
                tekst: 'Greška kod brisanja sireva'
            });

        } finally {

            setLoading(false);
        }
    };


    const handleMemorijaULocalStorage = async () => {
        if (!window.confirm('Jesi siguran?')) return;

        setLoading(true);
        setPoruka(null);

        try {
            // DOHVATI IZ MEMORY SERVICE-A
            const vina = await VinaService.get();
            const sirevi = await SireviService.get();
    
            // PRELIJ U LOCAL STORAGE
            localStorage.setItem(PrefixStorage.VINA, JSON.stringify(vina.data));
            localStorage.setItem(PrefixStorage.SIREVI, JSON.stringify(sirevi.data));
            localStorage.setItem(PrefixStorage.OPERATERI, JSON.stringify(operateri));

            setPoruka({
                tip: "success",
                tekst: "Podaci prebačeni u localStorage!"
            });

        } catch (err) {
            setPoruka({
                tip: "danger",
                tekst: "Greška kod pretakanja"
            });
        } finally {
            setLoading(false);
        }
    };

    

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
                <Col md={6}>
                    <Form onSubmit={handleGenerirajVina}>
                        <Form.Group className="mb-6">
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
                <Col md={6}>
                    <Form onSubmit={handleGenerirajSireve}>
                        <Form.Group className="mb-6">
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

            <Row className="mt-3 justify-content-end">
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

                <Col md={4}>
                    <Button
                        variant="success"
                        onClick={handleMemorijaULocalStorage}
                        disabled={loading}
                        className="w-100 mb-2"
                    >
                        Pretoči u localStorage
                    </Button>
                </Col>                
            </Row>

            <Alert variant="danger" className="mt-3">
                <strong>Oprez!</strong> Brisanje podataka je trajna akcija i ne može se poništiti.
            </Alert>
        </Container>
    );
}