import React from 'react';
import { View, Button, StyleSheet, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({ navigation }) => {
    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('user_id'); // Clear user_id from AsyncStorage
            navigation.navigate('Login'); // Navigate back to the Login screen
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Button title="View To-Do List" onPress={() => navigation.navigate('ToDoList')} />
            <Button title="Logout" onPress={handleLogout} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        gap:20,
        paddingTop: Platform.OS === 'web' ? '30vh' : 0,
    },
});

export default Home;
