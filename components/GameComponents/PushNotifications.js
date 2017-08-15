import FCM from "react-native-fcm";


export function sendPN () {
  FCM.presentLocalNotification({
    vibrate: 500,
    title: 'Assassin Alert!',
    sound: 'run_notification.mp3',
    body: 'RUN!!!',
    color: '#ff0000',
    priority: "high",
    show_in_foreground: true,
    // picture: 'https://firebase.google.com/_static/af7ae4b3fc/images/firebase/lockup.png'
  });
}

/* in order to use this, just...
      import {sendPN} from './GameComponents/PushNotifications'
    wherever it goes.

    Some documentation for when it is called, hopefully not to spam the user

    https://github.com/evollu/react-native-fcm

*/
