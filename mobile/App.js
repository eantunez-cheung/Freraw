import React from 'react';
import { StatusBar } from 'react-native'
import { Provider } from 'react-redux';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { PersistGate } from 'redux-persist/integration/react';
import RNBootSplash from 'react-native-bootsplash';

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
            <Stack.Screen name='Freraw' component={Menu}
              options={{
                headerTitleStyle: {
                  fontFamily: "pirulen rg",
                  fontSize: 30
                }
              }} />
            <Stack.Screen name='Photographe' component={Photographer} />
            <Stack.Screen name='Mes photos' component={MyPhoto} options={{ title: 'Photographe' }} />
            <Stack.Screen name='Storyboard' component={Videographer} />
            <Stack.Screen name='D??tails-Storyboard' component={DetailStoryboard} options={{ title: 'Storyboard' }} />
            <Stack.Screen name='Check-List' component={Checklist} options={{ title: 'Mes Listes' }} />
            <Stack.Screen name='D??tail-Liste' component={DetailList} options={{ title: 'D??tail de la liste' }} />
            <Stack.Screen name='Documents juridique' component={LegalDocuments} />
            <Stack.Screen name='Document' component={Document} />
            <Stack.Screen name='Mes documents' component={MyDocuments} />
            <Stack.Screen name='Dossiers client' component={ClientFolders} />
            <Stack.Screen name='Fichiers client' component={ClientFiles} />
            <Stack.Screen name='Tips et astuces' component={Tips} />
            <Stack.Screen name='D??tails tip' component={DetailsTip} options={{ title: 'Tips et astuces' }} />
            <Stack.Screen name='Faire un don' component={Donation} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};