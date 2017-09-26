import faker from 'faker';

import User from '../models/User';

const USER_TOTAL = 10;

export default async () => {
  try {
    await User.remove();


    await Array.from({length: USER_TOTAL}).forEach(async (_, i) => {
      const user = await User.create({
        email: faker.internet.email(),
        name: faker.name.firstName(),
        username: faker.internet.userName(),
        age: 20,
        avatar: `http://randomuser.me/api/portraits/women/${i}.jpg`,
        password: 'password123'
      })
    });

  } catch (error) {
    throw error;
  }
}
