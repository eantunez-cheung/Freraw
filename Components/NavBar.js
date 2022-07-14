import React from "react";
import {
    TouchableOpacity,
    StyleSheet,
    View,
    Alert
} from 'react-native'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

import colors from "../Util/colors";

const NavBar = ({ elementNavBar, activeMenu, setActiveMenu, array = [], setArray }) => (
    <View style={styles.containerNavBar}>
        {
            elementNavBar.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    style={[styles.buttonNavBar(elementNavBar.length), (activeMenu === item.activeMenu ? styles.activeMenu : '')]}
                    onPress={() => {
                        if (!array.length) {
                            setActiveMenu(item.activeMenu)
                        } else {
                            Alert.alert('Information', `Attention, en changent de page, les données que vous avez saisi seront effacé.\nÊtes vous sur de vouloir continuer ?`, [
                                {
                                    text: "Annuler",
                                    style:'destructive'
                                },
                                {
                                    text: "Continuer",
                                    onPress: () => {
                                        setActiveMenu(item.activeMenu)
                                        setArray([])
                                    }
                                }
                            ])
                        }
                    }
                    }
                >
                    <FontAwesomeIcon icon={item.icon} style={styles.icon} size={25} />
                </TouchableOpacity>
            ))
        }
    </View>
)

const styles = StyleSheet.create({
    containerNavBar: {
        flexDirection: 'row',
        borderTopWidth: 3,
        borderColor: colors.blue,
    },
    buttonNavBar: (nbOfbtn) => ({
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        padding: 12,
        width: wp(100 / nbOfbtn),
        backgroundColor: colors.cyan
    }),
    activeMenu: {
        backgroundColor: colors.blue
    },
    icon: {
        color: colors.white
    }
})

export default NavBar