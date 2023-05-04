/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useCallback} from 'react';
import {useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

function App(): JSX.Element {
  const [bank, setBank] = useState(null);

  useEffect(() => {
    fetch('https://dev.obtenmas.com/catom/api/challenge/banks', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((response) => response.json())
        .then((data) => {
          setBank(data)
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });
  }, []);

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
