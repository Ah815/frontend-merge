import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CartState } from '../context/Context';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IoIosAdd, IoIosRemove, IoIosTrash } from 'react-icons/io';
import { ImBin } from 'react-icons/im';
import { PiShoppingCartSimple } from 'react-icons/pi';
import { Drawer } from 'react-native-drawer';

const Cart = () => {
  const navigation = useNavigation();
  const {
    state: { cart },
    dispatch,
  } = CartState();

  const [open, setOpen] = useState(false);
  const [total, setTotal] = useState(0);
  const [subtotal, setSubTotal] = useState(0);

  useEffect(() => {
    setTotal(
      cart.reduce(
        (acc, curr) => acc + Number(curr.discountedPrice) * curr.qty,
        0
      )
    );
    setSubTotal(cart.reduce((acc, curr) => acc + Number(curr.qty), 0));
  }, [cart]);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableOpacity onPress={showDrawer} style={{ padding: 10, backgroundColor: 'blue', borderRadius: 5 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <PiShoppingCartSimple size={24} color="white" />
          <Text style={{ color: 'white', marginLeft: 10 }}>{subtotal}</Text>
        </View>
      </TouchableOpacity>
      
      <Drawer
        open={open}
        onClose={onClose}
        content={
          <View style={{ padding: 20 }}>
            {cart.length > 0 ? (
              <>
                <TouchableOpacity
                  onPress={() => {
                    dispatch({ type: 'CLEAR_CART' });
                  }}
                >
                  <ImBin size={24} />
                </TouchableOpacity>
                
                {cart.map((item) => (
                  <View key={item._id} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
                    <Text>{item.title}</Text>
                    <Image source={{ uri: item.productMainImage }} style={{ width: 30, height: 30, marginLeft: 10 }} />
                    
                    <TouchableOpacity
                      onPress={() => {
                        dispatch({ type: 'ADD_QTY', payload: item });
                      }}
                    >
                      <IoIosAdd size={24} />
                    </TouchableOpacity>
                    
                    {item.qty > 0 && (
                      <TouchableOpacity
                        onPress={() => {
                          dispatch({ type: 'REMOVE_QTY', payload: item });
                        }}
                      >
                        <IoIosRemove size={24} />
                      </TouchableOpacity>
                    )}
                    
                    <TouchableOpacity
                      onPress={() => {
                        dispatch({ type: 'REMOVE_FROM_CART', payload: item });
                      }}
                    >
                      <IoIosTrash size={24} />
                    </TouchableOpacity>
                  </View>
                ))}
              </>
            ) : (
              <Text>Cart is empty</Text>
            )}
            <Text>Subtotal: {subtotal}</Text>
            <Text>Total: {total}</Text>
            <Button
              title="Checkout"
              onPress={() => {
                onClose();
                navigation.navigate('Checkout');
              }}
            />
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default Cart;
