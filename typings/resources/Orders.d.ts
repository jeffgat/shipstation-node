import { ICreateOrUpdateOrder, ICreateOrUpdateOrderBulkResponse, IOrder, IOrderPaginationResult, ICreateLabel, ICreateLabelResponse } from '../models';
import Shipstation from '../shipstation';
import { BaseResource } from './Base';
export declare class Orders extends BaseResource<IOrder> {
    protected shipstation: Shipstation;
    constructor(shipstation: Shipstation);
    getAll(opts?: object, country?: 'international' | 'canada' | undefined): Promise<IOrderPaginationResult>;
    createOrUpdate(data: ICreateOrUpdateOrder, country?: 'international' | 'canada' | undefined): Promise<IOrder>;
    createOrUpdateBulk(data: ICreateOrUpdateOrder[]): Promise<ICreateOrUpdateOrderBulkResponse>;
    createLabel(data: ICreateLabel): Promise<ICreateLabelResponse>;
}
