import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, } from 'react-native';
import * as Notifications from 'expo-notifications';

export default function App() {
  const [ hasPermission, setHasPermission ] = useState(false);
  const [ date, setDate ] = useState(new Date());
  const [ inputText, setInputText ] = useState('');


  useEffect(() => {
    async function getPermissions(){
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

      <DateTimePicker
        value={date}
        mode="date"
        onChange={(evt, newDate) => {
          // update Y/M/D, keep H/M
          setDate(new Date(newDate.getFullYear(),
            newDate.getMonth(),
            newDate.getDate(),
            date.getHours(),
            date.getMinutes()));
        }}
      />
      <DateTimePicker
        value={date}
        mode="time"
        onChange={(evt, newDate) => {
          // keep Y/M/D, update H/M
          setDate(new Date(date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            newDate.getHours(),
            newDate.getMinutes()));
        }}
      />

      <TextInput
        style={{
          width: '80%',
          borderBottomWidth: 1,
          borderBottomColor: 'gray',
          padding: '3%'
        }}
        value={inputText}
        onChangeText={(text)=>{setInputText(text)}}
        placeholder="Remind me..."
      />
      <TouchableOpacity
        onPress={async ()=>{
          await Notifications.scheduleNotificationAsync({
            content: {
              title: "week 12 notify",
              body: inputText,
            },
            trigger: {
              type: Notifications.SchedulableTriggerInputTypes.DATE,
              date: date,
            }
          })
        }}
      >
        <Text>Schedule Notification</Text>
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