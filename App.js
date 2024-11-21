
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as Notifications from 'expo-notifications';

export default function App() {
  const [ hasPermission, setHasPermission ] = useState(false);


  useEffect(() => {
    async function getPermissions() {
      const { status } = await Notifications.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    }
    getPermissions();
    Notifications.cancelAllScheduledNotificationsAsync();
  }, []);

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text>Notification permissions not granted.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={async ()=>{
          await Notifications.scheduleNotificationAsync({
            content: {
              title: "week 12 notify",
              body: "Here is your notification!",
            },
            trigger: {
              type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
              seconds: 15
            }
          })
          const pending = Notifications.getAllScheduledNotificationsAsync();
          console.log('Pending Notifications', pending)
        }}
      >
        <Text>Schedule Notification (15s)</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});