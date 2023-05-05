/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, {useCallback} from 'react';
import {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {getAsyncStorageItem, saveAsyncStorageItem} from './app/api/controller/AsyncStorage';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {DataBank} from "./app/api/model/Bank";

function App(): JSX.Element {
  const [bank, setBank] = useState(null);

  useEffect(() => {
      init();
  }, []);

    const init = async () => {
        const ini = await getAsyncStorageItem('initial');
        if (ini === undefined) {
            console.log('Remote Server');
            fetch(DataBank.URL, {
                method: DataBank.METHOD,
                headers: DataBank.HEADERS
            }).then((response) => response.json())
                .then((data) => {
                    setBank(data)
                    console.log('Remote data Server:', data);
                    try {
                        AsyncStorage.setItem("initial", JSON.stringify('False'));
                        AsyncStorage.setItem("data", JSON.stringify(data));
                        console.log('Save Data:', data);
                    } catch (e) {
                        console.warn(`Failed to save initial in AsyncStorage`, e);
                        return e;
                    }
                }).catch((error) => {
                    console.error(error);
                });
        } else {
            try {
                const recoverBank = await AsyncStorage.getItem("data");
                console.log('Recover Bank Data:', recoverBank);
                if (recoverBank != null) {
                    const value = JSON.parse(recoverBank);
                    console.log('Recover Bank value:', value);
                    if (value !== null) {
                        setBank(value);
                    }
                }
            } catch (e) {
                console.log('Failed to fetch the input from storage', e);
            }
        }
    };

  return (
      <ScrollView style={styles.sectionContainer}>
        {bank?.map((element)=>(
            <View style={styles.spaces}>
              <View style={styles.card}>
                <Text style={styles.title}>Name</Text>
                <Text style={styles.sectionTitle}>{element.bankName}</Text>
                <Text style={styles.title}>Description </Text>
                <Text style={styles.sectionTitle}>{element.description}</Text>
                <Text style={styles.title}>Age</Text>
                <Text style={styles.sectionTitle}>{element.age}</Text>
                <Text style={styles.title}>Url</Text>
                <Text style={styles.sectionTitle}>{element.url}</Text>
                </View>
            </View>
        ))}
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 50,
    paddingHorizontal: 24,
  },
  spaces: {
    marginTop: 30
  },
  title: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: '400',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '200',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '200',
  },
  highlight: {
    fontWeight: '700',
  },
  card: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10
  }
});

export default App;
