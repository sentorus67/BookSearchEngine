

// type Book {
//     _id: ID
//     authors: [String]
//     description: String
//     bookId: String
//     image: String
//     title: String
//     }
//savedBooks: [bookSchema]

const typeDefs=` 

    type Book {
    _id: ID
    authors: [String]
    description: String
    bookId: String
    image: String
    title: String
    }

    type User {
    _id: ID
    username: String
    email: String
    password: String
    books: [Book]
    }


    
    type Auth {
        token: ID!
        user: User
    }

    type Query {
        users: [User]
    }
    
    type Mutation{
        creatUser(username: String!, email: String!, password: String!): Auth
        getSingleUser: User
        saveBook: Book
        deleteBook: Book
        login(email: String!, password: String!): Auth
    }
    `;
module.exports=typeDefs;