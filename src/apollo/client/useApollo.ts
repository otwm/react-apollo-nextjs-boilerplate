import initializeApollo, {createApolloClientParam} from './initializeApollo'
import { useMemo } from 'react'

export const useApollo = ({ initialState, cookie }: createApolloClientParam) => {
  return useMemo(() => initializeApollo({initialState, cookie}), [initialState, cookie])
};