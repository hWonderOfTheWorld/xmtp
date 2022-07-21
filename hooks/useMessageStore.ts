import { Message } from '@xmtp/xmtp-js'
import { useCallback, useReducer } from 'react'
import { MessageStoreEvent } from '../contexts/xmtp'

type MessageStore = { [address: string]: Message[] }

const useMessageStore = () => {
  const [messageStore, dispatchMessages] = useReducer(
    (state: MessageStore, { peerAddress, messages }: MessageStoreEvent) => {
      const existing = state[peerAddress] || []
      const existingMap = new Map<string, Message>(
        (state[peerAddress] || []).map((msg) => [msg.id, msg])
      )
      const newMessages = messages.filter((msg) => !existingMap.get(msg.id))
      if (!newMessages.length) {
        return state
      }
      console.log('Dispatching new messages for peer address', peerAddress)

      return {
        ...state,
        [peerAddress]: existing.concat(newMessages),
      }
    },
    {}
  )

  const getMessages = useCallback(
    (peerAddress: string) => messageStore[peerAddress] || [],
    [messageStore]
  )

  return {
    getMessages,
    dispatchMessages,
  }
}

export default useMessageStore
