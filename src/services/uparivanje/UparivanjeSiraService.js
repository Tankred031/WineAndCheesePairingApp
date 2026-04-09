import { vina } from './VinaPopis';
import { uparivanjeById } from './UparivanjeSiraPopis';
import UparivanjeCustomService from './UparivanjeCustomService';  
  

async function getBySireviId(sirId) {
    
    const result = vina.filter(vino =>
    (uparivanjeById[vino.id] || []).includes(sirId)
    );
    
    const custom = (await UparivanjeCustomService.get()).data
        .filter(u => u.sirId === sirId)
        .map(u => result.find(v => v.id === u.vinoId))
        .filter(Boolean);

    const svi = [...defaultVina, ...custom].filter(
        (vino, index, self) => index === self.findIndex(v => v.id === vino.id)
    );


    return {
        success: true,
        data: svi
    };
}

export default {    
    getBySireviId
};