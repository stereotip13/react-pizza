import React, { useReducer } from 'react'
import axios from 'axios'

export const pizzaContext = React.createContext()

//изначальное состояние
const INIT_STATE = {
  pizzas: [],
  onePizza: null,
}

//fgbir
const API = 'http://localhost:8000/pizzas'

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case 'GET_PIZZAS':
      console.log(action.payload) //просто смотрим что находится на акшене
      return {
        ...state,
        pizzas: action.payload.data,
      }
    case 'GET_PIZZA':
      console.log(action.payload)
      return {
        ...state,
        onePizza: action.payload.data,
      }
    default:
      return state
  }
}

//пицаконтекстпровайдером обернем App.js чтобы каждый из чилдренов мог получать значения из провайдера
const PizzaContextProvider = ({ children }) => {
  // делаем деструктуризацию и получаем state и dispatch
  const [state, dispatch] = useReducer(reducer, INIT_STATE)

  //когда первоначально заходим надо получить список всех пицц, отправляем запрос на бэкенд, на API
  async function getPizzas() {
    let result = await axios.get(API)
    //диспатч меняет посредством редюссера инишиал стейт
    dispatch({
      type: 'GET_PIZZAS',
      payload: result,
    })
  }
  async function addPizza(newPizza) {
    await axios.post(API, newPizza)
    getPizzas() //вызываем ф-цию, чтобы получить уже новый список пицц
  }
  async function deletePizza(id) {
    await axios.delete(`${API}/${id}`)
    getPizzas() //вызываем ф-цию, чтобы получить уже новый список пицц
  }
  //Для возможности редактир-я пиццы надо получить редакктируемые значения одной
  async function getOnePizza(id) {
    let result = await axios(`${API}/${id}`)
    dispatch({
      type: 'GET_PIZZA',
      payload: result,
    })
  }
  async function editPizza(id, newPizza) {
    await axios.put(`${API}/${id}`, newPizza)
    getPizzas()
  }
  return (
    <pizzaContext.Provider
      value={{
        pizzas: state.pizzas,
        onePizza: state.onePizza,
        addPizza,
        editPizza,
        getOnePizza,
        deletePizza,
        getPizzas,
      }}
    >
      {children}
    </pizzaContext.Provider>
  )
}
export default PizzaContextProvider
