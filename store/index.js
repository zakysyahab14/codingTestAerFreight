/* eslint-disable no-console */
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';

const API_SERVER = 'http://localhost:3005/'
export const actions = {
    getCargoList({}, payload){
        let endPoint = `${API_SERVER}data/cargo`
        if(payload.loggedIn === false){
            endPoint += `?status=true`
        }
        try{
            return new Promise( resolve => {
                axios.get(endPoint)
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
        let endPoint = 'data/cargo'
        const {body} = payload
        if(body.id !== undefined) endPoint += `/${body.id}`
        try{
            return new Promise ( resolve => {
                axios.put(API_SERVER+endPoint, {...body})
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
                axios.post(API_SERVER+'data/cargo', {
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
                axios.delete(API_SERVER+'data/cargo/'+id)
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
    getFlight({}, payload){
        let endPoint =`${API_SERVER}flight/schedule`
        if(payload && payload.key){
            endPoint += `?city=${payload.key}`
        }
        try{
            return new Promise((resolve) => {
                axios.get(endPoint)
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
    },
    login({}, payload){
        const { username, password } = payload
        try{
            return new Promise((resolve) => {
                axios.get(`${API_SERVER}user/user?username=${username}&password=${password}`)
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

        }
    }
}
