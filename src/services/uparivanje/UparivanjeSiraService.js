import { vina } from './VinaPopis';
import { uparivanjeById } from './UparivanjeSiraPopis';
import UparivanjeCustomService from './UparivanjeCustomService';

async function getBySireviId(sirId) {

    // Zadana uparivanja
    const defaultVina = vina.filter(vino =>

        (uparivanjeById[vino.id] || [])
            .includes(sirId)
    );


    // Custom uparivanja
    const custom = (
        await UparivanjeCustomService.get()
    ).data

        .filter(u => u.sirId === sirId)

        .map(u =>
            vina.find(v => v.id === u.vinoId)
        )

        .filter(Boolean);


    // Spoji bez duplikata
    const svi = [

        ...defaultVina,
        ...custom

    ].filter(

        (vino, index, self) =>

            index === self.findIndex(
                v => v.id === vino.id
            )
    );


    return {

        success: true,
        data: svi
    };
}

export default {

    getBySireviId
};