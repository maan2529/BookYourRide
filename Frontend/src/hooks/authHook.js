import { useMutation } from '@tanstack/react-query';
import instance from '../utils/axios/axios';


function useUserLogin() {
    const userLogin = async (data) => {
        const response = await instance.post('/user/login', data);
        return response.data;
    };

    return useMutation({
        mutationFn: userLogin,
    });
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
            console.log(dataFormat)
            const response = await instance.post('/user/register', dataFormat)
            return response
        }
    })
}
function useCaptainSignup() {
    const captainSignin = async (data) => {
        const dataFormat = {
            fullname: {
                firstname: data?.firstname,
                lastname: data?.lastname
            },
            email: data?.email,
            password: data?.password,
            vehicle: {
                color: data?.color,
                plate: data?.plate,
                capacity: data?.capacity,
                vehicleType: data?.vehicleType
            }
        };

        const response = await instance.post('/captains/register', dataFormat);
        console.log(response)
        return response.data;
    };

    return useMutation({
        mutationFn: captainSignin,
        onSuccess: (data) => {
            console.log('Signup successful:', data);
        },
        onError: (error) => {
            console.error('Signup failed:', error);
        }
    });
}

export { useUserLogin, useCaptainLogin, useUserSignup, useCaptainSignup }