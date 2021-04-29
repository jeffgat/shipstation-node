import { IShipment, IShippingRate, IShippingRateOptions } from '../models'
import Shipstation, { RequestMethod } from '../shipstation'
import { BaseResource } from './Base'

export class Shipments extends BaseResource<IShipment> {
  constructor(protected shipstation: Shipstation) {
    super(shipstation, 'shipments')
  }

  public async getAll(
    opts?: object,
    country?: 'international' | 'canada' | undefined
  ): Promise<IShipment[]> {
    const query = this.buildQueryStringFromParams(opts)
    const url = this.baseUrl + query

    const response = await this.shipstation.request({
      url,
      method: RequestMethod.GET,
      country,
    })
    return response.data as IShipment[]
  }

  public async getRates(
    data?: IShippingRateOptions,
    country?: 'international' | 'canada' | undefined
  ): Promise<IShippingRate[]> {
    const url = this.baseUrl + '/getrates'

    const response = await this.shipstation.request({
      url,
      method: RequestMethod.POST,
      data,
      country,
    })
    return response.data as IShippingRate[]
  }
}
