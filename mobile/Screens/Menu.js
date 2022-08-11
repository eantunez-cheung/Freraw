import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faCamera,
    faBalanceScale,
    faBook,
    faVideo,
    faTasks,
    faEuroSign
} from '@fortawesome/free-solid-svg-icons';

import colors from "../Util/colors";

const module = [
    { title: "Photographe", icon: faCamera },
    { title: "Storyboard", icon: faVideo },
    { title: "Check-List", icon: faTasks },
    { title: "Tips et astuces", icon: faBook },
    { title: "Documents juridique", icon: faBalanceScale },
    { title: "Faire un don", icon: faEuroSign },
]

export default function Menu({ navigation, route }) {
    const userId = route.params.userId
    const profil = route.params.profil

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenue Fréraw</Text>
            {
                module.map((item, index) => (
                    <TouchableOpacity key={index} onPress={() => navigation.navigate(item.title, {userId, profil})}>
                        <View style={styles.button(index)}>
                            <FontAwesomeIcon icon={item.icon} style={styles.icon} size={30} />
                            <Text style={styles.textButton}>{item.title}</Text>
                        </View>
                    </TouchableOpacity>
                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
        marginHorizontal: 12
    },
    title: {
        color: colors.blue,
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 25
    },
    button: (index) => ({
        backgroundColor: (index % 2 === 0 ? colors.blue : colors.cyan),
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        marginTop: 20,
        borderRadius: 5
    }),
    icon: {
        color: colors.white,
        marginRight: 15
    },
    textButton: {
        color: colors.white,
        fontSize: 20
    }
})