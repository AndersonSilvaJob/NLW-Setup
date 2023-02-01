import './src/lib/dayjs';
import { StatusBar, Button } from 'react-native';
import {useFonts,
        Inter_400Regular,
        Inter_600SemiBold,
        Inter_700Bold,
        Inter_800ExtraBold
       } from '@expo-google-fonts/inter';

import { Loading } from './src/components/Loading';
import { Routes } from './src/routes';
import * as Notifications  from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false
  }),
})

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold
  });

  async function scheuldNotification(){
    const trigger = new Date(Date.now());
    trigger.setMinutes(trigger.getMinutes() + 1);

    await Notifications.scheduleNotificationAsync({
      content :{ 
        title: "Seguimos Firmes!💪",
        body: "Você já praticou seus habitos hoje?"
      },
      trigger
    })
  }

  async function getScheuldNotification() {
    const schedules = await Notifications.getAllScheduledNotificationsAsync();
    console.log(schedules);
  }
  if(!fontsLoaded){
    return(
    <Loading />
    );
  }

  return (
    <>
      <Routes />
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent/>  
    </>
  );
}

//<Button title='Enviar Notificação' onPress={scheuldNotification}/>
//      <Button title='Enviar Notificação' onPress={scheuldNotification}/>
//<Button title='agendadAS' onPress={getScheuldNotification}/>

