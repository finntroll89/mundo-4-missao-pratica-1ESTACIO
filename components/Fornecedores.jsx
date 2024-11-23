import React, { useMemo, useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const useFiltrarFornecedores = (fornecedores, categoriaFiltro) => {
  const fornecedoresFiltrados = useMemo(
    () =>
      fornecedores.filter(
        (fornecedor) =>
          categoriaFiltro === "" ||
          fornecedor.categorias.includes(categoriaFiltro)
      ),
    [fornecedores, categoriaFiltro]
  );
  return fornecedoresFiltrados;
};

const ListaFornecedores = ({ fornecedores, onRemove }) => {
  const [categoriaFiltro, setCategoriaFiltro] = useState("");

  const fornecedoresFiltrados = useFiltrarFornecedores(
    fornecedores,
    categoriaFiltro
  );

  const handleCategoriaFiltroChange = (text) => {
    setCategoriaFiltro(text);
  };

  const handleDelete = (fornecedor) => {
    Alert.alert(
      "Confirmar exclusão",
      "Você realmente deseja excluir este fornecedor?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Excluir", onPress: () => onRemove(fornecedor.id) },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Pesquisar por Categoria"
        value={categoriaFiltro}
        onChangeText={handleCategoriaFiltroChange}
      />

      {fornecedoresFiltrados.map((fornecedor, index) => (
        <View key={index} style={styles.fornecedorContainer}>
          <Image
            source={{ uri: fornecedor.imagem }}
            style={styles.imagemFornecedor}
          />
          <View style={styles.infoContainer}>
            <Text style={styles.nomeFornecedor}>{fornecedor.nome}</Text>
            <Text style={styles.detalheFornecedor}>
              Endereço: {fornecedor.endereco}
            </Text>
            <Text style={styles.detalheFornecedor}>
              Contato: {fornecedor.contato}
            </Text>
            <Text style={styles.detalheFornecedor}>
              Categoria: {fornecedor.categorias}
            </Text>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleDelete(fornecedor)}
            >
              <Text style={styles.actionText}>Apagar</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#F0F0F0",
  },
  input: {
    fontSize: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 25,
    backgroundColor: "#FFF",
  },
  fornecedorContainer: {
    flexDirection: "row",
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: "center",
  },
  infoContainer: {
    flex: 1,
    marginLeft: 12,
  },
  nomeFornecedor: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  detalheFornecedor: {
    fontSize: 16,
    color: "#666",
  },
  imagemFornecedor: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  actionButton: {
    padding: 8,
    width: 70,
    marginTop: 8,
    backgroundColor: "#DDD",
    borderRadius: 10,
  },
  actionText: {
    color: "#333",
  },
});

export default ListaFornecedores;
