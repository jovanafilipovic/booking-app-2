const User = require('../models/user');

class UserService {

  async createUser(userData) {
    try {
      const newUser = new User(userData);
      console.log('Novi korisnik: ', newUser);
      return await newUser.save();
    } catch (error) {
      throw error;
    }
  }

//   async getAllSports() {
//     try {
//       return await Sport.find({ itemType: 'sport' }).sort({ createdAt: -1 });
//     } catch (error) {
//       throw error;
      
//     }
//   }
}

module.exports = new UserService();
