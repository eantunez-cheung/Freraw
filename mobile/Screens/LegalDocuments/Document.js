import React, { useState } from "react";
import {
    View,
    ScrollView,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    StyleSheet,
    Alert
} from "react-native";
import { connect } from "react-redux";

import Signature from "../../Components/LegalDocuments/Signature";
import colors from "../../Util/colors";
import createPDF from "../../Util/CreatePdf";
import { updateClientDocuments } from "../../Util/actions";


const formatDate = (date) => {
    const formattedDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
    return formattedDate
}
const Document = ({ route, changeClientDocuments, navigation }) => {
    const date = new Date()
    const [signatureReleasor, setSignatureReleasor] = useState({ signature: '' })
    const [signatureReleasee, setSignatureReleasee] = useState({ signature: '' })
    const [signatureParent, setSignatureParent] = useState({ signature: '' })
    const [infoDocument, setInfoDocument] = useState({
        fullNameClient: '',
        fullNameChild: '',
        fullNameParent: '',
        address: '',
        company: '',
        phoneNumber: '',
        mail: '',
        fullNamePro: '',
        location: '',
        date: formatDate(date),
        signature: '',
    })

    const handleRightToTheImage = async () => {
        if (!infoDocument.fullNameClient.trim() || !infoDocument.address.trim()
            || !infoDocument.mail.trim() || !infoDocument.fullNamePro.trim()
            || !infoDocument.location.trim() || !infoDocument.signature.trim()) {
            Alert.alert('Erreur', "Le nom et prénom du client et du professionnel, l'adresse, l'email, le lieu et la signature sont obligatoire")
        } else {
            const fileInfo = await createPDF.rightToTheImage(infoDocument, route.params.nameFolder)
            changeClientDocuments(route.params.indexFolder, fileInfo)
            navigation.goBack()
        }
    }
    const handleRightOfFly = async () => {
        if (!infoDocument.fullNameClient.trim() || !infoDocument.address.trim()
            || !infoDocument.mail.trim() || !infoDocument.fullNamePro.trim()
            || !infoDocument.location.trim() || !infoDocument.signature.trim()) {
            Alert.alert('Erreur', "Le nom et prénom du client et du professionnel, l'adresse, l'email, le lieu et la signature sont obligatoire")
        } else {
            const fileInfo = await createPDF.rightOfFly(infoDocument, route.params.nameFolder)
            changeClientDocuments(route.params.indexFolder, fileInfo)
            navigation.goBack()
        }
    }

    const handleDischargeOfResponsability = async () => {
        if (!infoDocument.fullNameClient.trim() || !infoDocument.address.trim()
            || !infoDocument.fullNamePro.trim() || !signatureReleasor.signature.trim()
            || !signatureReleasee.signature.trim() || !infoDocument.company.trim()) {
            Alert.alert('Erreur', "Le nom et prénom du client et du professionnel, l'adresse, l'entreprise et la signature du renonciateur et du renonciataire sont obligatoire")
        } else {
            const fileInfo = await createPDF.dischargeOfResponsability(infoDocument, route.params.nameFolder, signatureParent, signatureReleasee, signatureReleasor)
            changeClientDocuments(route.params.indexFolder, fileInfo)
            navigation.goBack()
        }
    }

    if (route.params.headerName === "Droit à l'image") {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.title}>{route.params.headerName}</Text>
                    <Text style={styles.text}>Je soussigné</Text>
                    <TextInput style={styles.inputText} placeholder="NOM Prénom du client" placeholderTextColor={colors.grey} onChangeText={e => setInfoDocument({ ...infoDocument, fullNameClient: e })} />
                    <Text style={styles.text}>(pour les mineurs) représentant légal de</Text>
                    <TextInput style={styles.inputText} placeholder="NOM Prénom de l'enfant" placeholderTextColor={colors.grey} onChangeText={e => setInfoDocument({ ...infoDocument, fullNameChild: e })} />
                    <Text style={styles.text}>résidant au</Text>
                    <TextInput style={styles.inputText} placeholder="Adresse complète" placeholderTextColor={colors.grey} onChangeText={e => setInfoDocument({ ...infoDocument, address: e })} />
                    <Text style={styles.text}>Tél (Facultatif)</Text>
                    <TextInput style={styles.inputText} keyboardType="phone-pad" onChangeText={e => setInfoDocument({ ...infoDocument, phoneNumber: e })} />
                    <Text style={styles.text}>E-mail</Text>
                    <TextInput style={styles.inputText} keyboardType="email-address" onChangeText={e => setInfoDocument({ ...infoDocument, mail: e })} />
                    <Text style={styles.text}>{`\nAutorise`}</Text>
                    <TextInput style={styles.inputText} placeholder="NOM Prénom du professionnel" placeholderTextColor={colors.grey} onChangeText={e => setInfoDocument({ ...infoDocument, fullNamePro: e })} />
                    <Text style={styles.text}>{`à utiliser mon image ou celle des mineurs dont je suis représentant légal, dans le but de promouvoir ses activités, que ce soit sous la forme de photos, vidéos, affiches, dépliants, éditions papier, ou toute autre forme de communication, et ce, sans aucune indemnité et sans limite dans le temps.

Je déclare avoir 18 ans ou plus et avoir la capacité de signer ce formulaire en mon propre nom.

J'ai lu et compris toutes les significations de cette renonciation.\n`}</Text>
                    <Text style={styles.text}>Fait a</Text>
                    <TextInput style={styles.inputText} onChangeText={e => setInfoDocument({ ...infoDocument, location: e })} />
                    <Text style={styles.text}>{`le ${infoDocument.date}`}</Text>
                    <Text style={styles.text}>Signature :</Text>
                    <Signature onChange={setInfoDocument} document={infoDocument} />
                    <TouchableWithoutFeedback onPress={() => handleRightToTheImage()}>
                        <View style={styles.button}>
                            <Text style={styles.textButton}>Enregistrer</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </ScrollView>
        )
    } else if (route.params.headerName === "Droit de vol") {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.title}>{route.params.headerName}</Text>
                    <Text style={styles.text}>Je soussigné</Text>
                    <TextInput style={styles.inputText} placeholder="NOM Prénom du client" placeholderTextColor={colors.grey} onChangeText={e => setInfoDocument({ ...infoDocument, fullNameClient: e })} />
                    <Text style={styles.text}>résidant au</Text>
                    <TextInput style={styles.inputText} placeholder="Adresse complète" placeholderTextColor={colors.grey} onChangeText={e => setInfoDocument({ ...infoDocument, address: e })} />
                    <Text style={styles.text}>Tél (Facultatif)</Text>
                    <TextInput style={styles.inputText} keyboardType="phone-pad" onChangeText={e => setInfoDocument({ ...infoDocument, phoneNumber: e })} />
                    <Text style={styles.text}>E-mail</Text>
                    <TextInput style={styles.inputText} keyboardType="email-address" onChangeText={e => setInfoDocument({ ...infoDocument, mail: e })} />
                    <Text style={styles.text}>{`\nAutorise`}</Text>
                    <TextInput style={styles.inputText} placeholder="NOM Prénom du professionnel" placeholderTextColor={colors.grey} onChangeText={e => setInfoDocument({ ...infoDocument, fullNamePro: e })} />
                    <Text style={styles.text}>{`à réaliser une prestation de droniste sur ma propriété dans le but de promouvoir ses activités, que ce soit sous la forme de photos, vidéos, affiches, dépliants, éditions papier, ou toute autre forme de communication, et ce, sans aucune indemnité et sans limite dans le temps.

Je déclare avoir 18 ans ou plus et avoir la capacité de signer ce formulaire en mon propre nom.

J'ai lu et compris toutes les significations de cette renonciation.\n`}</Text>
                    <Text style={styles.text}>Fait a</Text>
                    <TextInput style={styles.inputText} onChangeText={e => setInfoDocument({ ...infoDocument, location: e })} />
                    <Text style={styles.text}>le</Text>
                    <Text style={styles.text}>{`le ${infoDocument.date}`}</Text>
                    <Text style={styles.text}>Signature :</Text>
                    <Signature onChange={setInfoDocument} document={infoDocument} />
                    <TouchableWithoutFeedback onPress={() => handleRightOfFly()}>
                        <View style={styles.button}>
                            <Text style={styles.textButton}>Enregistrer</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </ScrollView>
        )
    } else if (route.params.headerName === "Décharge de responsabilité") {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.title}>Décharge de responsabilité</Text>
                    <Text style={styles.text}>Je soussigné</Text>
                    <TextInput style={styles.inputText} placeholder="NOM Prénom du client" placeholderTextColor={colors.grey} onChangeText={e => setInfoDocument({ ...infoDocument, fullNameClient: e })} />
                    <Text style={styles.text}>Résidant au</Text>
                    <TextInput style={styles.inputText} placeholder="Adresse complète" placeholderTextColor={colors.grey} onChangeText={e => setInfoDocument({ ...infoDocument, address: e })} />
                    <Text style={styles.text}>Par la présente, je déclare assumer tous les risques de participation à toutes les activités menées par</Text>
                    <TextInput style={styles.inputText} placeholder="NOM prénom du professionnel" placeholderTextColor={colors.grey} onChangeText={e => setInfoDocument({ ...infoDocument, fullNamePro: e })} />
                    <Text style={styles.text}>{`tel que à titre d’exemple et non limitatif, tout risque pouvant résulter de la négligence des personnes ou entités, d’équipements ou biens dangereux ou défectueux qu’ils possèdent, entretiennent ou contrôlent.

Je certifie que je suis en bonne forme physique, que je suis suffisamment préparé ou formé pour participer à cette activité et qu'aucun professionnel qualifié de santé ne m'a conseillé de ne pas y participer. 

Je certifie qu'il n'y a aucune raison ou problème lié à la santé qui m'empêche de participer à cette activité. 

Je reconnais que cette décharge de responsabilité pourra être utilisée par les organisateurs de l'activité à laquelle je pourrai participer et qu’il régira mes actions et responsabilités lors de ladite activité.

Compte tenu de ma candidature et afin de pouvoir participer à cette activité, je prends les engagements
suivants à mon nom et celui de mes exécuteurs testamentaires, mes héritiers, mes proches parents, successeurs et ayants droit :

(1) Je libère de toute responsabilité, y compris, mais sans s’y limiter la responsabilité liée à la négligence qui peut entrainer mon décès, invalidité, blessures, dommages corporelles, vol ou action en tout genre qui peut m’arriver y compris pendant le trajet vers et depuis cette activité.

(2) Je m'engage à ne pas poursuivre juridiquement les personnes ou entités mentionnés dans ce paragraphe pour toute responsabilité ou réclamation découlant de la participation à cette activité, que ce soit causé par négligence ou pas. Je reconnais que`}</Text>
                    <TextInput style={styles.inputText} placeholder="Nom de l'entreprise" placeholderTextColor={colors.grey} onChangeText={e => setInfoDocument({ ...infoDocument, company: e })} />
                    <Text style={styles.text}>{`et leurs dirigents, employés, bénévoles et représentants ne sont pas responsables des erreurs, omissions, actions ou manquements de toute personne menant une activité specifique pour leur compte.

Je reconnais que cette activité peut impliquer un test pour les limites physiques et mentales d'une  personne et potentiellement peut entraîner la mort, des blessures graves ou invalidité. Les risques incluent, sans toutefois s'y limiter, ceux causés par le terrain, les installations, la température, les conditions météorologiques, l'état des participants, le matériel, la circulation des automobiles, le manque d'hydratation et les actions d'autres personnes, notamment celle des participants, bénévoles ou moniteurs.

Ces risques ne sont pas seulement inhérents aux participants, ils sont également présents pour les volontaires.

Je consens par la présente à recevoir le traitement médical jugé utile en cas de blessure, d’accident et / ou maladie au cours de cette activité.

Je comprends qu’en participant à cette activité, je peux être photographié. J'accepte que mes photos, vidéos ou films soient utilisés à des fins légitimes par les organisateurs de l'activité, les sponsors et les cédants.

Le formulaire de décharge de responsabilité et de dégagement de responsabilité doit être interprété au sens large pour fournir une décharge et une renonciation dans les limites maximales permises par la loi en vigueur.

Je certifie avoir lu ce document et comprendre pleinement son contenu. Je suis conscient qu'il s'agit d'une décharge de responsabilité et d'un contrat et je le signe de mon plein gré.`}</Text>
                    <Text style={styles.text}>Renonciateur : {infoDocument.fullNameClient}</Text>
                    <Text style={styles.text}>Signature :</Text>
                    <Signature onChange={setSignatureReleasor} document={signatureReleasor} />
                    <Text style={styles.text}>Si moins de 18 ans, le parent ou le tuteur doit également signer.</Text>
                    <TextInput style={styles.inputText} placeholder='NOM Prénom du parent/tuteur' placeholderTextColor={colors.grey} onChangeText={e => setInfoDocument({ ...infoDocument, fullNameParent: e })} />
                    <Text style={styles.text}>Signature :</Text>
                    <Signature onChange={setSignatureParent} document={signatureParent} />
                    <Text style={styles.text}>Renonciataire : {infoDocument.fullNamePro}</Text>
                    <Text style={styles.text}>Signature :</Text>
                    <Signature onChange={setSignatureReleasee} document={signatureReleasee} />
                    <Text style={styles.text}>Date : {infoDocument.date}</Text>
                    <TouchableWithoutFeedback onPress={() => handleDischargeOfResponsability()}>
                        <View style={styles.button}>
                            <Text style={styles.textButton}>Enregistrer</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    text: {
        fontSize: 20,
        color: colors.blue,
        textAlign: 'justify'
    },
    inputText: {
        borderWidth: 1,
        fontSize: 20,
        marginBottom: 10,
        borderRadius: 5,
        padding: 10,
        borderColor: colors.cyan,
        color: colors.blue
    },
    button: {
        paddingVertical: 10,
        backgroundColor: colors.blue,
        alignItems: 'center',
        borderRadius: 5,
    },
    signatureButton: {
        paddingVertical: 10,
        backgroundColor: colors.cyan,
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 10
    },
    textButton: {
        fontSize: 20,
        color: colors.white
    },
    title: {
        textAlign: 'center',
        fontSize: 25,
        color: colors.blue,
        fontWeight: 'bold'
    }
})

const mapDispatchProps = dispatch => ({
    changeClientDocuments(indexFolder, files) {
        dispatch(updateClientDocuments(indexFolder, files))
    }
})

export default connect(null, mapDispatchProps)(Document)