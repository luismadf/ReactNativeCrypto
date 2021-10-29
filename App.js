import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Image,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Formulario from './components/Formulario';
import Header from './components/Header';
import axios from 'axios';
import Cotizacion from './components/Cotizacion';

const App = () => {
  const [coin, setCoin] = useState('');
  const [crypto, setCrypto] = useState('');
  const [api, setApi] = useState(false);
  const [price, setPrice] = useState({});
  const [loading, setLoading] = useState(false);

  const Component = loading ? (
    <ActivityIndicator size="large" color="#5e49e2" />
  ) : (
    <Cotizacion price={price} />
  );

  useEffect(() => {
    const getPrice = async () => {
      if (api) {
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${crypto}&tsyms=${coin}`;
        const {data} = await axios.get(url);
        setLoading(true);
        setTimeout(() => {
          setPrice(data.DISPLAY[crypto][coin]);
          setApi(false);
          setLoading(false);
        }, 2000);
      }
    };
    getPrice();
  }, [api]);

  return (
    <ScrollView>
      <Header />
      <Image
        style={styles.image}
        source={require('./assets/img/cryptomonedas.png')}
      />
      <View style={styles.contenido}>
        <Formulario
          coin={coin}
          setCoin={setCoin}
          crypto={crypto}
          setCrypto={setCrypto}
          setApi={setApi}
        />
      </View>
      <View style={{marginTop: 20}}>{Component}</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contenido: {
    marginHorizontal: '2.5%',
  },
  image: {
    width: '100%',
    height: 150,
    marginHorizontal: '2.5%',
  },
});

export default App;
