import React, { useState } from 'react';
import {
    StatusBar,
    Button,
    SectionList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { datasource } from './Data.js';

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 16,
        marginBottom: 5,
        textAlign: 'left',
    },
    subTextStyle: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 5,
    },
    opacityStyle: {
        borderWidth: 1,
        borderRadius: 5,
        margin: 5,
        padding: 10,
        borderColor: '#ccc',
    },
    headerText: {
        fontSize: 20,
        margin: 10,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    imageStyle: {
        width: 50,
        height: 75,
        marginRight: 10,
    },
    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoContainer: {
        flex: 1,
    },
});

const Home = ({ navigation }) => {
    const [books, setBooks] = useState([]);

    const getData = async () => {
        let datastr = await AsyncStorage.getItem('bookdata');
        if (datastr != null) {
            let jsondata = JSON.parse(datastr);
            setBooks(jsondata);
        } else {
            setBooks(datasource);
        }
    };
    getData();

    const renderItem = ({ item, index, section }) => {
        return (
            <TouchableOpacity
                style={styles.opacityStyle}
                onPress={() => {
                    let datastr = JSON.stringify(books);
                    navigation.navigate('Edit', {
                        index: index,
                        sectionTitle: section.title,
                        book: item,
                        datastring: datastr,
                    });
                }}
            >
                <View style={styles.itemRow}>
                    {item.image && <Image source={{ uri: item.image }} style={styles.imageStyle} />}
                    <View style={styles.infoContainer}>
                        <Text style={styles.textStyle}>{item.title}</Text>
                        <Text style={styles.subTextStyle}>ISBN: {item.isbn}</Text>
                        <Text style={styles.subTextStyle}>Copies: {item.copies}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View>
            <StatusBar />
            <Button
                title="Add Book"
                onPress={() => {
                    let datastr = JSON.stringify(books);
                    navigation.navigate('Add', { datastring: datastr });
                }}
            />
            <SectionList
                sections={books}
                renderItem={renderItem}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.headerText}>{title}</Text>
                )}
            />
        </View>
    );
};

export default Home;
