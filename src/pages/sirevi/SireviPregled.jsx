import { useEffect, useState } from "react"
import SireviService from "../../services/sirevi/SireviService"
import { Table } from "react-bootstrap"

export default function SireviPregled() {

    const [sirevi, setSirevi] = useState([])

    useEffect(() => {
        ucitajSirevi()
    }, [])

    async function ucitajSirevi() {
        await SireviService.get().then((odgovor) => {
            setSirevi(odgovor.data)
        })
    }

    return (
        <>
            <Table>
                
            </Table>
        </>
    )
}