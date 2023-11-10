import { observable } from '@legendapp/state'

export const pagination$ = observable({
  current: 1,
  total: 0,
})
