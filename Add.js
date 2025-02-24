import React, { useState } from 'react';
import { StatusBar, View, Button, Text, TextInput, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ccc',
        marginBottom: 10,
        padding: 8,
        fontSize: 16,
    },
    container: {
        padding: 20,
    },
});

const Add = ({ navigation, route }) => {
    const [title, setTitle] = useState('');
    const [isbn, setIsbn] = useState('');
    const [copies, setCopies] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const saveData = async (value) => {
        await AsyncStorage.setItem('bookdata', value);
        navigation.navigate('Home');
    };

    return (
        <View style={styles.container}>
            <StatusBar />
            <Text>Title:</Text>
            <TextInput
                style={styles.input}
                onChangeText={(text) => setTitle(text)}
            />
            <Text>ISBN:</Text>
            <TextInput
                style={styles.input}
                onChangeText={(text) => setIsbn(text)}
            />
            <Text>Copies:</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                onChangeText={(text) => setCopies(text)}
            />
            <Text>Image URL:</Text>
            <TextInput
                style={styles.input}
                onChangeText={(text) => setImageUrl(text)}
            />
            <Button
                title="Submit"
                onPress={() => {
                    let bookData = JSON.parse(route.params.datastring);
                    let newBook = { title, isbn, copies: Number(copies), image: imageUrl };
                    bookData[0].data.push(newBook);
                    let updatedData = JSON.stringify(bookData);
                    saveData(updatedData);
                }}
            />
        </View>
    );
};

export default Add;
