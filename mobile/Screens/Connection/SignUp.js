import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from "react-native";
import colors from "../../Util/colors";
import ajax from "../../Util/Fetch"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faCircleCheck,
    faCircleXmark
} from '@fortawesome/free-solid-svg-icons';

export default function SignUp({ navigation }) {
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [emailValid, setEmailValid] = useState(null)

    const validateEmail = (text) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        setEmailValid(reg.test(text))
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Nom utilisateur :</Text>
            <TextInput style={styles.inputText} />
            <View style={{ flexDirection: 'row', alignItems: "center" }}>
                <Text style={styles.text}>Email :</Text>
                {
                    emailValid != null ?
                        <FontAwesomeIcon icon={emailValid ? faCircleCheck : faCircleXmark}
                            style={styles.icon(emailValid)} size={25} />
                        :
                        <></>
                }
            </View>
            <TextInput style={styles.inputText}
                onChangeText={validateEmail} />
            <Text style={styles.text}>Mot de passe :</Text>
            <TextInput style={styles.inputText}
                secureTextEntry={true}
                onChangeText={e => setPassword(e)} />
            <View style={{ flexDirection: 'row', alignItems: "center" }}>
                <Text style={styles.text}>confirmer mot de passe :</Text>
                {
                    confirmPassword != null ?
                        <FontAwesomeIcon icon={confirmPassword === password && confirmPassword != '' ? faCircleCheck : faCircleXmark}
                            style={styles.icon(confirmPassword === password && confirmPassword != '')} size={25} />
                        :
                        <></>
                }
            </View>
            <TextInput style={styles.inputText}
                secureTextEntry={true}
                onChangeText={(e) => setConfirmPassword(e)} />
            <TouchableOpacity>
                <View style={styles.button}>
                    <Text style={styles.textButton}>S'enregistrer</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
        marginHorizontal: 12
    },
    text: {
        fontSize: 20,
        color: colors.blue,
        textAlign: 'justify'
    },
    inputText: {
        borderWidth: 1,
        fontSize: 20,
        marginBottom: 10,
        borderRadius: 5,
        padding: 10,
        borderColor: colors.cyan,
        color: colors.blue
    },
    button: {
        paddingVertical: 10,
        backgroundColor: colors.blue,
        alignItems: 'center',
        borderRadius: 5,
    },
    textButton: {
        fontSize: 20,
        color: colors.white
    },
    icon: (valid) => ({
        color: valid ? colors.cyan : colors.red,
        marginLeft: 10
    })
})