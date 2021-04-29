import { IShipment, IShippingRate, IShippingRateOptions } from '../models';
import Shipstation from '../shipstation';
import { BaseResource } from './Base';
export declare class Shipments extends BaseResource<IShipment> {
    protected shipstation: Shipstation;
    constructor(shipstation: Shipstation);
    getAll(opts?: object, country?: 'international' | 'canada' | undefined): Promise<IShipment[]>;
    getRates(data?: IShippingRateOptions, country?: 'international' | 'canada' | undefined): Promise<IShippingRate[]>;
}
