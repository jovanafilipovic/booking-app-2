const Location = require('../models/location');

class LocationService {
  async createLocation(locationData) {
    try {
      const newLocation = new Location(locationData);
      return await newLocation.save();
    } catch (error) {
      throw error;
    }
  }

  async getAllLocations() {
    try {
      return await Location.find({ itemType: 'location' }).sort({ createdAt: -1 });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new LocationService();
