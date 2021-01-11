import { ApiModel, ApiModelProperty, SwaggerDefinitionConstant } from "swagger-express-ts";



@ApiModel({
    description: "Admin login",
    name: "ReqAdminLogin"
})

export class ReqAdminLoginModel {

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
}


@ApiModel({
    description: "Admin add product",
    name: "ReqAdminAddProduct"
})

export class ReqAdminAddProductModel {

    @ApiModelProperty({
        description: "name",
        required: true,
        type: SwaggerDefinitionConstant.STRING,
        example: 'camera' as any
    })
    name: string;
    @ApiModelProperty({
        description: "description",
        required: true,
        type: SwaggerDefinitionConstant.STRING,
        example: 'samsung-v10' as any
    })
    description: string;
    @ApiModelProperty({
        description: "price",
        required: true,
        type: SwaggerDefinitionConstant.NUMBER,
        example: 300 as any
    })
    price: string;
    @ApiModelProperty({
        description: "make",
        required: true,
        type: SwaggerDefinitionConstant.NUMBER,
        example: 2010 as any
    })
    make: string;
}
