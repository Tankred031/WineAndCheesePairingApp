import VinaService from "../services/vina/VinaService";
import SireviService from "../services/sirevi/SireviService";
import UparivanjeVinaService from "../services/uparivanje/UparivanjeVinaService";
import UparivanjeSirevaService from "../services/uparivanje/UparivanjeSiraService";
import { useState } from "react";

export default function GeneriranjePodataka() {
    const [brojVina, setBrojVina] = useState(10);
    const [brojSireva, setBrojSireva] = useState(12);
    const [brojUparivanja, setUparivanja] = useState(10);
    const [poruka, setPoruka] = useState(null);
    const [loading, setLoading] = useState(false);


    // Faker na hrvatskom jeziku
    const faker = new Faker({
        locale: [hr]
    });

    const generirajVina = async (broj) => {
        const naziviVina = [
            'Cabernet Franc',
            'Merlot',
            'Pinot Noir',
            'Syrah',
            'Zinfandel',
            'Malbec',
            'Tempranillo',
            'Grenache',
            'Sangiovese',
            'Barbera',
            'Chardonnay',
            'Sauvignon Blanc',
            'Riesling',
            'Pinot Grigio',
            'Gewürztraminer',
            'Viognier',
            'Prosecco',
            'Champagne',
            'Rosé',
            'Moscato'
        ];

        const tipovi = ['crveno', 'bijelo', 'rosé'];
        const regije = ['Toskana', 'Bordeaux', 'Rioja', 'Stellenbosch', 'Napa Valley'];
        const temperature = ['6-8°C', '8-10°C', '10-12°C', '14-16°C', '16-18°C'];
        const slatkoce = ['suho', 'polusuho', 'slatko'];
        const aromeLista = [
            'tamno voće, dim, zemljano',
            'citrusi, svježe',
            'jabuka, kruška',
            'vanilija, hrast',
            'crveno voće, začini'
        ];
        const tijela = ['lagano', 'srednje', 'puno', 'srednje do puno'];

        for (let i = 0; i < broj; i++) {
            await vinoService.dodaj({
                naziv: naziviVina[i % naziviVina.length] +
                    (i >= naziviVina.length ? ` ${Math.floor(i / naziviVina.length) + 1}` : ''),

                tip: faker.helpers.arrayElement(tipovi),
                regija: faker.helpers.arrayElement(regije),
                temperatura: faker.helpers.arrayElement(temperature),
                slatkoca: faker.helpers.arrayElement(slatkoce),
                arome: faker.helpers.arrayElement(aromeLista),
                tijelo: faker.helpers.arrayElement(tijela),

                alkohol: faker.number.float({ min: 9, max: 15, precision: 0.1 }).toFixed(1) + '%'
            });
        }


        const generirajSireve = async (broj) => {

            const tipovi = ['mekani', 'polutvrdi', 'tvrdi', 'plavi'];
            const vrste = ['kravlji', 'ovčji', 'kozji', 'miješani'];
            const zrenjeLista = ['kratko', 'srednje', 'dugo'];
            const regije = ['Île-de-France', 'Parma', 'Normandija', 'Švicarska', 'Nizozemska'];
            const intenziteti = ['blag', 'srednji', 'jak'];
            const masnoceLista = ['niske', 'srednje', 'visoke'];
            const okusi = [
                'maslac, blago gljivasto',
                'orah, pikantno',
                'kremasto, mliječno',
                'slanije, intenzivno',
                'zemljano, bogato'
            ];

            for (let i = 0; i < broj; i++) {
                const sir = {
                    naziv: naziviSireva[i % naziviSireva.length] +
                        (i >= naziviSireva.length ? ` ${Math.floor(i / naziviSireva.length) + 1}` : ''),

                    tip: faker.helpers.arrayElement(tipovi),
                    vrsta: faker.helpers.arrayElement(vrste),
                    zrenje: faker.helpers.arrayElement(zrenjeLista),
                    regija: faker.helpers.arrayElement(regije),
                    intezitet: faker.helpers.arrayElement(intenziteti),
                    masnoce: faker.helpers.arrayElement(masnoceLista),
                    okus: faker.helpers.arrayElement(okusi)
                };

                await SirService.dodaj(sir);
            }
        };

        const generirajGrupe = async (broj) => {

            // Dohvati sve smjerove
            const rezultatSmjerovi = await SmjerService.get();
            const smjerovi = rezultatSmjerovi.data;


            if (smjerovi.length === 0) {
                throw new Error('Nema dostupnih smjerova. Prvo generirajte smjerove.');
            }

            for (let i = 0; i < broj; i++) {
                // Odaberi nasumični smjer
                const randomSmjer = smjerovi[faker.number.int({ min: 0, max: smjerovi.length - 1 })];

                const grupa = {
                    naziv: randomSmjer.naziv.trim().split(/\s+/).slice(0, 2).map(rijec => rijec[0]).join('').toUpperCase(),
                    smjer: randomSmjer.sifra
                };

                await GrupaService.dodaj(grupa);
            }
        };

        const handleGenerirajSmjerove = async (e) => {
            e.preventDefault();
            setLoading(true);
            setPoruka(null);

            try {
                await generirajSmjerove(brojSmjerova);

                setPoruka({
                    tip: 'success',
                    tekst: `Uspješno generirano ${brojSmjerova} smjerova!`
                });
            } catch (error) {
                setPoruka({
                    tip: 'danger',
                    tekst: 'Greška pri generiranju smjerova: ' + error.message
                });
            } finally {
                setLoading(false);
            }
        };

        const handleGenerirajPolaznike = async (e) => {
            e.preventDefault();
            setLoading(true);
            setPoruka(null);

            try {

                await generirajPolaznike(brojPolaznika);

                setPoruka({
                    tip: 'success',
                    tekst: `Uspješno generirano ${brojPolaznika} polaznika!`
                });
            } catch (error) {
                setPoruka({
                    tip: 'danger',
                    tekst: 'Greška pri generiranju polaznika: ' + error.message
                });
            } finally {
                setLoading(false);
            }
        };

        const handleObrisiPolaznike = async () => {
            if (!window.confirm('Jeste li sigurni da želite obrisati sve polaznike?')) {
                return;
            }

            setLoading(true);
            setPoruka(null);

            try {
                const rezultat = await PolaznikService.get();
                const polaznici = rezultat.data;

                for (const polaznik of polaznici) {
                    await PolaznikService.obrisi(polaznik.sifra);
                }

                setPoruka({
                    tip: 'success',
                    tekst: `Uspješno obrisano ${polaznici.length} polaznika!`
                });
            } catch (error) {
                setPoruka({
                    tip: 'danger',
                    tekst: 'Greška pri brisanju polaznika: ' + error.message
                });
            } finally {
                setLoading(false);
            }
        };

        const handleObrisiSmjerove = async () => {
            if (!window.confirm('Jeste li sigurni da želite obrisati sve smjerove?')) {
                return;
            }

            setLoading(true);
            setPoruka(null);

            try {
                const rezultat = await SmjerService.get();
                const smjerovi = rezultat.data;

                for (const smjer of smjerovi) {
                    await SmjerService.obrisi(smjer.sifra);
                }

                setPoruka({
                    tip: 'success',
                    tekst: `Uspješno obrisano ${smjerovi.length} smjerova!`
                });
            } catch (error) {
                setPoruka({
                    tip: 'danger',
                    tekst: 'Greška pri brisanju smjerova: ' + error.message
                });
            } finally {
                setLoading(false);
            }
        };

        const handleGenerirajGrupe = async (e) => {
            e.preventDefault();
            setLoading(true);
            setPoruka(null);

            try {
                await generirajGrupe(brojGrupa);

                setPoruka({
                    tip: 'success',
                    tekst: `Uspješno generirano ${brojGrupa} grupa!`
                });
            } catch (error) {
                setPoruka({
                    tip: 'danger',
                    tekst: 'Greška pri generiranju grupa: ' + error.message
                });
            } finally {
                setLoading(false);
            }
        };

        const handleObrisiGrupe = async () => {
            if (!window.confirm('Jeste li sigurni da želite obrisati sve grupe?')) {
                return;
            }

            setLoading(true);
            setPoruka(null);

            try {
                const rezultat = await GrupaService.get();
                const grupe = rezultat.data;

                for (const grupa of grupe) {
                    await GrupaService.obrisi(grupa.sifra);
                }

                setPoruka({
                    tip: 'success',
                    tekst: `Uspješno obrisano ${grupe.length} grupa!`
                });
            } catch (error) {
                setPoruka({
                    tip: 'danger',
                    tekst: 'Greška pri brisanju grupa: ' + error.message
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

            {/* UPARIVANJA */}
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
            <Col md={4}>
                <Button
                    variant="danger"
                    onClick={handleObrisiPairing}
                    disabled={loading}
                    className="w-100 mb-2"
                >
                    {loading ? 'Brisanje...' : 'Obriši sva uparivanja'}
                </Button>
            </Col>
        </Row>

        <Alert variant="danger" className="mt-3">
            <strong>Oprez!</strong> Brisanje podataka je trajna akcija i ne može se poništiti.
        </Alert>
    </Container>
);