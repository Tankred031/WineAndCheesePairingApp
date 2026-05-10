import { sirevi } from './SireviPopis';
import { uparivanjeById }from './UparivanjeVinaPopis';
import UparivanjeCustomService from './UparivanjeCustomService';


async function getByVinoId(vinaId) {

    const sireviId =
        uparivanjeById[vinaId] || [];


    // Zadana uparivanja
    const defaultSirevi = sirevi.filter(
        sir => sireviId.includes(sir.id)
    );


    // Custom uparivanja
    const custom = (
        await UparivanjeCustomService.get()
    ).data

        .filter(u => u.vinoId === vinaId)
        .map(u =>
            sirevi.find(
                s => s.id === u.sirId
            )
        )

        .filter(Boolean);


    // Spoji bez duplikata
    const svi = [

        ...defaultSirevi,
        ...custom

    ].filter(

        (sir, index, self) =>

            index === self.findIndex(
                s => s.id === sir.id
            )
    );


    return {

        success: true,
        data: svi
    };
}

export default {

    getByVinoId
};