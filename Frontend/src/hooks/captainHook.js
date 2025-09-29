import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import instance from "../utils/axios/axios";
import { useContext } from "react";
import { socketContext } from "../context/SocketProvider";

function useCaptainDetail() {
    async function getCaptainFun() {
        try {
            const captainResponse = await instance.get("/captains/get-captain")
            return captainResponse
        } catch (error) {
            throw error
        }
    }
    const mutation = useQuery({
        queryKey: ["get-captain"],
        queryFn: getCaptainFun,

    })

    return mutation;
}
function useRideConfirm() {
    const { setOTPMatch } = useContext(socketContext)
    async function rideConfirm(data) {
        console.log(data)
        const rideStartResponse = await instance.post("/ride/start-ride", data
        )
        return rideStartResponse

    }
    const mutation = useMutation({
        mutationFn: rideConfirm,
        onSuccess: (data) => {
            console.log("data", data);
            // setOTPMatch(data)
        },
        onError: (err) => {
            console.log(err)
        }

    })

    return mutation;
}



export { useCaptainDetail, useRideConfirm }