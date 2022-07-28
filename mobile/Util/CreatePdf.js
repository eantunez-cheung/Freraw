import RNHTMLtoPDF from "react-native-html-to-pdf"

const createPDF = {
    async rightToTheImage(information, nameFolder) {
        const option = {
            html: `<h1 style="text-align: center">DROIT A L'IMAGE</h1>
                <p>Je soussigné ${information.fullNameClient} ${(information.fullNameChild !== '' ? 'repésentant légal de ' + information.fullNameChild : '')}.</p>
                <p>Résidant au ${information.address}</p>
                <p>${information.phoneNumber !== '' ? 'Téléphone : ' + information.phoneNumber : ''}</p>
                <p>E-mail : ${information.mail}</p>
                <br>
                <p>Autorise ${information.fullNamePro} à utiliser mon image ${information.fullNameChild !== '' ? 'ou celle des mineurs dont je suis représentant légal' : ''}, dans le but de promouvoir ses activités, que ce soit sous la forme de photos, vidéos, affiches, dépliants, éditions papier, ou toute autre forme de communication, et ce, sans aucune indemnité et sans limite dans le temps.</p>
                <br>
                <p>Je déclare avoir 18 ans ou plus et avoir la capacité de signer ce formulaire en mon propre nom.</p>
                <br>
                <p>J'ai lu et compris toutes les significations de cette renonciation.</p>
                <br>
                <p>Fait à ${information.location} le ${information.date}.</p>
                <br>
                <p>Signature :</p>
                <img src=${information.signature} width="150" height="100">`,
            fileName: `Droit à l'image ${information.fullNameClient}`,
            directory: `Documents/Documents juridique/${nameFolder}`
        }
        const file = await RNHTMLtoPDF.convert(option)
        return ({ pathFile: file.filePath, fileName: option.fileName })
    },
    async rightOfFly(information, nameFolder) {
        const option = {
            html: `<h1 style="text-align: center">DROIT DE VOL</h1>
                <p>Je soussigné ${information.fullNameClient}.</p>
                <p>Résidant au ${information.address}</p>
                <p>${information.phoneNumber !== '' ? 'Téléphone : ' + information.phoneNumber : ''}</p>
                <p>E-mail : ${information.mail}</p>
                <br>
                <p>Autorise ${information.fullNamePro} à réaliser une prestation de droniste sur ma propriété dans le but de promouvoir ses activités, que ce soit sous la forme de photos, vidéos, affiches, dépliants, éditions papier, ou toute autre forme de communication, et ce, sans aucune indemnité et sans limite dans le temps.</p>
                <br>
                <p>Je déclare avoir 18 ans ou plus et avoir la capacité de signer ce formulaire en mon propre nom.</p>
                <br>
                <p>J'ai lu et compris toutes les significations de cette renonciation.</p>
                <br>
                <p>Fait à ${information.location} le ${information.date}.</p>
                <br>
                <p>Signature :</p>
                <img src=${information.signature} width="150" height="100">`,
            fileName: `Droit de vol ${information.fullNameClient}`,
            directory: `Documents juridique/${nameFolder}`
        }
        const file = await RNHTMLtoPDF.convert(option)
        return ({ pathFile: file.filePath, fileName: option.fileName })
    },
    async dischargeOfResponsability(information, nameFolder, signatureParent, signatureReleasee, signatureReleasor) {
        const option = {
            html: `<h1 style="text-align: center">DECHARGE DE RESPONSABILITE</h1>
                <p>Je soussigné ${information.fullNameClient}, résidant au ${information.address}</p>
                <p>PAR LA PRÉSENTE, JE DECLARE ASSUMER TOUS LES RISQUES DE PARTICIPATION À TOUTES LES ACTIVITÉS menées par ${information.fullNamePro}, tel que à titre d’exemple et non limitatif, tout risque pouvant résulter de la négligence des personnes ou entités, d’équipements ou biens dangereux ou défectueux qu’ils possèdent, entretiennent ou contrôlent.</p>
                <p>JE CERTIFIE que je suis en bonne forme physique, que je suis suffisamment préparé ou formé pour participer à cette activité et qu'aucun professionnel qualifié de santé ne m'a conseillé de ne pas y participer</p>
                <p>JE CERTIFIE qu'il n'y a aucune raison ou problème lié à la santé qui m'empêche de participer à cette activité.</p>
                <p>Je reconnais que cette décharge de responsabilité pourra être utilisée par les organisateurs de l'activité à laquelle je pourrai participer et qu’il régira mes actions et responsabilités lors de ladite activité.</p>
                <p>Compte tenu de ma candidature et afin de pouvoir participer à cette activité, je prends les engagements suivants à mon nom et celui de mes exécuteurs testamentaires, mes héritiers, mes proches parents,
                successeurs et ayants droit :</p>
                <p>(1) JE LIBÈRE DE TOUTE RESPONSABILITÉ, y compris, mais sans s’y limiter la responsabilité liée à la négligence qui peut entrainer mon décès, invalidité blessures, dommages corporelles, vol ou action en tout genre qui peut m’arriver y compris pendant le trajet vers et depuis cette activité.</p>
                <p>(2) JE M’ENGAGE À NE PAS POURSUIVRE JURIDIQUEMENT les personnes ou entités mentionnés dans ce paragraphe pour toute responsabilité ou réclamation découlant de la participation à cette activité, que ce soit causé par négligence ou pas. Je reconnais que ${information.company} et leurs dirigents, employés, bénévoles et représentants NE SONT PAS responsables des erreurs, omissions, actions ou manquements de toute personne menant une activité specifique pour leur compte.</p>
                <p>Je reconnais que cette activité peut impliquer un test pour les limites physiques et mentales d'une  personne et potentiellement peut entraîner la mort, des blessures graves ou invalidité. Les risques  incluent, sans toutefois s'y limiter, ceux causés par le terrain, les installations, la température, les conditions météorologiques, l'état des participants, le matériel, la circulation des automobiles, le manque d'hydratation et les actions d'autres personnes, notamment celle des participants, bénévoles ou moniteurs.</p>
                <p>Ces risques ne sont pas seulement inhérents aux participants, ils sont également présents pour les volontaires.</p>
                <p>Je consens par la présente à recevoir le traitement médical jugé utile en cas de blessure, d’accident et / ou maladie au cours de cette activité.</p>
                <p>Je comprends qu’en participant à cette activité, je peux être photographié. J'accepte que mes photos, vidéos ou films soient utilisés à des fins légitimes par les organisateurs de l'activité, les sponsors et les cédants.</p>
                <p>Le formulaire de décharge de responsabilité et de dégagement de responsabilité doit être interprété au sens large pour fournir une décharge et une renonciation dans les limites maximales permises par la loi en vigueur.</p>
                <p>JE CERTIFIE AVOIR LU CE DOCUMENT ET COMPRENDRE PLEINEMENT SON CONTENU. JE SUIS CONSCIENT QU'IL S'AGIT D'UNE DÉCHARGE DE RESPONSABILITÉ ET D'UN CONTRAT ET JE LE SIGNE DE MON PLEIN GRÉ.</p>
                <h2 style="text-align: center">Signatures</h2>
                <p>Date : ${information.date}</p>
                <p>Nom et signature du Renonciateur</p>
                <p>${information.fullNameClient}</p>
                <img src=${signatureReleasor.signature} width="150" height="100">
                ${information.fullNameParent !== '' && signatureParent.signature !== '' ?
                    `<p>Nom et signature du parent / tuteur</p>
                    <p>(Si moins de 18 ans, le parent ou le tuteur doit également signer.)</p>
                    <p>${information.fullNameParent}</p>
                    <img src=${signatureParent.signature} width="150" height="100">`
                    :
                    ''
                }
                <p>Nom et signature du Renonciataire</p>
                <p>${information.fullNamePro}</p>
                <img src=${signatureReleasee.signature} width="150" height="100">`,
            fileName: `Décharge de responsobilité ${information.fullNameClient}`,
            directory: `Documents juridique/${nameFolder}`
        }
        const file = await RNHTMLtoPDF.convert(option)
        return ({ pathFile: file.filePath, fileName: option.fileName })
    }
}

export default createPDF