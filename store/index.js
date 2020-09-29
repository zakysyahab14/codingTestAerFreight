/* eslint-disable no-console */
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';

const CARGO_SERVER = 'http://localhost:3004/'
export const actions = {
    getCargoList(){
        try{
            return new Promise( resolve => {
                axios.get(CARGO_SERVER+'cargo')
                    .then(response => {
                        if (response.status === 200) {
                            resolve(response.data)
                        } else {
                            resolve(false)
                        }
                    })
                    .catch(err => {
                        resolve(false)
                    }) 
            })
            
        } catch(err){
            console.log(err)
        }
    },
    updateCargoItem({}, payload){
        let endPoint = 'cargo'
        const {body} = payload
        if(body.id !== undefined) endPoint += `/${body.id}`
        try{
            return new Promise ( resolve => {
                axios.put(CARGO_SERVER+endPoint, {...body})
                    .then(response => {
                        if (response.status === 200) {
                            resolve(response.data)
                        } else {
                            resolve(false)
                        }
                    })
                    .catch( err => {
                        resolve(false)
                    })
            })
        }catch(err){

        }
    },
    addCargoItem({}, payload){
        const { body } = payload
        try{
            return new Promise( resolve => {
                axios.post(CARGO_SERVER+'cargo', {
                    id: uuidv4(),
                    ...body
                })
                    .then(response => {
                        if (response.status === 200) {
                            resolve(response.data)
                        } else {
                            resolve(false)
                        }
                    })
                    .catch(err => {
                        resolve(false)
                    })
            })
        }catch(err){

        }
    },
    deleteCargoItem({}, payload){
        const { id } = payload
        try{
            return new Promise( resolve => {
                axios.delete(CARGO_SERVER+'cargo/'+id)
                    .then(response => {
                        if (response.status === 200) {
                            resolve(response.data)
                        } else {
                            resolve(false)
                        }
                    })
                    .catch(err => {
                        resolve(false)
                    })
            })
        }catch(err){

        }
    },
    getCode (data) {
        try {
            return new Promise((resolve) => {
                axios.get('http://klikmbc.co.id/json/getcodearea-json', {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then ((response) => {
                    if (response.status === 200) {
                        resolve(response.data)
                      } else {
                        resolve(false)
                      }
                }) .catch(() => {
                    resolve(false)
                })
            })
        } catch (error) {
        }
    }
}
