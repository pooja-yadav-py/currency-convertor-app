import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  Pressable,
  Text,
  StatusBar,
  FlatList,
  StyleSheet,
  Platform,
  Alert,
  ToastAndroid,
  ScrollView,
} from 'react-native';

import { currencyData } from './assets/constant';
import  CurrencyButton  from './components/CurrencyButton';

export default function App() {
  const [inputValue, setInputValue] = useState('');
  const [resultVlaue, setResultVlaue] = useState('');
  const [targetCurrency, setTargetCurrency] = useState('');

  const buttonPressed = (targetVlaue) => {
    if (!inputValue) {
      showToast('Enter a value to convert');
      return;
    }

    const inputAmount = parseFloat(inputValue);
    if (!isNaN(inputAmount)) {
      const convertedValue = inputAmount * targetVlaue.value;
      const result = `${targetVlaue.symbol} ${convertedValue.toFixed(2)}`;
      setResultVlaue(result);
      setTargetCurrency(targetVlaue.currency) // ✅ Fixed name
    } else {
      showToast('Not a valid number to convert');
      return;
    }
  };

  const showToast = (message) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Alert.alert('Message', message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.rupeeContainer}>
            <Text style={styles.rupee}>₹</Text>
            <TextInput
              maxLength={14}
              value={inputValue}
              clearButtonMode="always"
              onChangeText={setInputValue} // ✅ fixed
              keyboardType="number-pad" // ✅ fixed
              placeholder="Enter amount in Rupees"
              style={{ flex: 1, fontSize: 18 }}
            />
          </View>
          {resultVlaue ? (
            <Text style={styles.resultText}>{resultVlaue}</Text>
          ) : null}
        </View>

        {/* Wrap FlatList in View with height */}
        <View style={{ flex: 1,justifyContent:'center',alignItems:'center',marginVertical:45 }}>
          <FlatList
            numColumns={3}
            data={currencyData}
            keyExtractor={(item) => item.country}
            contentContainerStyle={{ paddingBottom: 20 }}
            renderItem={({ item }) => (
              <Pressable
                style={[
                  styles.button,
                  targetCurrency === item.country && styles.selected,
                ]}
                onPress={() => buttonPressed(item)}
              >
                <CurrencyButton {...item} />
              </Pressable>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF2F2',
  },
  topContainer: {
    marginTop: 50,
    paddingHorizontal: 20,
    width: '100%',
  },
  rupeeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  rupee: {
    fontSize: 24,
    marginRight: 10,
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 10,
  },
  button: {
    margin: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    width: 100,
  },
  selected: {
    backgroundColor: '#F4BE2C',
  },
});
