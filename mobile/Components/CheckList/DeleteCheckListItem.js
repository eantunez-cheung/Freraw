import React from "react";
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';

import colors from "../../Util/colors";

const DeleteCheckListItem = ({ item, onPress }) => (
    <View style={styles.container}>
        <Text style={styles.text}>{item.nameList}</Text>
        <TouchableOpacity onPress={onPress}>
            <FontAwesomeIcon icon={faTrashAlt} style={styles.icon} size={25} />
        </TouchableOpacity>
    </View>
)

const styles = StyleSheet.create({
    container: {
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

export default DeleteCheckListItem