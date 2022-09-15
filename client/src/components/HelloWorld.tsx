import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useApiContext } from '@providers/ApiProvider';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const HelloWorld = () => {
  const { getJson } = useApiContext();
  const [msg, setMsg] = React.useState('Loading...');

  const fetchMessage = React.useCallback(async () => {
    // Make the API call
    const { msg } = await getJson<{ msg: string }>('/');
    setMsg(msg);
  }, [getJson]);

  React.useEffect(() => {
    fetchMessage();
  }, []);

  return (
    <View style={styles.container}>
      <Text>{msg}</Text>
      <Button
        onPress={() => fetchMessage()}
        title="Refresh"
        color="#841584"
        accessibilityLabel="Refresh"
      />
      <StatusBar style="auto" />
    </View>
  );
};
