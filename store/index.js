/* eslint-disable no-console */
import axios from 'axios'

export const actions = {
    getCode (data) {
        try {
            return new Promise((resolve) => {
                axios.get('http://klikmbc.co.id/json/getcodearea-json')
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
