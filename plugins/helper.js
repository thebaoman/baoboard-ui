import axios from 'axios'

export const getBaoMarket = () => {
  return fetch('https://api.coingecko.com/api/v3/coins/bao-finance', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  }).then(response => response.json())
}

export const getPrices = async () => {
  const ret = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=weth,usd-coin,yearn-finance,xsushi,sushi,dai&vs_currencies=usd')
  return ret.data
}

export const getFarms = () => {
  return fetch('https://zashton.com/api/farms', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  }).then(response => response.json())
}
