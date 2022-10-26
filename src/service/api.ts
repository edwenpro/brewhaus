import { Beer } from "../interface/beer";

export const BaseUrl = 'https://api.punkapi.com/v2/'

export const getBeersByPage = (pageNumber: number, pageSize: number) => {
    return fetch(`${BaseUrl}beers?page=${pageNumber}&per_page=${pageSize}`)
}

export const getBeer = (id: number) => {
    return fetch(`${BaseUrl}beers/${id}`)
}