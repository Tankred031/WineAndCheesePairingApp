import { useState } from 'react'
import { RouteNames } from '../../constants'
import ZanimljivostiService from '../../services/zanimljivosti/ZanimljivostiService'
import { useNavigate } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import { ShemaZanimljivost } from '../../schemas/ShemaZanimljivost'

export default function DodajZanimljivost() {

    const navigate = useNavigate()

    const [form, setForm] = useState({
        img: "",
        title: "",
        text: "",
        link: ""
    })

    const [errors, setErrors] = useState({})

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setErrors({})

        const rezultat = ShemaZanimljivost.safeParse(form)

        if (!rezultat.success) {
            const noveGreske = {}

            rezultat.error.issues.forEach(issue => {
                const kljuc = issue.path[0]
                if (!noveGreske[kljuc]) {
                    noveGreske[kljuc] = issue.message
                }
            })

            setErrors(noveGreske)
            return
        }

        await ZanimljivostiService.dodaj(form)
        navigate(RouteNames.ZANIMLJIVOSTI)
    }

    return (
        <div className="zanimljivosti-form-wrapper">

            <h2 className="section-title mb-4">
                Dodaj zanimljivost 👇
            </h2>

            <div className="zanimljivosti-form-card">
                <Form onSubmit={handleSubmit}>

                    <Form.Group className="mb-2">
                        <Form.Label>URL slike</Form.Label>
                        <Form.Control
                            name="img"
                            value={form.img}
                            onChange={handleChange}
                        />
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

                    <div className="d-flex gap-2 mt-3">

                        <button
                            type="button"
                            className="btn btn-danger w-100"
                            onClick={() => navigate(RouteNames.ZANIMLJIVOSTI)}
                        >
                            Odustani
                        </button>


                        <button
                            type="submit"
                            className="btn btn-success w-100"
                        >
                            Dodaj karticu
                        </button>

                    </div>
                </Form>
            </div>
        </div>
    )
}