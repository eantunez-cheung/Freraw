import React from 'react';
import { StatusBar } from 'react-native'
import { Provider } from 'react-redux';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { PersistGate } from 'redux-persist/integration/react';
import RNBootSplash from 'react-native-bootsplash';

import SignIn from './Screens/Connection/SignIn';
import SignUp from './Screens/Connection/SignUp';
import Menu from './Screens/Menu';
import Videographer from './Screens/Videographer/Videographer'
import DetailStoryboard from './Screens/Videographer/DetailStoryboard';
import Checklist from './Screens/CheckList/Ckecklist';
import DetailList from './Screens/CheckList/DetailList';
import LegalDocuments from './Screens/LegalDocuments/LegalDocuments';
import Document from './Screens/LegalDocuments/Document';
import { store, persistor } from './Util/store';
import MyDocuments from './Screens/LegalDocuments/MyDocuments';
import ClientFolders from './Screens/LegalDocuments/ClientFolders';
import ClientFiles from './Screens/LegalDocuments/ClientFiles';
import Tips from './Screens/Tips/Tips';
import DetailsTip from './Screens/Tips/DetailsTip';
import Photographer from './Screens/Photographer/Photographer';
import Donation from './Screens/Donation/Donation';
import MyPhoto from './Screens/Photographer/MyPhoto';
import colors from './Util/colors';

const Stack = createStackNavigator()

export default function App() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar
          backgroundColor={colors.blue}
          barStyle='light-content' />
        <NavigationContainer onReady={() => RNBootSplash.hide()}>
          <Stack.Navigator screenOptions={
            {
              headerStyle: {
                backgroundColor: "#2b9d8f",
              },
              headerTitleStyle: {
                fontSize: 30,
                color: "#FFFFFF",
              },
              headerTitleAlign: 'center',
              headerTintColor: "#FFFFFF"
            }}>
            <Stack.Screen name='Connexion' component={SignIn} />
            <Stack.Screen name='Menu' component={Menu}
              options={{
                title: 'Freraw',
                headerTitleStyle: {
                  fontFamily: "pirulen rg",
                  fontSize: 30
                },
                headerBackTitleVisible: true,
                headerBackTitle: 'log out',
                headerBackTitleStyle: {
                  fontSize: 15,
                  color: colors.white,
                  fontWeight: 'bold'
                }
              }} />
            <Stack.Screen name='Photographe' component={Photographer} />
            <Stack.Screen name='Mes photos' component={MyPhoto} options={{ title: 'Photographe' }} />
            <Stack.Screen name='Storyboard' component={Videographer} />
            <Stack.Screen name='Détails-Storyboard' component={DetailStoryboard} options={{ title: 'Storyboard' }} />
            <Stack.Screen name='Check-List' component={Checklist} options={{ title: 'Mes Listes' }} />
            <Stack.Screen name='Détail-Liste' component={DetailList} options={{ title: 'Détail de la liste' }} />
            <Stack.Screen name='Documents juridique' component={LegalDocuments} />
            <Stack.Screen name='Document' component={Document} />
            <Stack.Screen name='Mes documents' component={MyDocuments} />
            <Stack.Screen name='Dossiers client' component={ClientFolders} />
            <Stack.Screen name='Fichiers client' component={ClientFiles} />
            <Stack.Screen name='Tips et astuces' component={Tips} />
            <Stack.Screen name='Détails tip' component={DetailsTip} options={{ title: 'Tips et astuces' }} />
            <Stack.Screen name='Faire un don' component={Donation} />
            <Stack.Screen name='Inscription' component={SignUp} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};