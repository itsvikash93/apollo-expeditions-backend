const upcomingTripModel = require("../models/upcoming-trip.model");

module.exports.getUpcomingTrips = async (req, res) => {
  const upcomingTrips = await upcomingTripModel.find();
  res.status(200).json(upcomingTrips);
};

module.exports.addUpcomingTrip = async (req, res) => {
  const upcomingTrip = await upcomingTripModel.create(req.body);
  res.status(201).json(upcomingTrip);
};

module.exports.updateUpcomingTrip = async (req, res) => {
  const upcomingTrip = await upcomingTripModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(upcomingTrip);
};

module.exports.deleteUpcomingTrip = async (req, res) => {
  await upcomingTripModel.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Trip deleted" });
};
