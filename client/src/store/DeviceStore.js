import { makeAutoObservable } from "mobx";

export default class DeviceStore{
    constructor(){
        this._types = [
            {
                id:1, name: "Fridges"
            },
            {
                id: 2, name: "Smartphones"
            },
            {
                id: 3, name: "TVs"
            },
            {
                id: 4, name: "Laptops"
            }
        ]
        this._brands = [
            {
                id:1, name: "Samsung"
            },
            {
                id: 2, name: "Apple"
            }
        ]
        this._devices = [
            {id: 1, name: "IPhone 12 pro", price: 25000, rating: 5, img: "https://apple-people.com.ua/content/images/15/422x536l50bc50/apple-iphone-12-pro-128gb-gold-mgmm3-original-30538820118579.png"},
            {id: 2, name: "IPhone 12 pro", price: 25000, rating: 5, img: "https://apple-people.com.ua/content/images/15/422x536l50bc50/apple-iphone-12-pro-128gb-gold-mgmm3-original-30538820118579.png"},
            {id: 3, name: "IPhone 12 pro", price: 25000, rating: 5, img: "https://apple-people.com.ua/content/images/15/422x536l50bc50/apple-iphone-12-pro-128gb-gold-mgmm3-original-30538820118579.png"},
            {id: 4, name: "IPhone 12 pro", price: 25000, rating: 5, img: "https://apple-people.com.ua/content/images/15/422x536l50bc50/apple-iphone-12-pro-128gb-gold-mgmm3-original-30538820118579.png"}
        ]
        this._selectedType={}
        makeAutoObservable(this)
    }
    setTypes(types){
        this._types = types;
    }
    setBrands(brands){
        this._brands = brands;
    }
    setDevices(devices){
        this._devices = devices;
    }
    setSelectedType(type){
        this._selectedType = type;
    }
    get types(){
        return this._types;
    }
    get brands(){
        return this._brands;
    }
    get devices(){
        return this._devices;
    }
    get selectedType(){
        return this._selectedType;
    }
}