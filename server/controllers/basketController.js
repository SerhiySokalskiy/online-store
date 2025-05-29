import { Basket, BasketDevice, Device } from '../models/models.js';

class BasketController {
    async add(req, res, next) {
        try {
            const userId = req.user.id;
            const { deviceId } = req.body;

            const basket = await Basket.findOne({ where: { userId } });
            if (!basket) {
                return res.status(404).json({ message: 'Basket not found' });
            }
                const basketDevice = await BasketDevice.create({
                    basketId: basket.id,
                    deviceId: deviceId
                });
            return res.json(basketDevice);
        } catch (error) {
            next(error);
        }
    }

    async get(req, res, next) {
        try {
            const userId = req.user.id;
            const basket = await Basket.findOne({
                where: { userId },
                include: {
                    model: BasketDevice,
                    include: [Device]
                }
            });

            return res.json(basket);
        } catch (error) {
            next(error);
        }
    }

    async remove(req, res, next) {
        try {
            const { basketDeviceId } = req.params;

            const basketDevice = await BasketDevice.findByPk(basketDeviceId);
            if (!basketDevice) {
                return res.status(404).json({ message: 'Item not found in basket' });
            }

            await basketDevice.destroy();
            return res.json({ message: 'Item removed from basket' });
        } catch (error) {
            next(error);
        }
    }
}

export default new BasketController();
