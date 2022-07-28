import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet
} from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'


import SignatureCapture from "react-native-signature-capture";
import colors from "../../Util/colors";


const Signature = ({ onChange, document }) => {

    const _onSaveEvent = (result) => {
        onChange({
            ...document,
            signature: `data:image/png;base64,${result.encoded}`
        })
    }

    return (
        <View style={styles.container}>
            {
                !document.signature.trim() ?
                    <View style={styles.signature}>
                        <SignatureCapture
                            style={{ flex: 1 }}
                            onSaveEvent={_onSaveEvent}
                            saveImageFileInExtStorage={false}
                            showNativeButtons={true}
                            showTitleLabel={false}
                            backgroundColor={colors.white}
                            strokeColor={colors.blue}
                            minStrokeWidth={5}
                            maxStrokeWidth={5}
                            viewMode={"paysage"} />
                    </View>
                    :
                    <View>
                        <Image style={styles.image} source={{ uri: document.signature }} />
                        <TouchableOpacity onPress={() => onChange({
                            ...document,
                            signature: ''
                        })}>
                            <View style={styles.button}>
                                <Text style={styles.textButton}>Effacer signature</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 220,
    },
    signature: {
        flex: 1,
        maxHeight: 200,
        borderWidth: 2,
        borderColor: colors.red,
        borderRadius: 5
    },
    image: {
        width: 'auto',
        height: 150,
        borderRadius: 5,
        marginBottom: 10,
    },
    button: {
        paddingVertical: 10,
        alignItems: 'center',
        backgroundColor: colors.red,
        borderRadius: 5
    },
    textButton: {
        fontSize: 20,
        color: colors.white
    }
})

export default Signature