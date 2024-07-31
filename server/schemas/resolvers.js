const {User,bookSchema} = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers ={
    Query:{
        users: async () => {
            return await User.find({});
        }
    },
    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
          },


        saveBook: async ( parent,{ bookData }, context ) =>{
            console.log(context.user);
            console.log(context.user._id);
            if (context.user){
                return await User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$push:{savedBooks: bookData}},
                    {new: true}
                );
             }
        },

        removeBook: async ( parent,{ bookId} ) =>{
            if(context.user)
            {
                return User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$pull:{savedBooks:{_id: bookId}}},
                    {new:true}
                );
            }
             throw AuthenticationError;

        },
        login: async ( parent,{ email, password} ) =>{
            const user = await User.findOne({ email });
            if (!user) { throw AuthenticationError;}

            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {throw AuthenticationError; }

            const token = signToken(user);
            return { token, user };
        }
    }

};

module.exports=resolvers;
