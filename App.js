import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import useLivePrices from './hooks/useLivePrices';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const prices = useLivePrices();

  const [holdings, setHoldings] = useState({
    btc: '',
    eth: '',
    usd: '',
    eur: '',
    gram_gold: '',
    quarter_gold: '',
    half_gold: '',
    full_gold: '',
    cumh_gold: '',
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@holdings');
        if (jsonValue != null) {
          setHoldings(JSON.parse(jsonValue));
        }
      } catch (e) {
        console.error('Veri yüklenirken hata:', e);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const saveData = async () => {
      try {
        const jsonValue = JSON.stringify(holdings);
        await AsyncStorage.setItem('@holdings', jsonValue);
      } catch (e) {
        console.error('Veri kaydederken hata:', e);
      }
    };

    saveData();
  }, [holdings]);

  const totalValue = Object.keys(holdings).reduce((acc, key) => {
    const amount = parseFloat(holdings[key]) || 0;
    const price = prices[key] || 0;
    return acc + amount * price;
  }, 0);

  const updateHolding = (key, value) => {
    setHoldings({ ...holdings, [key]: value });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Çoklu Birikim Hesaplama</Text>

      <PriceItem
        label="Bitcoin"
        value={prices.btc}
        input={holdings.btc}
        onChange={(val) => updateHolding('btc', val)}
      />
      <PriceItem
        label="Ethereum"
        value={prices.eth}
        input={holdings.eth}
        onChange={(val) => updateHolding('eth', val)}
      />
      <PriceItem
        label="Dolar"
        value={prices.usd}
        input={holdings.usd}
        onChange={(val) => updateHolding('usd', val)}
      />
      <PriceItem
        label="Euro"
        value={prices.eur}
        input={holdings.eur}
        onChange={(val) => updateHolding('eur', val)}
      />
      <PriceItem
        label="Gram Altın"
        value={prices.gram_gold}
        input={holdings.gram_gold}
        onChange={(val) => updateHolding('gram_gold', val)}
      />
      <PriceItem
        label="Çeyrek Altın"
        value={prices.quarter_gold}
        input={holdings.quarter_gold}
        onChange={(val) => updateHolding('quarter_gold', val)}
      />
      <PriceItem
        label="Yarım Altın"
        value={prices.half_gold}
        input={holdings.half_gold}
        onChange={(val) => updateHolding('half_gold', val)}
      />
      <PriceItem
        label="Tam Altın"
        value={prices.full_gold}
        input={holdings.full_gold}
        onChange={(val) => updateHolding('full_gold', val)}
      />
      <PriceItem
        label="Cumhuriyet Altını"
        value={prices.cumh_gold}
        input={holdings.cumh_gold}
        onChange={(val) => updateHolding('cumh_gold', val)}
      />

      <Text style={styles.total}>
         Toplam ≈ {totalValue.toLocaleString(undefined, { maximumFractionDigits: 2 })} ₺
      </Text>
    </ScrollView>
  );
}

const PriceItem = ({ label, value, input, onChange }) => (
  <View style={styles.item}>
    <View style={{ flex: 1 }}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>
        {value ? value.toLocaleString(undefined, { maximumFractionDigits: 2 }) : '...'} ₺
      </Text>
    </View>
    <TextInput
      style={styles.input}
      keyboardType="numeric"
      placeholder="Adet"
      value={input}
      onChangeText={onChange}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingTop: 64,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  item: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#008000',
  },
  input: {
    marginLeft: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 6,
    width: 80,
    textAlign: 'center',
    backgroundColor: '#fff',
  },
  total: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 24,
    textAlign: 'center',
    color: '#333',
  },
});
