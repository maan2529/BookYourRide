import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import instance from "../utils/axios/axios";

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

export default useCaptainDetail 