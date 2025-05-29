import { v4 as uuidv4 } from 'uuid';
import { Device, DeviceInfo } from "../models/models.js";
import path from 'path';
import ApiError from '../error/ApiError.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { where } from 'sequelize';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class DeviceController {
    async create (req, res, next) {
        try {
            let {name, price, brandId, typeId, info} = req.body;
            const {img} = req.files;
            const fileName = uuidv4() + ".jpeg";
            img.mv(path.resolve(__dirname, '..', 'static', fileName));
            const device = await Device.create({name, price, brandId, typeId, img: fileName});


            if (info){
                info = JSON.parse(info);
                info.forEach(i => {
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                });
            }

            return res.json(device);
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async getAll (req, res, next) {
        try {
            let {brandId, typeId} = req.query;
            let devices;
            page = page || 1;
            limit = limit || 9;
            let offset = page*limit - limit;
            if (!brandId && !typeId){
                devices = await Device.findAndCountAll({limit, offset})
            }
            if (brandId && !typeId){
                devices = await Device.findAndCountAll({where: {brandId}, limit, offset})
            }
            if (!brandId && typeId){
                devices = await Device.findAndCountAll({where: {typeId}, limit, offset})
            }
            if (brandId && typeId){
                devices = await Device.findAndCountAll({where: {brandId, typeId}, limit, offset})
            }
            return res.json(devices);
            } catch (error) {
                next(ApiError.badRequest(error.message))
            }
    }
    async getOne (req, res) {
        const {id} = req.params;
        const device = await Device.findOne({
            where: {id},
            include: [{model: DeviceInfo, as: 'info'}]
        })
        return res.json(device)
    }
}

export default new DeviceController();