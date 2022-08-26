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
import ajax from "../../Util/Fetch";

const handleConnection = async (userName, setUserName, password, setPassword, navigation) => {
    if (!userName.trim() || !password.trim()) {
        Alert.alert('Information', 'Le nom utilisateur et le mot de passe ne doivent pas être vide.', [
            {
                text: 'Ok'
            }
        ])
    } else {
        let user = await ajax.login(userName, password)
        if (!user.userExist) {
            Alert.alert('Information', 'Nom utilisateur et/ou le mot de passe incorrecte.', [
                {
                    text: 'Ok',
                    onPress: () => {
                        setPassword('')
                    }
                }
            ])
        } else {
            setUserName('')
            setPassword('')
            navigation.navigate('Menu', { userId: user.userId, profil: user.profil, basketId: user.basketId })
        }

    }
}

export default function SignIn({ navigation }) {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenue sur Freraw</Text>
            <View style={styles.viewInputText}>
                <TextInput style={styles.inputText}
                    value={userName}
                    placeholder="Nom utilisateur"
                    placeholderTextColor={colors.gray}
                    onChangeText={(e) => setUserName(e)} />
                <TextInput style={styles.inputText}
                    value={password}
                    placeholder="mot de passe"
                    placeholderTextColor={colors.gray}
                    secureTextEntry={true}
                    onChangeText={(e) => setPassword(e)} />
            </View>
            <TouchableOpacity onPress={() => handleConnection(userName, setUserName, password, setPassword, navigation)}>
                <View style={styles.buttonConnection}>
                    <Text style={styles.textButton}>Connexion</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Inscription')}>
                <View style={styles.buttonInscription}>
                    <Text style={styles.textButton}>Inscription</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Alert.alert('Information', 'Attention en mode hors-connexion, vous n\'auriez pas accès au photo que vous avez acheté.', [
                {
                    text: 'Continuer',
                    onPress: () => navigation.navigate('Menu', { userId: null, profil: null })
                },
                {
                    text: 'Annuler',
                }
            ])}>
                <View style={styles.buttonOffline}>
                    <Text style={styles.textButtonOffline}>Mode hors-connexion</Text>
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
    title: {
        color: colors.blue,
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 25,
        marginBottom: 20
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
    buttonConnection: {
        backgroundColor: colors.cyan,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'center',
        padding: 10,
        marginTop: 10,
        borderRadius: 5
    },
    buttonInscription: {
        backgroundColor: colors.blue,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'center',
        padding: 12,
        marginTop: 20,
        borderRadius: 5
    },
    buttonOffline: {
        borderWidth: 5,
        borderColor: colors.blue,
        backgroundColor: colors.white,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'center',
        padding: 12,
        marginTop: 20,
        borderRadius: 5
    },
    textButton: {
        color: colors.white,
        fontSize: 20
    },
    textButtonOffline: {
        color: colors.blue,
        fontSize: 20
    },
})