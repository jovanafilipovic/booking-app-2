const Court = require('../models/court');
const Location = require('../models/location');
const Sport = require('../models/sport');

class CourtService {

  async createCourt(courtData) {
    try {
      const municipality = await Location.findOne({ name: courtData.municipality });
      if (!municipality) {
        throw new Error(`Municipality "${courtData.municipality}" not found.`);
      }
      
      const sports = await Sport.find({ name: { $in: courtData.sports } });
      if (sports.length !== courtData.sports.length) {
        throw new Error(`One or more sports not found.`);
      }
      
      courtData.municipality = municipality.id;
      courtData.sports = sports.map(sport => sport.id);
  
      const newCourt = new Court(courtData);
      return await newCourt.save();
    } catch (error) {
      throw error;
    }
  }

  // async getAllCourts() {
  //   try {
  //     return await Court.find({ itemType: 'court' }).sort({ createdAt: -1 });
  //   } catch (error) {
  //     throw error;
  //   }
  // }
}

module.exports = new CourtService();
