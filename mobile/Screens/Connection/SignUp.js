import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    StyleSheet
} from "react-native";
import colors from "../../Util/colors";
import ajax from "../../Util/Fetch"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faCircleCheck,
    faCircleXmark
} from '@fortawesome/free-solid-svg-icons';

const handleRegister = async (userName, email, password, confirmPassword, emailValid, navigation) => {
    if (!userName.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
        Alert.alert('Attention', 'Tous les champs doivent être remplit.')
    } else if (!emailValid) {
        Alert.alert('Attention', 'l\'adresse mail n\'est pas valide.')
    } else if (password != confirmPassword) {
        Alert.alert('Attention', 'Le mot de passe et la confirmation de mot de passe sont différent.')
    } else {
        const succesRegister = await ajax.register(userName, confirmPassword, email)
        if (succesRegister === 'user name exist') {
            Alert.alert('Information', 'Le nom utiisateur est déjà existant.\nVeuillez choisir un nom utilisateur valide.')
        }
        if (succesRegister === 'email exist') {
            Alert.alert('Information', 'L\'adresse mail est déjà utiliser.\nVeuillez choisir une adresse mail valide.')
        }
        if (succesRegister === 'succes') {
            Alert.alert('Information', 'Votre compte à bien été créé', [
                {
                    text: 'Ok',
                    onPress: () => {
                        navigation.navigate('Connexion')
                    }
                }
            ])
        }
    }
}

export default function SignUp({ navigation }) {
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [emailValid, setEmailValid] = useState(null)

    const validateEmail = (text) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        setEmailValid(reg.test(text))
        setEmail(text)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Nom utilisateur :</Text>
            <TextInput style={styles.inputText}
                onChangeText={(e) => setUserName(e)} />
            <View style={{ flexDirection: 'row', alignItems: "center" }}>
                <Text style={styles.text}>Adresse mail :</Text>
                {
                    emailValid != null ?
                        <FontAwesomeIcon icon={emailValid ? faCircleCheck : faCircleXmark}
                            style={styles.icon(emailValid)} size={25} />
                        :
                        <></>
                }
            </View>
            <TextInput style={styles.inputText}
                onChangeText={validateEmail}
                keyboardType={'email-address'}
            />
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
            <TouchableOpacity onPress={() => handleRegister(userName, email, password, confirmPassword, emailValid, navigation)}>
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