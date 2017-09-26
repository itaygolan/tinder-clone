import Card from '../../models/Card';

export default {
  createCard: async (_, args, ctx) => {
    try {
      const card = await Card.create({ ...args, user: ctx.user._id });
      return card;
    } catch (error) {
      throw error;
    }
  }
}
