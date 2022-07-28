import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert
} from "react-native"

import Scene from './Scene'
import colors from "../../Util/colors";

const handleSubmit = (saveStoryboard, setActiveMenu, setArray, nameStoryboard, scenes) => {
    let elementSceneIsEmpty = false

    if (scenes.length !== 0 && nameStoryboard.trim()) {
        scenes.map((scene) => {
            if (!scene.name.trim()) {
                return elementSceneIsEmpty = true
            }
        })
        if (!elementSceneIsEmpty) {
            setArray([])
            saveStoryboard(nameStoryboard, scenes)
            setActiveMenu('listStoryboard')
        } else {
            Alert.alert("Erreur", "Le nom de la scène doit être remplie !")
        }
    } else {
        Alert.alert("Erreur", "Le nom du storyboard et/ou la liste de scène ne doivent pas être vide !")
    }
}

const CreateStoryboard = ({ saveStoryboard, setActiveMenu, setArray }) => {
    const [nameStoryboard, setNameStoryboard] = useState('')
    const [scenes, setScenes] = useState([])

    useEffect(
        () =>
            setArray(scenes)
        , [setArray, scenes])

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Nom du storyboard :</Text>
            <TextInput style={styles.inputText} onChangeText={e => setNameStoryboard(e)} />
            <Scene scenes={scenes} onChange={setScenes} />
            {
                scenes.length ?
                    <TouchableOpacity onPress={() => handleSubmit(saveStoryboard, setActiveMenu, setArray, nameStoryboard, scenes)}>
                        <View style={styles.button}>
                            <Text style={styles.textButton}>Enregistrer</Text>
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
        margin: 10,
    },
    text: {
        fontSize: 20,
        color: colors.blue
    },
    inputText: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: colors.cyan,
        fontSize: 20,
        paddingHorizontal: 10,
        fontSize: 20,
        color: colors.blue
    },
    button: {
        alignItems: 'center',
        backgroundColor: colors.cyan,
        paddingVertical: 12,
        borderRadius: 5
    },
    textButton: {
        fontSize: 20,
        color: colors.white
    }
})

export default CreateStoryboard

