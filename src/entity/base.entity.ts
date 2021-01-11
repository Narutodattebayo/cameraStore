
import { Model, Types } from "mongoose";

export default class BaseEntity {

    constructor(protected model: Model<any>) {
        this.model = model;
    }

    /** 
     * finds a single user based on payload condition
     * @params payload (condition), projection
     */
    async findOne<T>(condition: IApp.DataKeys, project: IApp.DataKeys = {}, options: any = {}): Promise<T> {
        if (condition._id) condition._id = Types.ObjectId(condition._id);
        return this.model.findOne(condition, project, options).lean().exec();
    }

  

    /**
     * finds multiple records based on condition
     * @params payload, projection
     */
    async findMany<T>(condition: IApp.DataKeys, project: IApp.DataKeys = {}): Promise<T[]> {
        condition.isDelete = false;
        return await this.model.find(condition, project).lean().exec();
    }

  

    /**
     * updates the entity record with the payload
     * @params condition, payload, options { multi: [boolean] }
     */
    async editEntity<T>(condition: IApp.DataKeys, payload: IApp.DataKeys, options: any = {}): Promise<IApp.Entity<T>> {
        condition.isDelete = false;
        if (options.multi) {
            await this.model.updateMany(condition, payload, options).exec();
            return { type: 'MULTI' };
        } else {
            if (typeof options.new === 'undefined') options.new = true;
            let updatedData: T = await this.model.findOneAndUpdate(condition, payload, options).lean().exec();
            if (updatedData) return { type: 'SINGLE', data: updatedData };
            else return { type: 'SINGLE' };
        }
    }

    /**
     * updates and sets the user fields record with the payload fields
     * @params condition, payload
     * @param options.multi - updates multiple records
     */
    async updateEntity<T>(condition: IApp.DataKeys, payload: IApp.DataKeys, options: any = {}): Promise<IApp.Entity<T>> {
        condition.isDelete = false;
        if (options.multi) {
            await this.model.updateMany(condition, { $set: payload }, options).exec();
            return { type: 'MULTI' };
        } else {
            if (typeof options.new === 'undefined') options.new = true;
            let updatedData: T = await this.model.findOneAndUpdate(condition, { $set: payload }, options).lean().exec();
            if (updatedData) return { type: 'SINGLE', data: updatedData };
            else return { type: 'SINGLE' };
        }
    }

    async updateDocument(condition: any, payload: any, options?: any) {
        let data = await this.model.findOneAndUpdate(condition, { $set: payload }, options).lean().exec();
        return data
    }


    /**
     * basic aggregate function
     * @param
     */
    async basicAggregate(pipeline: any[]) {
        return this.model.aggregate(pipeline).collation({ locale: 'en', strength: 1 }).exec();
    }

   

   
}