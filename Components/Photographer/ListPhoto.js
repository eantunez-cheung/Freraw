import React, { useState } from "react";
import {
    View,
    Modal,
    Image,
    TouchableOpacity,
    Dimensions,
    StyleSheet
} from "react-native"

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faXmark,
    faAngleLeft,
    faAngleRight
} from '@fortawesome/free-solid-svg-icons';

import colors from "../../Util/colors";

const getOffset = (initOffset) => {
    if (initOffset === 0) {
        return 1
    }
    return 0
}

const ListPhoto = ({ photos, offsetScroll, setOffsetScroll }) => {
    const [selectedPhoto, setSelectedPhoto] = useState(false)
    const [heightImage, setHeightImage] = useState(null)
    const [photoUri, setPhotoUri] = useState(null)
    const [initialImage, setInitialImage] = useState(0)
    const [lastImage, setLastImage] = useState(10)
    

    const handleOpenFile = (uri, format) => {
        setPhotoUri(uri)
        if (format === "portrait") {
            setHeightImage(600)
        } else if (format === "paysage") {
            setHeightImage(300)
        }
        setSelectedPhoto(true)
    }

    const handleBack = () => {
        setInitialImage(initialImage - 10)
        setLastImage(lastImage - 10)

        setOffsetScroll(getOffset(offsetScroll))
    }
    
    const handleNext = () => {
        setInitialImage(initialImage + 10)
        setLastImage(lastImage + 10)
        setOffsetScroll(getOffset(offsetScroll))
    }

    return (
        <View style={styles.container}>
            {
                photos.slice(initialImage, lastImage).map((image, index) => (
                    <TouchableOpacity key={index} onPress={() => handleOpenFile(image.url.uri, image.format)}>
                            <Image style={styles.image} source={{ uri: image.url.uri }} />
                        </TouchableOpacity>
                ))
            }
            <View style={styles.buttonArrowContainer}>
                    <TouchableOpacity onPress={handleBack} disabled={initialImage === 0 ? true : false}>
                        <FontAwesomeIcon icon={faAngleLeft} size={30} style={initialImage === 0 ? styles.angleArrowDisabled : styles.angleArrow} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleNext} disabled={lastImage >= photos.length ? true : false}>
                        <FontAwesomeIcon icon={faAngleRight} size={30} style={lastImage >= photos.length ? styles.angleArrowDisabled : styles.angleArrow} />
                    </TouchableOpacity>
                </View>
                <Modal visible={selectedPhoto} transparent={selectedPhoto}>
                    <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedPhoto(false)}>
                        <FontAwesomeIcon icon={faXmark} size={30} style={styles.icon} />
                    </TouchableOpacity>
                    <View style={styles.modalContainer}>
                        <Image source={{ uri: photoUri }} style={styles.zoomImg(heightImage)} />
                    </View>
                </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 10
    },
    image: {
        height: Dimensions.get('window').width / 2,
        borderRadius: 5,
        marginBottom: 10,
        resizeMode: "cover"
    },
    modalContainer: {
        backgroundColor: colors.black,
        flex: 1,
        justifyContent: "center",
    },
    zoomImg: (heightImage) => ({
        height: heightImage,
    }),
    icon: {
        color: "white"
    },
    closeButton: {
        zIndex: 1,
        position: 'absolute',
        right: 2,
        top: 2
    },
    angleArrow: {
        color: colors.blue
    },
    angleArrowDisabled: {
        color: colors.grey
    },
    buttonArrowContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    }
})

export default ListPhoto