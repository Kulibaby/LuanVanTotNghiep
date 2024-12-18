import { Text, View } from "react-native";
import Login from './../components/Login'
import { registerForPushNotificationsAsync } from './../Notification/NotificationConfig';
import { useEffect } from 'react';

export default function Index() {

  useEffect(() => {
    const setupNotifications = async () => {
      const token = await registerForPushNotificationsAsync();
      if (token) {
        console.log("Push Notification Token:", token);
      } else {
        console.log("Unable to get push notification token.");
      }
    };

    setupNotifications();
  }, []);

  return (
    <View>
      <Login />
    </View>
  );
}
