import * as ImagePicker from 'expo-image-picker';
import React, { Component } from 'react';
import { Alert, Image, StyleSheet, TextInput, View } from 'react-native';
import CustomButton from './Botao';

class CadastroFornecedor extends Component {
  state = {
    nome: '',
    endereco: '',
    contato: '',
    categorias: '',
    imagem: null,
  };

  handleCadastro = () => {
    const { nome, endereco, contato, categorias, imagem } = this.state;
    if (!nome || !endereco || !contato || !categorias) {
      this.showAlert("Erro", "Por favor, preencher todos os campos.");
      return;
    }

    const novoFornecedor = { nome, endereco, contato, categorias, imagem };
    this.props.onCadastroSubmit(novoFornecedor);
    this.clearFields();
    this.showAlert("Sucesso", "Fornecedor cadastrado com sucesso!");
  };

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      this.setState({
        imagem:
          result.assets && result.assets.length > 0
            ? result.assets[0].uri
            : null,
      });
    }
  };

  clearFields = () => {
    this.setState({
      nome: '',
      endereco: '',
      contato: '',
      categorias: '',
      imagem: null,
    });
  };

  showAlert = (title, message) => {
    Alert.alert(title, message);
  };

  render() {
    const { nome, endereco, contato, categorias, imagem } = this.state;
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Nome Completo"
          value={nome}
          onChangeText={(text) => this.setState({ nome: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Endereço"
          value={endereco}
          onChangeText={(text) => this.setState({ endereco: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Contato"
          value={contato}
          onChangeText={(text) => this.setState({ contato: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Categoria/Produto"
          value={categorias}
          onChangeText={(text) => this.setState({ categorias: text })}
        />

        {imagem && <Image source={{ uri: imagem }} style={styles.image} />}

        <View style={styles.buttonContainer}>
          <CustomButton title="Escolher Imagem" onPress={this.pickImage} />
          <CustomButton
            title="Cadastrar"
            color="#00A000"
            onPress={this.handleCadastro}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  input: {
    width: 350,
    fontSize: 16,
    marginBottom: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 12,
  },
  image: {
    width: 160,
    height: 160,
    marginTop: 12,
    borderRadius: 100,
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 350,
  },
});

export default CadastroFornecedor;
