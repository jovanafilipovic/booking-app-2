const Sport = require('../models/sport');

class SportService {
  async createSport(sportData) {
    try {
      const newSport = new Sport(sportData);
      return await newSport.save();
    } catch (error) {
      throw error;
    }
  }

  // async getAllSports() {
  //   try {
  //     return await Sport.find({ itemType: 'sport' }).sort({ createdAt: -1 });
  //   } catch (error) {
  //     throw error;
      
  //   }
  // }
}

module.exports = new SportService();
