const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    
    type User{
        email: String!
        isCust: Int!
        name: String!
        pinCode: String
        userId: String!
        wish: [String!] 
    }

    type Shop{
        email: String!
        isCust: Int!
        name: String!
        pinCode: String
        userId: String! 
        phone: String
        loc: location
    }

    type Prod{
        brand: String
        category: String
        content: String
        id: String!
        imageSrc: String
        imgAlt: String
        isInStock: Int!
        name: String
        price: String!
        sellerId: String!
        custRatings: [String]
        ratingVals: ratVal 
        tags: [String]
        views: Int!
    }

    type ratVal {
        noOfRating: Int!
        ratingValue: Float!
    }

    type location {
        lat: String!
        lng: String!
    }

    input ratDat {
        usId: String!
        prId: String!
        starVal: Float!
    }

    input wiDat {
        usId: String!
        prId: String!
    }

    type rootQuery {
        userSrch(usId: String): User!
        prodSrch(prId: String): Prod!
        shopSrch(shId: String): Shop!
    }

    type rootMutation {
        updRating(ratingDat: ratDat!): Int
        addWish(addWishDat: wiDat!): Int
    }

    schema{
        query: rootQuery
        mutation: rootMutation
    }
`);

