import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/login/Login';
import Register from '../screens/register/Register';
import ToDoList from '../screens/todolist/ToDoList';
import AddToDo from '../screens/addtodo/AddToDo';
import Home from '../screens/home/Home';

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="ToDoList" component={ToDoList} />
                <Stack.Screen name="AddToDo" component={AddToDo} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
