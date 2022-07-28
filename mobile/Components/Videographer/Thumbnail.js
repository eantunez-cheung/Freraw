import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
} from 'react-native'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faArrowDown,
    faArrowUp,
    faPenSquare,
    faSave,
    faPlusSquare,
} from '@fortawesome/free-solid-svg-icons';
import { launchImageLibrary } from 'react-native-image-picker'

import colors from "../../Util/colors";

const handleSave = (setModifyIsClicked, changeScene, indexScene, indexStoryboard, newScene) => {
    changeScene(indexScene, indexStoryboard, newScene)
    setModifyIsClicked(false)
}

const pickImage = async (newScene, setNewScene) => {
    await launchImageLibrary({
        mediaType: 'photo',
        quality: 1
    }, (response) => {
        if (!response.didCancel) {
            let source = response.assets.find(obj => obj).uri
            setNewScene({
                ...newScene,
                image: source
            })
        }
    })
}

const Thumbnail = ({ indexScene, indexStoryboard, scene, changeScene }) => {
    const [isClicked, setIsClicked] = useState(false)
    const [modifyIsClicked, setModifyIsClicked] = useState(false)
    const [newScene, setNewScene] = useState({
        name: scene.name,
        place: scene.place,
        materials: scene.materials,
        actors: scene.actors,
        actions: scene.actions,
        image: scene.image,
    })

    return (
        <View style={styles.containerScene}>
            <View style={styles.firstLineContainer}>
                <Text style={[styles.scene, (scene.isChecked ? styles.realizedScene : '')]}>Scène {indexScene + 1}</Text>
                <TouchableOpacity onPress={() => setIsClicked(!isClicked)}>
                    <FontAwesomeIcon icon={!isClicked ? faArrowDown : faArrowUp} style={styles.icon} size={30} />
                </TouchableOpacity>
            </View>
            {
                isClicked ?
                    <>
                        <View style={styles.modifyElement}>
                            <Text style={styles.text}>Nom :</Text>
                            {
                                !modifyIsClicked ?
                                    <TouchableOpacity onPress={() => setModifyIsClicked(true)}>
                                        <FontAwesomeIcon icon={faPenSquare} style={styles.icon} size={30} />
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity onPress={() => handleSave(setModifyIsClicked, changeScene, indexScene, indexStoryboard, newScene)}>
                                        <FontAwesomeIcon icon={faSave} style={styles.icon} size={30} />
                                    </TouchableOpacity>
                            }
                        </View>
                        <Text style={styles.text}>{scene.name}</Text>
                        <Text style={styles.text}>Lieu :</Text>
                        {
                            scene.place.trim() && !modifyIsClicked ?
                                <Text style={styles.text}>{scene.place}</Text>
                                : modifyIsClicked ?
                                    <TextInput style={styles.inputText}
                                        value={newScene.place}
                                        onChangeText={e => setNewScene({ ...newScene, place: e })} />
                                    :
                                    <></>
                        }
                        <Text style={styles.text}>Matériels :</Text>
                        {
                            scene.materials.trim() && !modifyIsClicked ?
                                <Text style={styles.text}>{scene.materials}</Text>
                                : modifyIsClicked ?
                                    <TextInput style={styles.inputTextMultiLine}
                                        value={newScene.materials}
                                        multiline={true}
                                        onChangeText={e => setNewScene({ ...newScene, materials: e })} />
                                    :
                                    <></>
                        }
                        <Text style={styles.text}>Acteurs :</Text>
                        {
                            scene.actors.trim() && !modifyIsClicked ?
                                <Text style={styles.text}>{scene.actors}</Text>
                                : modifyIsClicked ?
                                    <TextInput style={styles.inputTextMultiLine}
                                        value={newScene.actors}
                                        multiline={true}
                                        onChangeText={e => setNewScene({ ...newScene, actors: e })} />
                                    :
                                    <></>
                        }
                        <Text style={styles.text}>Actions :</Text>
                        {
                            scene.actions.trim() && !modifyIsClicked ?
                                <Text style={styles.text}>{scene.actions}</Text>
                                : modifyIsClicked ?
                                    <TextInput style={styles.inputTextMultiLine}
                                        value={newScene.actions}
                                        multiline={true}
                                        onChangeText={e => setNewScene({ ...newScene, actions: e })} />
                                    :
                                    <></>
                        }
                        <Text style={styles.text}>Illustration :</Text>
                        {
                            scene.image.trim() && !modifyIsClicked ?
                                <Image style={styles.image} source={{ uri: scene.image }} />
                                : modifyIsClicked && !newScene.image.trim() ?
                                    <TouchableOpacity onPress={() => pickImage(newScene, setNewScene)}>
                                        <View style={styles.buttonImage}>
                                            <FontAwesomeIcon icon={faPlusSquare} style={styles.icon} size={80} />
                                        </View>
                                    </TouchableOpacity>
                                    : modifyIsClicked && newScene.image.trim() ?
                                        <View>
                                            <Image style={styles.image} source={{ uri: newScene.image }} />
                                            <TouchableOpacity onPress={() => setNewScene({
                                                ...newScene,
                                                image: ''
                                            })}>
                                                <View style={styles.button}>
                                                    <Text style={styles.textButton}>Supprimer image</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        :
                                        <></>
                        }
                    </>
                    :
                    <Text style={styles.text}>{(scene.place.trim() ? `${scene.name} / ${scene.place}` : scene.name)}</Text>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    containerScene: {
        borderWidth: 2,
        paddingHorizontal: 5,
        paddingVertical: 10,
        marginTop: 10,
        borderRadius: 5,
        borderColor: colors.cyan,
    },
    firstLineContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    scene: {
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor: colors.blue,
        color: colors.white,
        textAlign: 'center',
        padding: 5,
        borderRadius: 10
    },
    text: {
        fontSize: 20,
        color: colors.blue,
    },
    image: {
        width: 'auto',
        height: Dimensions.get('window').width,
        borderRadius: 5,
        marginBottom: 10
    },
    modifyElement: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    inputText: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: colors.cyan,
        fontSize: 20,
        color: colors.blue
    },
    icon: {
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
    buttonImage: {
        alignItems: 'center'
    },
    button: {
        alignItems: 'center',
        paddingVertical: 12,
        backgroundColor: colors.red,
        borderRadius: 5
    },
    textButton: {
        fontSize: 20,
        color: colors.white
    },
    realizedScene: {
        backgroundColor: colors.green
    },
})

export default Thumbnail