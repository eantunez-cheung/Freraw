import React, { useState } from "react";
import {
    View,
    ScrollView,
    Text,
    Image,
    Dimensions,
    StyleSheet
} from "react-native";
import YoutubeIframe from "react-native-youtube-iframe";
import { useNetInfo } from "@react-native-community/netinfo";

import colors from "../../Util/colors";

const DetailsTip = ({ route, navigation }) => {
    const [tip, setTip] = useState(route.params.tip)
    const netInfo = useNetInfo()

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>{tip.name}</Text>
                {
                    tip.description.map((item, index) => (
                        <View key={index}>
                            <Text style={styles.text}>{item.text}</Text>
                            {
                                item.videoId.trim() ?
                                    netInfo.isConnected ?
                                        <YoutubeIframe height={250}
                                            play={false}
                                            videoId={item.videoId}
                                            webViewStyle={{ opacity: 0.99 }} />
                                        :
                                        <View style={styles.netEmpty}>
                                            <Text style={styles.text}>Veuillez activer Internet pour avoir accès à la vidéo !</Text>
                                        </View>
                                    :
                                    <></>
                            }
                            {
                                tip.array.length ?
                                    <ScrollView horizontal={true}>
                                        {
                                            tip.array.map((item, indexColumn) => (
                                                <View key={indexColumn}>
                                                    {
                                                        item.map((value, indexRow) => (
                                                            <View key={indexRow} style={styles.containerTextArray(indexRow)}>
                                                                <Text style={styles.textArray}>{value}</Text>
                                                            </View>
                                                        ))
                                                    }
                                                </View>
                                            ))
                                        }
                                    </ScrollView>
                                    :
                                    <></>
                            }
                        </View>
                    ))
                }
                {
                    tip.image.trim() ?
                        <View>
                            <Text style={styles.text}>Illustration :</Text>
                            <Image style={styles.image} source={{ uri: tip.image }} />
                        </View>
                        :
                        <></>
                }
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 10
    },
    title: {
        textAlign: 'center',
        fontSize: 25,
        color: colors.blue,
        fontWeight: 'bold',
        paddingBottom: 10,
    },
    text: {
        fontSize: 20,
        color: colors.blue,
        paddingBottom: 5
    },
    image: {
        width: 'auto',
        height: Dimensions.get('screen').width,
        borderRadius: 5,
    },
    containerTextArray: (indexRow) => ({
        borderWidth: 2,
        justifyContent: "center",
        width: 100,
        height: (indexRow === 0 ? 80 : null),
        backgroundColor: (indexRow % 2 === 0 ? colors.blue : colors.cyan),
        borderColor: colors.white,

    }),
    textArray: {
        fontSize: 20,
        color: colors.white,
        textAlign: 'center',
    },
    netEmpty: {
        height: 250,
        alignItems: 'center',
        justifyContent: "center",
        borderWidth: 5,
        padding: 5,
        borderRadius: 10,
        borderColor: colors.cyan
    }
})

export default DetailsTip