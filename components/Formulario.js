import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableHighlight, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';

const Formulario = ({coin, setCoin, crypto, setCrypto, setApi}) => {
  const [cryptos, setCryptos] = useState([]);

  useEffect(() => {
    const getApi = async () => {
      const URL =
        'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
      const {data} = await axios.get(URL);
      setCryptos(data.Data);
    };

    getApi();
  }, []);

  const getCoin = coin => {
    setCoin(coin);
  };

  const getCrypto = crypto => {
    setCrypto(crypto);
  };

  const getPrice = (crypto, coin) => {
    if (crypto.trim() === '' || coin.trim() === '') {
      showAlert();
      return;
    }

    setApi(true);
  };

  const showAlert = () => {
    Alert.alert('Error', 'Ambos Campos son Obligatorios', [{text: 'Ok'}]);
  };

  return (
    <View>
      <Text style={styles.label}>Moneda</Text>
      <Picker
        onValueChange={coin => getCoin(coin)}
        selectedValue={coin}
        itemStyle={{height: 120}}>
        <Picker.Item label="- Seleccione -" value="" />
        <Picker.Item label="Dolar de Estados Unidos" value="USD" />
        <Picker.Item label="Peso Mexicano" value="MXN" />
        <Picker.Item label="Euro" value="EUR" />
        <Picker.Item label="Libra Esterlina" value="GBP" />
      </Picker>
      <Text style={styles.label}>Criptomoneda</Text>
      <Picker
        onValueChange={crypto => getCrypto(crypto)}
        selectedValue={crypto}
        itemStyle={{height: 120}}>
        <Picker.Item label="- Seleccione -" value="" />
        {cryptos.map(crypto => (
          <Picker.Item
            key={crypto.CoinInfo.Id}
            label={crypto.CoinInfo.FullName}
            value={crypto.CoinInfo.Name}
          />
        ))}
      </Picker>
      <TouchableHighlight style={styles.btnCotizar}>
        <Text style={styles.textCotizar} onPress={() => getPrice(crypto, coin)}>
          Cotizar
        </Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Lato-Black',
    textTransform: 'uppercase',
    fontSize: 22,
    marginTop: 10,
    marginBottom: 20,
  },
  btnCotizar: {
    backgroundColor: '#5e49e2',
    padding: 10,
    marginTop: 20,
  },
  textCotizar: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Lato-Black',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});

export default Formulario;
