import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    StyleSheet
} from "react-native";
import colors from "../../Util/colors";

import Materials from "./Materials";

const handleSubmit = (saveChecklist, setArray, activeMenu, materials, nameList) => {
    let materialNameIsEmpty = false

    if (materials.length !== 0 && nameList.trim()) {
        materials.map((material) => {
            if (!material.name.trim()) {
                return materialNameIsEmpty = true
            }
        })
        if (!materialNameIsEmpty) {
            setArray([])
            saveChecklist(nameList, materials)
            activeMenu('lists')
        } else {
            Alert.alert("Erreur", "Un ou plusieurs élément de la liste ne sont pas renseigner !")
        }
    } else {
        Alert.alert("Erreur", "Le nom de la liste et/ou le nom de l'élément de la liste ne doivent pas être vide !")
    }
}

export default function CreateList({ saveChecklist, activeMenu, setArray }) {
    const [materials, setMaterials] = useState([])
    const [nameList, setNameList] = useState("")

    useEffect(
        () =>
            setArray(materials)
        , [setArray, materials])

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Nom de la liste :</Text>
            <TextInput style={styles.inputText}
                onChange={e => setNameList(e.nativeEvent.text)} />
            <Materials materials={materials} onChange={setMaterials} />
            {
                materials.length ?
                    <TouchableOpacity onPress={() => handleSubmit(saveChecklist, setArray, activeMenu, materials, nameList)}>
                        <View style={styles.button}>
                            <Text style={styles.textButton}>Enregistrer la liste</Text>
                        </View>
                    </TouchableOpacity>
                    :
                    <></>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        marginHorizontal: 12,
    },
    text: {
        fontSize: 20,
        color: colors.blue,
        textDecorationLine: 'underline'
    },
    button: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        paddingVertical: 12,
        backgroundColor: colors.cyan
    },
    textButton: {
        fontSize: 20,
        color: colors.white
    },
    inputText: {
        borderWidth: 1,
        fontSize: 20,
        marginTop: 5,
        marginBottom: 12,
        borderRadius: 5,
        padding: 10,
        borderColor: colors.cyan,
        color: colors.blue
    }
})