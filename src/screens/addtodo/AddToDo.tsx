import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Platform } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddToDo = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const id = await AsyncStorage.getItem('user_id');
                if (id !== null) {
                    setUserId(id);
                }
            } catch (error) {
                console.error('Error fetching user ID:', error);
            }
        };

        fetchUserId();
    }, []);

    const handleAddTodo = async () => {
        if (!userId) {
            console.error('User ID is not available');
            return;
        }

        try {
            await axios.post('http://localhost:3000/addtodo', { user_id: userId, task: title });
            navigation.navigate('ToDoList');
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Task Title</Text>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
            />
            <Button title="Add Task" onPress={handleAddTodo} />
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
    label: {
        fontSize: 18,
        marginBottom: 8,
        color: '#000',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingLeft: 8,
        color:'black'
    },
});

export default AddToDo;
