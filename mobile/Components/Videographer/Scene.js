import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    StyleSheet,
    Dimensions
} from "react-native"

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faPlusSquare
} from '@fortawesome/free-solid-svg-icons';
import { launchImageLibrary } from 'react-native-image-picker'

import colors from "../../Util/colors";


const pickImage = async (changeScene, index) => {
    await launchImageLibrary({
        mediaType: 'photo',
        quality: 1
    }, (response) => {
        if (!response.didCancel) {
            let source = response.assets.find(obj => obj).uri
            changeScene(index, {
                image: source
            })
        }
    })
}

export default function Scene({
    scenes: defaultScenes = [],
    onChange = () => null,
    clearScene = false,
    setClearScene = () => null,
}) {
    const { scenes, addScene, removeScene, removeAllScene, changeScene } = useScenes(defaultScenes)

    if (JSON.stringify(scenes) !== JSON.stringify(defaultScenes) && clearScene) {
        removeAllScene()
        setClearScene(false)
    }

    useEffect(() => {
        onChange(scenes)
    }, [scenes])

    return (
        <View style={styles.container}>
            {scenes.map((scene, index) => (
                <View key={`scene-${index}`} style={styles.containerForm}>
                    <View>
                        <Text style={styles.text}>Nom de la scène :</Text>
                        <TextInput style={styles.inputText}
                            onChange={e =>
                                changeScene(index, {
                                    name: e.nativeEvent.text,
                                })} />
                    </View>
                    <View>
                        <Text style={styles.text}>Lieu de la scène :</Text>
                        <TextInput style={styles.inputText}
                            onChange={e =>
                                changeScene(index, {
                                    place: e.nativeEvent.text,
                                })} />
                    </View>
                    <View>
                        <Text style={styles.text}>Matériels :</Text>
                        <TextInput style={styles.inputTextMultiLine}
                            multiline={true}
                            onChange={e =>
                                changeScene(index, {
                                    materials: e.nativeEvent.text,
                                })} />
                    </View>
                    <View>
                        <Text style={styles.text}>Acteurs :</Text>
                        <TextInput style={styles.inputTextMultiLine}
                            multiline={true}
                            onChange={e =>
                                changeScene(index, {
                                    actors: e.nativeEvent.text,
                                })} />
                    </View>
                    <View>
                        <Text style={styles.text}>Actions :</Text>
                        <TextInput style={styles.inputTextMultiLine}
                            multiline={true}
                            onChange={e =>
                                changeScene(index, {
                                    actions: e.nativeEvent.text,
                                })} />
                    </View>
                    <View style={styles.containerImage}>
                        <Text style={styles.text}>Illustration</Text>
                        {
                            scene.image === '' ?
                                <TouchableOpacity onPress={() => pickImage(changeScene, index)}>
                                    <View style={styles.buttonImage}>
                                        <FontAwesomeIcon icon={faPlusSquare} style={styles.icon} size={80} />
                                    </View>
                                </TouchableOpacity>
                                :
                                <View>
                                    <Image style={styles.image} source={{ uri: scene.image }} />
                                    <TouchableOpacity onPress={() => changeScene(index, {
                                        image: ''
                                    })}>
                                        <View style={styles.button}>
                                            <Text style={styles.textButton}>Supprimer image</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                        }
                    </View>
                    <TouchableOpacity onPress={() => removeScene(index)}>
                        <View style={styles.buttonRemoved}>
                            <Text style={styles.textButton}>Supprimer scène</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            ))}
            <TouchableOpacity onPress={() => addScene({
                name: '',
                place: '',
                materials: '',
                actions: '',
                actors: '',
                image: '',
            })}>
                <View style={styles.button}>
                    <Text style={styles.textButton}>Ajouter scène</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 12,
    },
    containerForm: {
        borderWidth: 5,
        padding: 10,
        borderRadius: 10,
        borderColor: colors.blue,
        marginBottom: 10
    },
    button: {
        alignItems: 'center',
        paddingVertical: 12,
        backgroundColor: colors.blue,
        borderRadius: 5
    },
    textButton: {
        fontSize: 20,
        color: colors.white
    },
    text: {
        fontSize: 20,
        textDecorationLine: 'underline',
        color: colors.blue,
        paddingBottom: 5
    },
    inputText: {
        borderWidth: 1,
        borderColor: colors.cyan,
        borderRadius: 5,
        fontSize: 20,
        color: colors.blue
    },
    inputTextMultiLine: {
        borderWidth: 1,
        borderColor: colors.cyan,
        borderRadius: 5,
        height: 100,
        textAlignVertical: "top",
        fontSize: 20
    },
    buttonRemoved: {
        alignItems: 'center',
        paddingVertical: 12,
        borderRadius: 5,
        backgroundColor: colors.red
    },
    containerImage: {
        marginBottom: 12
    },
    image: {
        width: 'auto',
        height: Dimensions.get('window').width,
        borderRadius: 5,
        marginBottom: 10
    },
    buttonImage: {
        alignItems: 'center'
    },
    icon: {
        color: colors.blue
    }
})

const useScenes = (defaultScenes = []) => {
    const [scenes, setScenes] = useState(defaultScenes)

    return {
        scenes,
        addScene: ({ name, place, materials, actors, actions, image }) =>
            setScenes([...scenes, { name, place, materials, actors, actions, image }]),
        removeScene: index =>
            setScenes(scenes.filter((v, i) => i !== index)),
        removeAllScene: () =>
            setScenes([]),
        changeScene: (index, scene) =>
            setScenes(
                scenes.map((sc, i) =>
                    i === index ? { ...sc, ...scene } : sc
                )
            )
    }
}