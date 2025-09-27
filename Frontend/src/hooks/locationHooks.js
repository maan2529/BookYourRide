import { useMutation } from "@tanstack/react-query";
import instance from "../utils/axios/axios"
function useFindTrip(data) {
    function rideFare(data) {
        const response = instance.post('/ride/get-fair', data)
        console.log(response)
        return response
    }
    const mutation = useMutation({
        mutationFn: rideFare,
        onSuccess: (data) => {
            console.log(data)
        },
        onError: (err) => {
            throw Error(err)
        }
    })

    return mutation
}
function useCreateRide(data) {
    function createRide(data) {
        const response = instance.post('/ride/create', data)
        console.log(response)
        return response
    }
    const mutation = useMutation({
        mutationFn: createRide,
        onSuccess: (data) => {
            console.log(data)
        },
        onError: (err) => {
            throw Error(err)
        }
    })

    return mutation
}
export { useFindTrip, useCreateRide }