import { sirevi } from './SireviPopis';
import { uparivanjeById } from './UparivanjeVinaPopis';  
  
async function getByVinoId(vinaId) {
    const sireviId = uparivanjeById[vinaId] || [];
    
    const result = sirevi.filter(sir => sireviId.includes(sir.id));

    return {
        success: true,
        data: result
    };
}

export default {
    getByVinoId   
};