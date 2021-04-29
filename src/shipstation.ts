import axios, { AxiosRequestConfig } from 'axios'

// tslint:disable-next-line:no-var-requires
const base64 = require('base-64')
// tslint:disable-next-line:no-var-requires
const stopcock = require('stopcock')

const rateLimitOpts = {
  limit: 40,
  interval: 1000 * 40,
}

export enum RequestMethod {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
}

export interface IShipstationRequestOptions {
  url: string
  country?: 'international' | 'canada'
  method?: RequestMethod
  useBaseUrl?: boolean
  data?: any
}

export default class Shipstation {
  public authorizationToken: string
  public authorizationTokenCanada: string
  private baseUrl: string = 'https://ssapi.shipstation.com/'

  constructor() {
    if (!process.env.SS_API_KEY || !process.env.SS_API_SECRET) {
      // tslint:disable-next-line:no-console
      throw new Error(
        `APIKey and API Secret are required! Provided API Key: ${process.env.SS_API_KEY} API Secret: ${process.env.SS_API_SECRET}`
      )
    }

    this.authorizationToken = base64.encode(
      `${process.env.SS_API_KEY}:${process.env.SS_API_SECRET}`
    )

    this.authorizationTokenCanada = base64.encode(
      `${process.env.SS_API_KEY_CANADA}:${process.env.SS_API_SECRET_CANADA}`
    )

    // Globally define API ratelimiting
    this.request = stopcock(this.request, rateLimitOpts)
  }

  public request = ({
    country = 'international',
    url,
    method = RequestMethod.GET,
    useBaseUrl = true,
    data,
  }: IShipstationRequestOptions) => {
    const opts: AxiosRequestConfig = {
      headers: {
        Authorization: `Basic ${
          country === 'canada'
            ? this.authorizationTokenCanada
            : this.authorizationToken
        }`,
      },
      method,
      url: `${useBaseUrl ? this.baseUrl : ''}${url}`,
    }

    if (data) {
      opts.data = data
    }

    return axios.request(opts)
  }
}
