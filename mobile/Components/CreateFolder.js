import React, { useState } from 'react'
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert
} from 'react-native'

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'

import colors from '../Util/colors'

const handleSubmit = (setCreateFolderIsClicked, createFolder, nameFolder) => {
    if (nameFolder.trim()) {
        createFolder(nameFolder, [])
        setCreateFolderIsClicked(false)
    } else {
        Alert.alert('Erreur', 'Le dossier doit avoir un nom !')
    }

}

const CreateFolder = ({ setCreateFolderIsClicked, createFolder }) => {
    const [nameFolder, setNameFolder] = useState('')

    return (
        <View style={styles.container}>
            <View style={styles.containerCreateFolder}>
                <TextInput style={styles.inputText}
                    onChangeText={e => setNameFolder(e)}
                    placeholder='Nom du dossier'
                    placeholderTextColor={colors.grey} />
                <TouchableOpacity onPress={() => handleSubmit(setCreateFolderIsClicked, createFolder, nameFolder)}>
                    <View style={styles.button}>
                        <Text style={styles.textButton}>Créer</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setCreateFolderIsClicked(false)}>
                    <View style={styles.backButton}>
                        <Text style={styles.textButton}>Retour</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        zIndex: 1,
        position: "absolute",
        justifyContent: 'center',
        width: wp(100),
        height: hp(100),
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        paddingHorizontal: 12
    },
    containerCreateFolder: {
        borderRadius: 5,
        backgroundColor: colors.white,
        padding: 10
    },
    inputText: {
        borderWidth: 1,
        fontSize: 20,
        marginBottom: 12,
        borderRadius: 5,
        padding: 10,
        borderColor: colors.cyan,
        color: colors.blue
    },
    button: {
        backgroundColor: colors.blue,
        alignItems: 'center',
        borderRadius: 5,
        paddingVertical: 10,
        marginBottom: 10
    },
    backButton: {
        backgroundColor: colors.red,
        alignItems: 'center',
        borderRadius: 5,
        paddingVertical: 10
    },
    textButton: {
        fontSize: 20,
        color: colors.white
    },
})

export default CreateFolder