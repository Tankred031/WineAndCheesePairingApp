import { useState } from 'react'
import { RouteNames } from '../../constants'
import { addCard } from '../../services/zanimljivosti/ZanimljivostiService'
import { useNavigate } from 'react-router-dom'
import { Form } from 'react-bootstrap'

export default function DodajZanimljivost() {

    const navigate = useNavigate()
    
    const [form, setForm] = useState({
        img: "",
        title: "",
        text: "",
        link: ""
    })

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        
        addCard(form)

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
                    />
                </Form.Group>

                <Form.Group className="mb-2">
                    <Form.Label>Tekst</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="text"
                        value={form.text}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Link</Form.Label>
                    <Form.Control
                        name="link"
                        value={form.link}
                        onChange={handleChange}
                    />
                </Form.Group>

                <button className="btn btn-primary w-100">
                    Dodaj karticu
                </button>

            </Form>
        </div>
    </div>
)
}