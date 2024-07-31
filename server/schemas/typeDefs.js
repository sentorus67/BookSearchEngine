

const typeDefs=` 

    type Book {
    _id: ID
    authors: [String]
    description: String
    bookId: String
    image: String
    title: String
    link: String
    }

    type User {
    _id: ID
    username: String
    email: String
    password: String
    books: [Book]
    }

    input BookInput {
    authors: [String]
    description: String
    bookId: String
    image: String
    title: String
    link: String
    }
    
    type Auth {
        token: ID!
        user: User
    }

    type Query {
        users: [User]
    }
    
    type Mutation{
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(bookData: BookInput): User
        removeBook(bookId: String!): Book
        login(email: String!, password: String!): Auth
    }
    `;
module.exports=typeDefs;