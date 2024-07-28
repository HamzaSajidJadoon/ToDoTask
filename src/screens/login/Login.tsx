import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Alert , SafeAreaView , Platform } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/login', { username, password });
            if (response.status === 200) {
                const { id } = response.data; // Assuming the response contains the user ID
                await AsyncStorage.setItem('user_id', id.toString()); // Store user_id in AsyncStorage
                navigation.navigate('Home');
            }
        } catch (error) {
            console.error('Login error:', error);
            Alert.alert('Login failed', 'Username or password is incorrect');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Image resizeMode='contain' style={{ alignSelf: 'center', height: 100, width: 120 }} source={require('../../assets/todo.png')} />
            <Text style={styles.label}>Username</Text>
            <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <View style={styles.buttobView}>
                <Button title="Login" onPress={handleLogin} />
                <Button title="Register" onPress={() => navigation.navigate('Register')} />
            </View>
        </SafeAreaView>
    );
};Login


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
        marginTop: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingLeft: 8,
        color: 'black',
    },
    buttobView: {
        gap: 15,
    },
});

export default Login;
