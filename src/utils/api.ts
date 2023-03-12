import axios from 'axios'

interface Params {
  baseUrl: string,
  headers?: any,
  method: string
}

const getConfig: Params = {
  baseUrl: "http://127.0.0.1:8000",
  method: 'get'
}

export const getAPI = async (url: string): Promise<any> => {
  return await axios({...getConfig, url: `${getConfig.baseUrl}/${url}`}).then((res) => {
    return {
      status: res.status,
      data: res.data
    }
  }).catch(err => {
    console.log(err)
    return {
      status: err.status,
      data: err.response
    }
  })
}