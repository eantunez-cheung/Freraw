import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from "react-native"

import colors from "../../Util/colors";

export default function LegalDocuments({ navigation }) {

    return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => navigation.navigate('Mes documents')}>
                    <View style={styles.button}>
                        <Text style={styles.textButton}>Mes documents</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Dossiers client')}>
                    <View style={styles.button}>
                        <Text style={styles.textButton}>Dossiers client</Text>
                    </View>
                </TouchableOpacity>
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
    },
    button: {
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: colors.blue,
        marginBottom: 10,
        borderRadius: 5
    },
    textButton: {
        fontSize: 20,
        color: colors.white
    }
})