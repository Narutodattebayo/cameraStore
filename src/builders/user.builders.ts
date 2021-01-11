
import { Types } from "mongoose"
export const productList = (payload: any) => {
    let pipeline = [];
    pipeline.push({ $match: { isDelete: false } })
    let skip = (payload.page - 1) * (payload.limit);
    pipeline.push({ $skip: skip })
    return pipeline;
}

export const myCart = (payload: any, userId: any) => {
    let pipeline = [];
    pipeline.push({ $match: { userId: Types.ObjectId(userId) } })
    pipeline.push({
        $lookup: {
            from: "product",
            let: { product: "$productId" },
            pipeline: [
                { $match: { $expr: { $eq: ['$_id', '$$product'] } } }
            ],
            as: "productDetails"
        }
    })
    pipeline.push({ $unwind: { path: "$productDetails", preserveNullAndEmptyArrays: false } })
    pipeline.push({
        $addFields: {
            totalAmount: {
                $multiply: ["$count", '$productDetails.price']
            }
        }
    })
    let skip = (payload.page - 1) * (payload.limit);
    pipeline.push({ $skip: skip })
    return pipeline;

}



export const userCart = (payload: any) => {
    let pipeline = [];
    pipeline.push({ $match: { userId: Types.ObjectId(payload.userId) } })
    pipeline.push({
        $lookup: {
            from: "product",
            let: { product: "$productId" },
            pipeline: [
                { $match: { $expr: { $eq: ['$_id', '$$product'] } } }
            ],
            as: "productDetails"
        }
    })
    pipeline.push({
        $lookup: {
            from: "users",
            let: { user: "$userId" },
            pipeline: [
                { $match: { $expr: { $eq: ['$_id', '$$user'] } } }
            ],
            as: "userDetails"
        }
    })
    pipeline.push({ $unwind: { path: "$productDetails", preserveNullAndEmptyArrays: false } })
    pipeline.push({ $unwind: { path: "$userDetails", preserveNullAndEmptyArrays: false } })
    pipeline.push({
        $addFields: {
            totalAmount: {
                $multiply: ["$count", '$productDetails.price']
            }
        }
    })
    let skip = (payload.page - 1) * (payload.limit);
    pipeline.push({ $skip: skip })
    return pipeline;

}