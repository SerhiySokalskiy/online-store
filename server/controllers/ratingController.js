import { Rating, Device } from "../models/models.js";

class RatingController {
    async addRating(req, res, next) {
        try {
            const userId = req.user.id;
            const { deviceId, rate } = req.body;

            const existing = await Rating.findOne({ where: { userId, deviceId } });

            if (existing) {
                existing.rate = rate;
                await existing.save();
            } else {
                await Rating.create({ userId, deviceId, rate });
            }

            const ratings = await Rating.findAll({ where: { deviceId } });
            const avgRating = Math.round(ratings.reduce((sum, r) => sum + r.rate, 0) / ratings.length);

            const device = await Device.findByPk(deviceId);
            device.rating = avgRating;
            await device.save();

            return res.json({ message: 'Rating saved', avgRating });
        } catch (error) {
            next(error);
        }
    }
}

export default new RatingController();
