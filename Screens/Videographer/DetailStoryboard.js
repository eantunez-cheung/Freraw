import React, { useState, useEffect } from "react"
import {
    View,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    StyleSheet
} from 'react-native'
import { connect } from "react-redux";

import Scene from "../../Components/Videographer/Scene"
import Thumbnail from "../../Components/Videographer/Thumbnail"
import { updateScene, updateStoryboard } from "../../Util/actions";
import colors from "../../Util/colors"

const handleSave = (scenes, setScenes, changeStoryboard, indexStoryboard, setClearScene) => {
    let elementSceneIsEmpty = false
    scenes.map((scene) => {
        if (!scene.name.trim()) {
            return elementSceneIsEmpty = true
        }
    })
    if (!elementSceneIsEmpty) {
        changeStoryboard(indexStoryboard, scenes)
        setScenes([])
        setClearScene(true)
    } else {
        Alert.alert("Erreur", "Le nom de la scène doit être remplie !")
    }

}

const DetailStoryboard = ({ route, list, changeScene, changeStoryboard, navigation }) => {
    const [scenes, setScenes] = useState([])
    const [clearScene, setClearScene] = useState(false)
    const [searchSceneByPlace, setSearchSceneByPlace] = useState('')
    const storyboard = list.find(item => item.id === route.params.idStoryboard)
    const scenesByPlace = storyboard.scenes.filter(scene => scene.place === searchSceneByPlace)
    const hasUnsavedChanges = Boolean(scenes.length);

    useEffect(
        () =>
            navigation.addListener('beforeRemove', (e) => {
                if (!hasUnsavedChanges) {
                    return
                }

                e.preventDefault()

                Alert.alert('Information', `Attention, en changent de page, les données que vous avez saisi seront effacé.\nÊtes vous sur de vouloir continuer ?`, [
                    {
                        text: "Annuler",
                    },
                    {
                        text: "Continuer",
                        onPress: () => {
                            setScenes([])
                            navigation.dispatch(e.data.action)
                        }
                    }
                ])
            }),
        [navigation, hasUnsavedChanges]
    )

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>{storyboard.nameStoryboard}</Text>
                <TextInput style={styles.inputText}
                    placeholder="Recherche par lieu"
                    placeholderTextColor={colors.grey}
                    onChangeText={e => setSearchSceneByPlace(e)} />
                {
                    searchSceneByPlace === '' ?
                        (storyboard.scenes.map((scene, index) => (
                            <Thumbnail key={index} scene={scene} indexScene={index} indexStoryboard={route.params.indexStoryboard} changeScene={changeScene} nameStoryboard={route.params.nameStoryboard} />
                        )))
                        :
                        scenesByPlace.map((scene, index) => (
                            <Thumbnail key={index} scene={scene} indexScene={index} indexStoryboard={route.params.indexStoryboard} changeScene={changeScene} nameStoryboard={route.params.nameStoryboard} />
                        ))
                }
                <Scene scenes={scenes} onChange={setScenes} clearScene={clearScene} setClearScene={setClearScene} />
                {
                    scenes.length ?
                        <TouchableOpacity onPress={
                            () => handleSave(scenes, setScenes, changeStoryboard, route.params.indexStoryboard, setClearScene)
                        }>
                            <View style={styles.button}>
                                <Text style={styles.textButton}>Enregistrer scenes</Text>
                            </View>
                        </TouchableOpacity>
                        :
                        <></>
                }
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 10
    },
    title: {
        textAlign: 'center',
        fontSize: 25,
        color: colors.blue,
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: colors.cyan,
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: 5
    },
    textButton: {
        fontSize: 20,
        color: colors.white
    },
    inputText: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: colors.cyan,
        fontSize: 20,
        color: colors.blue
    }
})

const mapStateToProps = state => ({
    list: state.storyboard
})

const mapDispatchToProps = dispatch => ({
    changeScene(indexScene, indexStoryboard, scene) {
        dispatch(updateScene(indexScene, indexStoryboard, scene))
    },
    changeStoryboard(indexStoryboard, scenes) {
        dispatch(updateStoryboard(indexStoryboard, scenes))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(DetailStoryboard)