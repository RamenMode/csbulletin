import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: '',
  inventory: {
    assets: []
  },
  pressStatus: []
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, target) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = target.payload
    },
    setEmpty: (state) => {
      state.value = ''
    },
    setInventory: (state, target) => {
      state.inventory = target.payload
    },
    setPressStatusAdd: (state, target) => {
      state.pressStatus.push(target.payload)
    },
    setPressStatusRemove: (state, target) => {
      state.pressStatus.splice(state.pressStatus.indexOf(target.payload), 1)
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUser, setEmpty, setInventory, setPressStatusAdd, setPressStatusRemove } = userSlice.actions

export default userSlice.reducer