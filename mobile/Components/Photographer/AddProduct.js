import React, { useState } from "react";
import {
    View,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    Dimensions,
    Alert,
    StyleSheet
} from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faPlusSquare,
} from '@fortawesome/free-solid-svg-icons';
import { launchImageLibrary } from 'react-native-image-picker';
import { Dropdown } from 'react-native-element-dropdown';

import colors from "../../Util/colors";
import ajax from "../../Util/Fetch"

const pickImage = async (setImage) => {
    await launchImageLibrary({
        mediaType: 'photo',
        quality: 1
    }, (response) => {
        if (!response.didCancel) {
            let imageFile = response.assets.find(obj => obj)
            // console.log(imageFile)
            setImage(imageFile)
        }
    })
}

const handleSave = async (productName, image, price, orientation, priceValid, navigation) => {
    if (!productName.trim() || image === null || !price.trim() || !orientation.trim()) {
        Alert.alert('Attention', 'Tous les champs sont doivent être remplit.')
    } else if (!priceValid) {
        Alert.alert('Attention', 'Le format du prix est incorrecte. ex : 1.05, 10.90')
    } else {
        let response = await ajax.uploadProduct(productName, image, price, orientation)
        // console.log(response)
    }
}

export default function AddProduct({ navigation }) {
    const [items, setItems] = useState([
        { label: 'Paysage', value: 'paysage' },
        { label: 'Portrait', value: 'portrait' },
    ])
    const [productName, setProductName] = useState('')
    const [image, setImage] = useState(null)
    const [price, setPrice] = useState('')
    const [priceValid, setPriceValid] = useState(null)
    const [orientation, setOrientation] = useState(null)
    // console.log(priceValid)
    // console.log(image)

    const validatePrice = text => {
        const reg = /^([0-9]{1,})?(\.)?([0-9]{1,})?$/
        setPriceValid(reg.test(text))
        setPrice(text)
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.text}>Nom du produit :</Text>
            <TextInput style={styles.inputText}
                onChangeText={e => setProductName(e)}
            />
            <Text style={styles.text}>Image :</Text>
            {
                image === null ?
                    <TouchableOpacity onPress={() => pickImage(setImage)}>
                        <View style={styles.buttonImage}>
                            <FontAwesomeIcon icon={faPlusSquare} style={styles.icon} size={80} />
                        </View>
                    </TouchableOpacity>
                    :
                    <View>
                        <Image style={styles.image} source={{ uri: image.uri }} />
                        <TouchableOpacity onPress={() => setImage(null)}>
                            <View style={styles.buttonDelete}>
                                <Text style={styles.textButton}>Supprimer image</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
            }
            <Text style={styles.text}>Orientation de l'image :</Text>
            <Dropdown
                data={items}
                labelField={'label'}
                valueField={'value'}
                onChange={item => setOrientation(item.value)}
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                placeholder={'Sélectionner l\'orientation'}
            />
            <Text style={styles.text}>Prix :</Text>
            <TextInput style={styles.inputText}
                placeholder={'00.00'}
                placeholderTextColor={colors.gray}
                onChangeText={validatePrice}
                keyboardType={'decimal-pad'}
            />
            <TouchableOpacity onPress={() => handleSave(productName, image, price, orientation, priceValid, navigation)}>
                <View style={styles.buttonSave}>
                    <Text style={styles.textButton}>Enregistrer produit</Text>
                </View>
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 10
    },
    inputText: {
        borderWidth: 1,
        fontSize: 20,
        marginTop: 5,
        marginBottom: 12,
        borderRadius: 5,
        padding: 10,
        borderColor: colors.cyan,
        flexGrow: 1,
        color: colors.blue
    },
    text: {
        fontSize: 20,
        textDecorationLine: 'underline',
        color: colors.blue,
        paddingBottom: 5
    },
    dropdown: {
        height: 50,
        borderColor: colors.blue,
        borderWidth: 3,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginBottom: 10
    },
    placeholderStyle: {
        fontSize: 20,
        color: colors.gray
    },
    selectedTextStyle: {
        fontSize: 20,
        color: colors.blue
    },
    image: {
        width: 'auto',
        height: Dimensions.get('window').width / 2,
        borderRadius: 5,
        marginBottom: 10
    },
    buttonImage: {
        alignItems: 'center'
    },
    icon: {
        color: colors.blue
    },
    buttonDelete: {
        alignItems: 'center',
        paddingVertical: 12,
        borderRadius: 5,
        backgroundColor: colors.red,
        marginBottom: 10
    },
    buttonSave: {
        alignItems: 'center',
        paddingVertical: 12,
        borderRadius: 5,
        backgroundColor: colors.cyan
    },
    textButton: {
        fontSize: 20,
        color: colors.white
    },
})