import { $authHost, $host } from "./index"
import {jwtDecode} from 'jwt-decode'

export const createType = async (type) => {
    const {data} = await $authHost.post('api/type', type)
    return data
}
export const fetchType = async () => {
    const {data} = await $host.get('api/type')
    return data
}
export const createBrand = async (brand) => {
    const {data} = await $authHost.post('api/brand', brand)
    return data
}
export const fetchBrand = async () => {
    const {data} = await $host.get('api/brand')
    return data
}
export const createDevice = async (device) => {
    const {data} = await $authHost.post('api/device/', device)
    return data
}
export const fetchDevice = async (typeId, brandId, page, limit = 5) => {
    const {data} = await $host.get('api/device/', {params: {
        typeId, brandId, page, limit
    }})
    return data
}
export const fetchOneDevice = async (id) => {
    const {data} = await $host.get('api/device/'+id)
    return data
}
export const addRating = async (deviceId, rate) => {
    const { data } = await $authHost.post('api/rating', { deviceId, rate });
    return data;
}