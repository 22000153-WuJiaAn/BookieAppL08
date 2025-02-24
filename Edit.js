import React, { useState } from 'react';
import { Alert, View, Button, Text, TextInput, StyleSheet } from 'react-native';
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

const Edit = ({ navigation, route }) => {
    const bookData = JSON.parse(route.params.datastring);
    const index = route.params.index;
    const [title, setTitle] = useState(route.params.book.title);
    const [isbn, setIsbn] = useState(route.params.book.isbn);
    const [copies, setCopies] = useState(route.params.book.copies.toString());
    const [imageUrl, setImageUrl] = useState(route.params.book.image);

    const saveData = async (value) => {
        await AsyncStorage.setItem('bookdata', value);
        navigation.navigate('Home');
    };

    return (
        <View style={styles.container}>
            <Text>Title:</Text>
            <TextInput
                value={title}
                style={styles.input}
                onChangeText={(text) => setTitle(text)}
            />
            <Text>ISBN:</Text>
            <TextInput
                value={isbn}
                style={styles.input}
                onChangeText={(text) => setIsbn(text)}
            />
            <Text>Copies:</Text>
            <TextInput
                value={copies}
                style={styles.input}
                keyboardType="numeric"
                onChangeText={(text) => setCopies(text)}
            />
            <Text>Image URL:</Text>
            <TextInput
                value={imageUrl}
                style={styles.input}
                onChangeText={(text) => setImageUrl(text)}
            />
            <Button
                title="Save"
                onPress={() => {
                    bookData[0].data[index] = { title, isbn, copies: Number(copies), image: imageUrl };
                    let updatedData = JSON.stringify(bookData);
                    saveData(updatedData);
                }}
            />
            <Button
                title="Delete"
                onPress={() => {
                    Alert.alert('Are you sure?', '', [
                        {
                            text: 'Yes',
                            onPress: () => {
                                bookData[0].data.splice(index, 1);
                                let updatedData = JSON.stringify(bookData);
                                saveData(updatedData);
                            },
                        },
                        { text: 'No' },
                    ]);
                }}
            />
        </View>
    );
};

export default Edit;
