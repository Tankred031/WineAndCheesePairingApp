import { sirevi } from "./SireviPopis";


async function get() {
    return {data: sirevi}

}


export default{
    get
}