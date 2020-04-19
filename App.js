import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  Dimensions,
  Platform,
  ScrollView
} from 'react-native';
import Todo from './Todo';

const { height, width } = Dimensions.get('window');

export default function App() {

  const [todo, setTodo] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar barStyle='light-content' />
      <Text style={styles.title}>할 일 목록</Text>
      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder={'New To Do'}
          value={todo}
          onChangeText={(text) => setTodo(text)}
          placeholderTextColor={'#999'}
          returnKeyType={'done'}
          autoCorrect={false}
        />
        <ScrollView contentContainerStyle={styles.toDos}>
          <Todo text={"Hello I'm Todo"}/>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f23657',
    alignItems: 'center',
  },

  title: {
    color: 'white',
    fontSize: 30,
    marginTop: 50,
    fontWeight: '200',
    marginBottom: 30,
  },

  card: {
    backgroundColor: 'white',
    flex: 1,
    width: width - 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    elevation: 2,
    ...Platform.select({
      ios: {
        shadowColor: 'rgb(50, 50, 50)',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 0
        }
      },
      andriod: {
        elevation: 3
      }
    })
  },

  input: {
    padding: 20,
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
    fontSize: 25
  },

  toDos: {
    alignItems: 'center'
  }
});
