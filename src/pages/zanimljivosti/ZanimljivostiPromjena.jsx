import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { RouteNames } from "../../constants";
import ZanimljivostiService from "../../services/zanimljivosti/ZanimljivostiService";
import { ShemaZanimljivost } from "../../schemas/ShemaZanimljivost";

export default function ZanimljivostPromjena() {

    const navigate = useNavigate();
    const params = useParams();

    const [form, setForm] = useState({
        img: "",
        title: "",
        text: "",
        link: ""
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        ucitaj();
    }, []);

    async function ucitaj() {
        try {
            const res = await ZanimljivostiService.getById(params.id);
            setForm(res.data);
        } catch (e) {
            alert("Greška kod učitavanja");
        }
    }

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

        // makni error kad user počne pisati
        if (errors[e.target.name]) {
            const novi = { ...errors };
            delete novi[e.target.name];
            setErrors(novi);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setErrors({});

        const rezultat = ShemaZanimljivost.safeParse(form);

        if (!rezultat.success) {
            const noveGreske = {};

            rezultat.error.issues.forEach(issue => {
                const kljuc = issue.path[0];
                if (!noveGreske[kljuc]) {
                    noveGreske[kljuc] = issue.message;
                }
            });

            setErrors(noveGreske);
            return;
        }

        try {
            await ZanimljivostiService.promjeni(params.id, form);
            navigate(RouteNames.ZANIMLJIVOSTI);
        } catch (e) {
            alert("Greška kod spremanja");
        }
    }

    return (
        <div className="zanimljivosti-form-wrapper">

            <h2 className="section-title mb-4">
                Uredi zanimljivost ✏️
            </h2>

            <div className="zanimljivosti-form-card">
                <Form onSubmit={handleSubmit}>

                    <Form.Group className="mb-2">
                        <Form.Label>URL slike</Form.Label>
                        <Form.Control
                            name="img"
                            value={form.img}
                            onChange={handleChange}
                            isInvalid={!!errors.img}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.img}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <Form.Label>Naslov</Form.Label>
                        <Form.Control
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            isInvalid={!!errors.title}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.title}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <Form.Label>Tekst</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="text"
                            value={form.text}
                            onChange={handleChange}
                            isInvalid={!!errors.text}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.text}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Link</Form.Label>
                        <Form.Control
                            name="link"
                            value={form.link}
                            onChange={handleChange}
                            isInvalid={!!errors.link}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.link}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Button type="submit" className="w-100" variant="success">
                        Spremi izmjene
                    </Button>

                </Form>
            </div>
        </div>
    );
}