import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Cotizacion = ({price}) => {
  if (Object.keys(price).length === 0) return null;

  return (
    <View style={styles.resultado}>
      <Text style={[styles.texto, styles.precio]}>
        <Text style={styles.span}>{price.PRICE}</Text>
      </Text>
      <Text style={styles.texto}>
        Precio más alto del dia:{' '}
        <Text style={styles.span}>{price.HIGHDAY}</Text>
      </Text>
      <Text style={styles.texto}>
        Precio más bajo del dia: <Text style={styles.span}>{price.LOWDAY}</Text>
      </Text>
      <Text style={styles.texto}>
        Variación últimas 24 horas:{' '}
        <Text style={styles.span}>{price.CHANGEPCT24HOUR}</Text>
      </Text>
      <Text style={styles.texto}>
        Última actualización:{' '}
        <Text style={styles.span}>{price.LASTUPDATE}</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  resultado: {
    backgroundColor: '#5E49E2',
    padding: 20,
  },
  precio: {
    fontSize: 32,
  },
  texto: {
    color: '#fff',
    fontFamily: 'Lato-Regular',
    fontSize: 18,
    marginBottom: 10,
  },
  span: {
    fontFamily: 'Lato-Black',
  },
});

export default Cotizacion;
