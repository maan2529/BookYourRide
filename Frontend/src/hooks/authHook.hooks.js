import { useMutation } from '@tanstack/react-query';
import instance from '../utils/axios/axios';

function useUserLogin() {

    return useMutation({
        mutationFn: async (data) => {
            const response = await instance.post('/user/login', data)
            // console.log(response)
            return response.data
        }
    })

}
function useCaptainLogin() {
    return useMutation({
        mutationFn: async (data) => {
            const response = await instance.post('/captains/login', data)

            return response.data
        }
    })
}

function useUserSignup() {
    return useMutation({
        mutationFn: async function (data) {

            let dataFormat = {
                fullname: {
                    firstname: data.firstname,
                    lastname: data.lastname
                },
                email: data.email,
                password: data.password,
            }
            const response = await instance.post('/user/register', dataFormat)
            return response
        }
    })
}

function useCaptainSignup() {
    return useMutation({
        mutationFn: async function (data) {
            let dataFormat = {
                fullname: {
                    firstname: data.firstname,
                    lastname: data.lastname
                },
                email: data.email,
                password: data.password,
                vehicle: {
                    color: data.color,
                    plate: data.plate,
                    capacity: data.capacity,
                    vehicleType: data.vehicleType
                }
            }
            const response = await instance.post('/captains/register', dataFormat)
            return response.data
        }
    })
}
export { useUserLogin, useCaptainLogin, useUserSignup, useCaptainSignup }