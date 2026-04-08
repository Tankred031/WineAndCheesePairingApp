import { sirevi } from './SireviPopis';
import { uparivanjeById } from './UparivanjeVinaPopis';  
import UparivanjeCustomService from './UparivanjeCustomService';
  
async function getByVinoId(vinaId) {
    const sireviId = uparivanjeById[vinaId] || [];
    
    const defaultSirevi = sirevi.filter(sir => sireviId.includes(sir.id));

    const custom = (await UparivanjeCustomService.get()).data
        .filter(u => u.vinoId === vinaId)
        .map(u => sirevi.find(s => s.id === u.sirId))
        .filter(Boolean);

    const svi = [...defaultSirevi, ...custom]

    return {
        success: true,
        data: svi
    };
}

export default {
    getByVinoId   
};