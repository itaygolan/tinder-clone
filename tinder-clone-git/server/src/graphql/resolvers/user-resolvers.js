import User from '../../models/User';
import { requireAuth } from '../../services/auth';


export default {
  signup: async (_, args) => {
    try {
      const user = await User.create( args );
      return {
        token: user._createToken()
      };
    } catch (error) {
      throw error;
    }
  },

  login: async (_, { email, password }) => {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error('User does not exist!')
      }

      if(!user._authenticateUser(password)) {
        throw new Error('The password is incorrect');
      }

      return {
        token: user._createToken()
      };

    } catch (error) {
      throw error;
    }
  },

  getUsers: async (_, args, ctx) => {
    try {
      const users = await User.find({}).sort({ createdAt: -1 });
      await requireAuth(ctx.user);
      return users;
    } catch (error) {
      throw error;
    }
  },
  createCard: async (_, args, ctx) => {
    try {
      const card = await User.findById( args._id );
      return card;
    } catch (error) {
      throw error;
    }
  },

  me: async (_, args, ctx) => {
    try {
      const me = await requireAuth(ctx.user)
      return me;
    } catch (error) {
      throw error;
    }
  }
}
