import React, { useState } from "react";
import {
    View,
    ScrollView,
    Modal,
    TouchableOpacity,
    Image,
    Text,
    Dimensions,
    Alert,
    StyleSheet
} from 'react-native'
import { connect } from "react-redux";
import { launchImageLibrary } from 'react-native-image-picker'
import ImageViewer from "react-native-image-zoom-viewer";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";


import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faXmark
} from '@fortawesome/free-solid-svg-icons';

import colors from "../../Util/colors";
import { removeMyPhoto, updateMyPhoto } from "../../Util/actions";

const MyPhoto = ({ route, myPhoto, addMyPhoto, deletePhoto }) => {
    const [modalIsVisible, setModalIsVisible] = useState(false)
    const [modalIsTransparent, setModalIsTransparent] = useState(false)
    const [currentIndex, setCurrentIdex] = useState(0)
    const folder = myPhoto.find(folder => folder.id === route.params.idFolder)

    const handleChooseImage = (imageIndex) => {
        setCurrentIdex(imageIndex)
        setModalIsVisible(true)
        setModalIsTransparent(true)
    }

    const handleAddPhoto = async (indexFolder) => {
        await launchImageLibrary({
            mediaType: 'photo',
            quality: 1,
        }, (response) => {
            if (!response.didCancel) {
                let source = response.assets.find(obj => obj).uri
                // console.log(response)
                addMyPhoto(indexFolder, { url: source })
            }
        })
    }

    const handleRemovePhoto = (indexFolder, indexFile) => {
        Alert.alert('Confirmation de suppression', `Êtes-vous sûr de vouloir supprimer cette image ?`, [
            {
                text: "Oui",
                onPress: () => deletePhoto(indexFolder, indexFile)
            },
            {
                text: "Non",
            }
        ])
    }
    // console.log(folder)
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{folder.nameFolder}</Text>
            <TouchableOpacity onPress={() => handleAddPhoto(route.params.indexFolder)}>
                <View style={styles.button}>
                    <Text style={styles.textButton}>Ajouter photo</Text>
                </View>
            </TouchableOpacity>
            <ScrollView style={styles.scrollview}>
                {
                    folder.files.map((image, index) => (
                        <TouchableOpacity key={index} onPress={() => handleChooseImage(index)}>
                            <TouchableOpacity style={styles.deleteButton} onPress={() => handleRemovePhoto(route.params.indexFolder, index)}>
                                <FontAwesomeIcon style={styles.icon} icon={faXmark} size={30} />
                            </TouchableOpacity>
                            <Image style={styles.image} source={{ uri: image.url }} />
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>
            <Modal visible={modalIsVisible} transparent={modalIsTransparent}>
                <ImageViewer
                    imageUrls={folder.files}
                    index={currentIndex}
                    onClick={() => {
                        setModalIsVisible(false)
                        setModalIsTransparent(false)
                    }} />
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 10
    },
    scrollview: {
        height: hp(75),
    },
    image: {
        height: Dimensions.get('window').width / 2,
        borderRadius: 5,
        marginBottom: 10,
        resizeMode: "cover"
    },
    button: {
        alignItems: 'center',
        paddingVertical: 12,
        backgroundColor: colors.blue,
        borderRadius: 5,
        marginBottom: 10
    },
    textButton: {
        fontSize: 20,
        color: colors.white
    },
    deleteButton: {
        zIndex: 1,
        position: 'absolute',
        right: 0,
        padding: 3,
        backgroundColor: colors.red,
        borderRadius: 5
    },
    icon: {
        color: colors.white
    },
    title: {
        fontSize: 25,
        color: colors.blue,
        textAlign: 'center',
        fontWeight: 'bold'
    },
})

const mapStateProps = state => ({
    myPhoto: state.myPhoto
})

const mapDispatchProps = dispatch => ({
    addMyPhoto(indexFolder, url) {
        dispatch(updateMyPhoto(indexFolder, url))
    },
    deletePhoto(indexFolder, indexFile) {
        dispatch(removeMyPhoto(indexFolder, indexFile))
    }
})

export default connect(mapStateProps, mapDispatchProps)(MyPhoto)