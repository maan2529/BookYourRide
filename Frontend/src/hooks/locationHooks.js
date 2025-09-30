import { useMutation } from "@tanstack/react-query";
import instance from "../utils/axios/axios"
import { useContext } from "react";
import { myContext } from "../context/MyContextComponent";
import { socketContext } from "../context/SocketProvider";
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
    const { setRide } = useContext(myContext)
    async function createRide(data) {
        const response = await instance.post('/ride/create', data);
        console.log(response.data);
        return response;
    }
    const mutation = useMutation({
        mutationFn: createRide,
        onSuccess: (data) => {
            console.log(data)
            setRide(data?.data?.data)
            // setFare(data?.data?.data)
        },
        onError: (err) => {
            throw Error(err)
        }
    })

    return mutation
}
function useConfirmRide() {
    const { setConfirmRideDetails } = useContext(socketContext)
    async function confirmRide(rideId) {
        const response = await instance.post('/ride/confirm', { rideId });
        console.log(response.data);
        return response;
    }
    const mutation = useMutation({
        mutationFn: confirmRide,
        onSuccess: (data) => {
            console.log(data)
            setConfirmRideDetails(data?.data)
            // setRide(data?.data?.data)
            // setFare(data?.data?.data)
        },
        onError: (err) => {
            throw Error(err)
        }
    })

    return mutation
}

function useFinishRide() {
    const { setConfirmRideDetails } = useContext(socketContext)
    async function finishRide(rideId) {
        const response = await instance.post('/ride/finish-ride', { rideId });
        console.log(response.data);
        return response;
    }
    const mutation = useMutation({
        mutationFn: finishRide,
        onSuccess: (data) => {
            console.log(data)

        },
        onError: (err) => {
            throw Error(err)
        }
    })

    return mutation
}
export { useFindTrip, useCreateRide, useConfirmRide, useFinishRide }