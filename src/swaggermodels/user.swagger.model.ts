import { ApiModel, ApiModelProperty, SwaggerDefinitionConstant } from "swagger-express-ts";



@ApiModel({
    description: "user signup",
    name: "ReqAddUser"
})

export class ReqAddUserModel {

    @ApiModelProperty({
        description: "email",
        required: true,
        type: SwaggerDefinitionConstant.STRING,
        example: 'email' as any
    })
    email: string;
    @ApiModelProperty({
        description: "password",
        required: true,
        type: SwaggerDefinitionConstant.STRING,
        example: 'password' as any
    })
    password: string;
    @ApiModelProperty({
        description: "name",
        required: true,
        type: SwaggerDefinitionConstant.STRING,
        example: 'password' as any
    })
    name: string;
}



@ApiModel({
    description: "addToCartModel",
    name: "addToCartModel"
})

export class addToCartModel {

    @ApiModelProperty({
        description: "PRODUCTiD",
        required: true,
        type: SwaggerDefinitionConstant.STRING,
        example: 'id' as any
    })
    productId: string;
    @ApiModelProperty({
        description: "count",
        required: true,
        type: SwaggerDefinitionConstant.NUMBER,
        example: 2 as any
    })
    count: number;
}
