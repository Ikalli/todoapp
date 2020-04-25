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
import Todo from './Todo';
import uuidv1 from 'uuid/v1';
import PropTypes from 'prop-types';

const { width } = Dimensions.get('window');

export default function App() {

  const [ newTodo, setNewTodo ] = useState('');
  const [ todos, setTodos ] = useState({});
  const [ loaderTodos, setLoaderTodos ] = useState(false);

  useEffect(() => {
    setLoaderTodos(true);
  });

  if(!loaderTodos){
    return <AppLoading />
  };

  //console.log(todos);

  const addTodo = () => {
    if(newTodo !== '') {
      const ID = uuidv1();
      const newTodoObject = {
        [ID]: {
          id: ID,
          isCompleted: false,
          text: newTodo,
          createdAt: Date.now()
        }
      };
      setTodos({ ...todos, ...newTodoObject });
      setNewTodo("");
    }
  };

  const deleteTodo = (id) => {
    delete todos[id];
    setTodos({ ...todos });
  }

  const uncompletedTodo = id => {
    setTodos({ ...todos, [id]: { ...todos[id], isCompleted: false }});
  };

  const completedTodo = id => {
    setTodos({ ...todos, [id]: { ...todos[id], isCompleted: true }});
  };

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
          {Object.values(todos).map(todo => (
            <Todo
              key={todo.id}
              deleteTodo={deleteTodo}
              completeTodo={completedTodo}
              uncompleteTodo={uncompletedTodo}
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
