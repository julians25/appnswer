import React from 'react';
import {View, StyleSheet, Button} from 'react-native';
const menu = (props) => {
    return (
        <View style={styles.center}>
            <View style={styles.menu}>
                <Button title="Bases de datos" color="#daa520" onPress={() => props.navigation.push('categories', { doc: 'Bases de datos' })} />
            </View>
            <View style={styles.menu}>
                <Button title="Algoritmos" color="#daa520" onPress={() => props.navigation.push('categories', { doc: 'Algoritmos' })} />
            </View>
            <View style={styles.menu}>
                <Button title="JavaScript" color="#daa520" onPress={() => props.navigation.push('categories', { doc: 'JavaScript' })} />
            </View>
            <View style={styles.menu}>
                <Button title="Python" color="#daa520" onPress={() => props.navigation.push('categories', { doc: 'Python' })} />
            </View>
            <View style={styles.menu}>
                <Button title="Frameworks" color="#daa520" onPress={() => props.navigation.push('categories', { doc: 'Frameworks' })} />
            </View>
            <View style={styles.menu}>
                <Button title="Estructuras de datos" color="#daa520" onPress={() => props.navigation.push('categories', { doc: 'Estructuras de datos' })} />
            </View>
            <View style={styles.menu}>
                <Button title="Errores de programacion" color="#daa520" onPress={() => props.navigation.push('categories', { doc: 'Errores de programacion' })} />
            </View>
            <View style={styles.menu}>
                <Button title=" Errores de instalacion " color="#daa520" onPress={() => props.navigation.push('categories', { doc: 'Errores de instalacion' })} />
            </View>
            
        </View>
    )

}
const styles = StyleSheet.create({
    menu:{
        marginTop: 20,
        width: 300
    },
    center: {
        alignItems: "center",
        marginTop:50
    }
})
export default menu