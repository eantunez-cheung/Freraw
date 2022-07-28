import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Alert,
    StyleSheet,
} from 'react-native'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faTrashAlt,

} from '@fortawesome/free-solid-svg-icons';

import colors from "../../Util/colors";

const handleRemoveStoryboard = (id, nameStoryboard, removeStoryboard) => {
    Alert.alert('Confirmation de suppression', `Êtes-vous sûr de vouloir supprimer la liste "${nameStoryboard}" ?`, [
        {
            text: "Oui",
            onPress: () => removeStoryboard(id)
        },
        {
            text: "Non",
        }
    ])
}

const DeleteStoryboard = ({ list, removeStoryboard }) => {
    return (
        list.map((item, index) => (
            <View key={index} style={styles.button}>
                <Text style={styles.text}>{item.nameStoryboard}</Text>
                <TouchableOpacity key={index} onPress={() => handleRemoveStoryboard(item.id, item.nameStoryboard, removeStoryboard)}>
                    <FontAwesomeIcon icon={faTrashAlt} style={styles.icon} size={25} />
                </TouchableOpacity>
            </View>
        ))
    )
}

const styles = StyleSheet.create({
    button: {
        borderBottomWidth: 2,
        padding: 15,
        alignItems: "center",
        borderColor: colors.blue,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    text: {
        fontSize: 20,
        color: colors.blue,
        fontWeight: 'bold'
    },
    icon: {
        color: colors.red
    }
})

export default DeleteStoryboard