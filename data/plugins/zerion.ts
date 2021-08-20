import io from 'socket.io-client'

const BASE_URL = 'wss://api-v4.zerion.io/'

function verify(request: any, response: any) {
  // each value in request payload must be found in response meta
  return Object.keys(request.payload).every(key => {
    const requestValue = request.payload[key]
    const responseMetaValue = response.meta[key]
    if (typeof requestValue === 'object') {
      return JSON.stringify(requestValue) === JSON.stringify(responseMetaValue)
    }
    return responseMetaValue === requestValue
  });
}

const assetsSocket = {
  namespace: 'address',
  socket: io(`${BASE_URL}address`, {
    transports: ['websocket'],
    timeout: 1000,
    query: {
      api_token:
        process.env.ZERION_API_KEY_V4 ||
        'Demo.ukEVQp6L5vfgxcz4sBke7XvS873GMYHy',
    },
    // @ts-ignore
    extraHeaders: {
      HTTP_ORIGIN: 'http://localhost:3000',
      // Origin: 'https://app.zerion.io',
    }
  }),
}

function get(socketNamespace: any, requestBody: any) {
  return new Promise(resolve => {
    const { socket, namespace } = socketNamespace
    function handleReceive(data: any) {
      if (verify(requestBody, data)) {
        unsubscribe()
        resolve(data)
      }
    }
    const model = requestBody.scope[0]
    function unsubscribe() {
      socket.off(`received ${namespace} ${model}`, handleReceive)
      socket.emit('unsubscribe', requestBody)
    }
    socket.emit('get', requestBody)
    socket.on(`received ${namespace} ${model}`, handleReceive)
  })
}

export class Zerion {
  async getPortfolio(address: string): Promise<number> {
    const portfolio: any = await get(assetsSocket, {
      scope: ['portfolio'],
      payload: {
        address: address.toLowerCase(),
        currency: 'usd',
        // offset: 0,
        // limit: 20,
      },
    })

    return portfolio.payload.portfolio.total_value
  }
}
