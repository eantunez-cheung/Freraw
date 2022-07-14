import React from "react";
import {
    View,
    Text,
    TouchableWithoutFeedback,
    StyleSheet
} from "react-native"
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import colors from "../../Util/colors";



const documents = [
    { name: "Droit à l'image" },
    { name: "Droit de vol" },
    { name: "Décharge de responsabilité" },
]

export default function ChooseDocument({ setCreateFileIsClicked, indexFolder, nameFolder, navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.containerButton}>
                {documents.map((document, index) => (
                    <TouchableWithoutFeedback key={index} onPress={() => {
                        setCreateFileIsClicked(false)
                        navigation.navigate('Document',
                            {
                                nameFolder,
                                headerName: document.name,
                                indexFolder
                            })
                    }}>
                        <View style={styles.button}>
                            <Text style={styles.textButton}>{document.name}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                ))}
            </View>
            <TouchableWithoutFeedback onPress={() => setCreateFileIsClicked(false)}>
                <View style={styles.backButton}>
                    <Text style={styles.textBackButton}>Retour</Text>
                </View>
            </TouchableWithoutFeedback>
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
    containerButton: {
        backgroundColor: colors.white
    },
    button: {
        padding: 10
    },
    textButton: {
        fontSize: 20,
        color: colors.blue
    },
    backButton: {
        backgroundColor: colors.red,
        padding: 10,
        alignItems: 'center'
    },
    textBackButton: {
        fontSize: 20,
        color: colors.white
    }
})