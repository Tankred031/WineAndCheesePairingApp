import { useEffect, useState } from "react";
import VinaService from "../../services/vina/VinaService";
import SireviService from "../../services/sirevi/SireviService";

export default function Uparivanje() {
  
    const [vina, setVina] = useState([])
    const [sirevi, setSirevi] = useState([])

    useEffect(() => {
        ucitajVina(), ucitajSirevi()
    }, [])

    
  };

  return (
    
  );

