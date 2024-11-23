import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CadastroFornecedor from './components/Cadastro';
import ListaFornecedores from './components/Fornecedores';

const Stack = createNativeStackNavigator();

export default function App() {
    const [fornecedores, setFornecedores] = useState([]);

    const handleCadastroSubmit = (novoFornecedor) => {
        setFornecedores([...fornecedores, novoFornecedor]);
    };

    const handleRemove = (fornecedorId) => {
        setFornecedores(currentFornecedores => currentFornecedores.filter(f => f.id !== fornecedorId));
    };

    const handleEdit = (fornecedorId, updatedData) => {
        setFornecedores(currentFornecedores => currentFornecedores.map(f => {
            if (f.id === fornecedorId) {
                return { ...f, ...updatedData };
            }
            return f;
        }));
    };

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Cadastro" screenOptions={{
                headerStyle: {
                    backgroundColor: '#F7F7F7',
                },
                headerTintColor: '#333',
                headerTitleStyle: {
                    fontWeight: 'bold',
                }
            }}>
                <Stack.Screen name="Cadastro" options={{ title: 'Cadastro de Fornecedores' }}>
                    {props => (
                        <ScrollView contentContainerStyle={styles.scroll}>
                            <View style={styles.section}>
                                <CadastroFornecedor onCadastroSubmit={handleCadastroSubmit} {...props} />
                                <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('Fornecedores')}>
                                    <Text style={styles.buttonText}>Fornecedores</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    )}
                </Stack.Screen>
                <Stack.Screen name="Fornecedores" options={{ title: 'Lista de Fornecedores' }}>
                    {() => <ListaFornecedores fornecedores={fornecedores} onRemove={handleRemove} onEdit={handleEdit} />}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    scroll: {
        flexGrow: 1,
        justifyContent: "center",
    },
    section: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    button: {
        marginTop: 20,
        backgroundColor:"#F0C808",
        borderRadius: 16,
        width: '80%',
        paddingVertical: 15,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 1.5,
    },
    buttonText: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold'
    }
});
