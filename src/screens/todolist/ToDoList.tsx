import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Platform } from 'react-native';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ToDoList = ({ navigation }) => {
    const [todos, setTodos] = useState([]);
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            fetchTodos();
        }
    }, [isFocused]);

    const fetchTodos = async () => {
        try {
            const userId = await AsyncStorage.getItem('user_id');
            if (userId) {
                const response = await axios.get(`http://localhost:3000/gettodos/${userId}`);
                setTodos(response.data);
            }
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Button title="Add Task" onPress={() => navigation.navigate('AddToDo')} />

                <View style={styles.flatlistView}>

        
            <FlatList
                data={todos}
                keyExtractor={(item) => item.id.toString()} // Assuming 'id' is the key in your data
                renderItem={({ item }) => (
                    <View style={styles.todoItem}>
                        <Text style={styles.todoText}>{item.task}</Text>
                    </View>
                )}
            />
                    </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        paddingTop: Platform.OS === 'web' ? '30vh' : 0,
    },
    flatlistView:{
flex:1,
marginTop:20
    },
    todoItem: {
        padding: 15,
        borderColor:'grey',
        borderRadius:5,
        borderWidth:1,
        marginTop:5
    },
    todoText: {
        fontSize: 18,
        color: '#000',
    },
});

export default ToDoList;
