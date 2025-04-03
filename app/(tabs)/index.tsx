import { configureStore, createAction, createSlice } from '@reduxjs/toolkit';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Provider, useDispatch, useSelector } from 'react-redux';

const RESET_COUNTER = createAction('RESET_COUNTER');

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 10 },
  reducers: {
    increment: (state) => { state.value += 1 },
    decrement: (state) => { state.value -= 1 },
    multiply: (state) => { state.value *= state.value },
    cube: (state) => { state.value *= (state.value * state.value) }
  },
  extraReducers: (builder) => {
    builder.addCase(RESET_COUNTER, (state) => {
      state.value = 10;
    });
  }
});

const store = configureStore({
  reducer: { counter: counterSlice.reducer }
});

const CounterApp = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state: any) => state.counter.value);

  return (
    <View style={styles.container}>
      <Text style={styles.counterText}>{counter}</Text>

      <TouchableOpacity style={styles.button} onPress={() => dispatch(counterSlice.actions.increment())}>
        <Text style={styles.buttonText}>Tăng biến đếm</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => dispatch(counterSlice.actions.decrement())}>
        <Text style={styles.buttonText}>Giảm biến đếm</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => dispatch(counterSlice.actions.multiply())}>
        <Text style={styles.buttonText}>Mũ bình phương biến đếm</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => dispatch(counterSlice.actions.cube())}>
        <Text style={styles.buttonText}>Lập phương biến đếm</Text>
      </TouchableOpacity>
      <Button title='Reset' onPress={() => dispatch(RESET_COUNTER())} />
    </View>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <CounterApp />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  counterText: {
    fontSize: 32,
    marginBottom: 20
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: 'orange',
    width: '80%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold'
  }
});