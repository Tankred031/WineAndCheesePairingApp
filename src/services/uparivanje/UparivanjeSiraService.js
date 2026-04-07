import { vina } from './VinaPopis';
import { uparivanjeById } from './UparivanjeSiraPopis';  
  

async function getBySireviId(sirId) {
    const result = vina.filter(vino =>
    (uparivanjeById[vino.id] || []).includes(sirId)
    );
    
    return {
        success: true,
        data: result
    };
}

export default {    
    getBySireviId
};