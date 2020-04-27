import React, { useState, useEffect } from 'react';
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
import { AppLoading } from 'expo';
import AsyncStorage from '@react-native-community/async-storage';
import Todo from './Todo';
import uuidv1 from 'uuid/v1';
import PropTypes from 'prop-types';

const { width } = Dimensions.get('window');

export default function App() {

  const [ newTodo, setNewTodo ] = useState('');
  const [ todos, setTodos ] = useState({ 1: { id: 1, isCompleted: false, text: 'Hello World!' }});
  const [ loadedTodo, setLoadedTodo ] = useState(false);

  useEffect(() => {
    loadTodo();
  }, {todos});

  const addTodo = () => {
    if(newTodo !== '') {
      const ID = uuidv1();
      const newTodoObject = {
        [ID]: {
          id: ID,
          isCompleted: false,
          text: newTodo,
        }
      };
      setTodos({ ...todos, ...newTodoObject });
      setNewTodo("");
    }
    saveTodo(todos);
  };

  const deleteTodo = (id) => {
    delete todos[id];
    setTodos({ ...todos });
    saveTodo(todos);
  }

  const uncompletedTodo = (id) => {
    setTodos({ ...todos, [id]: { ...todos[id], isCompleted: false }});
    saveTodo(todos);
  };

  const completedTodo = (id) => {
    setTodos({ ...todos, [id]: { ...todos[id], isCompleted: true }});
    saveTodo(todos);
  };

  const updateTodo = (id, text) => {
    setTodos({ ...todos, [id]: { ...todos[id], text: text}})
    saveTodo(todos);
  }

  const saveTodo = async (newTodo) => {
    try {
      await AsyncStorage.setItem('todos', JSON.stringify(newTodo));
    } catch(e) {
      alert(e);
    }
  }

  const loadTodo = async () => {
    try{
      const _todos = await AsyncStorage.getItem('todos');
      console.log(_todos);
      const parsedTodos = JSON.parse(_todos);
      setTodos({ ...parsedTodos });
      setLoadedTodo(true);
    } catch(e) {
      alert(e);
    }
  }

  /*
  if(!loadedTodo) {
    return <AppLoading />
  }
  */

  return (
    <View style={styles.container}>
      <StatusBar barStyle='light-content' />
      <Text style={styles.title}>할 일 목록</Text>
      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder={'New To Do'}
          value={newTodo}
          onChangeText={(text) => setNewTodo(text)}
          placeholderTextColor={'#999'}
          returnKeyType={'done'}
          autoCorrect={false}
          onSubmitEditing={addTodo}
        />
        <ScrollView contentContainerStyle={styles.toDos}>
          {Object.values(todos).reverse().map(todo => (
            <Todo
              key={todo.id}
              deleteTodo={deleteTodo}
              completeTodo={completedTodo}
              uncompleteTodo={uncompletedTodo}
              updateTodo={updateTodo}
              {...todo}
            />
          ))}
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
