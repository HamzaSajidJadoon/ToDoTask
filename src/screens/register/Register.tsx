import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Alert, Platform } from 'react-native';
import axios from 'axios';

const Register = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/register', { username, password });
            if (response.status === 201) {
                Alert.alert('Registration Successful', 'You can now log in!');
                navigation.navigate('Login');
            }
        } catch (error) {
            console.error('Registration error:', error);
            Alert.alert('Registration failed', 'Error registering user');
        }
    };

    return (
        <View style={styles.container}>
            <Image resizeMode='contain' style={{alignSelf:'center', height:100, width:120}} source={require('../../assets/todo.png')}/>
            <Text style={styles.label}>Username</Text>
            <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                placeholderTextColor={'#000'}
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor={'#000'}
            />
            <View style={styles.buttobView}>
                <Button title="Register" onPress={handleRegister} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        paddingTop: Platform.OS === 'web' ? '30vh' : 0,
    },
    label: {
        fontSize: 18,
        marginBottom: 8,
        color: '#000'
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingLeft: 8,
        backgroundColor: 'white',
        color: 'black',
    },
    buttobView: {
        marginTop: 10
    }
});

export default Register;
