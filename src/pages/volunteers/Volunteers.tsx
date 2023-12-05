import { useEffect, useState } from "react"
import get from "../../api/get";
import { DXAgGrid } from "../../components/volunteers/DXAgGrid";

export const Volunteers = () => {
    const [volunteers, setVolunteers] = useState();
    useEffect(() => {
        const getVolunteers = async() => {
            const response = await get("/User/GetAllUsers");
            setVolunteers(await response.json());
        }
        getVolunteers();
    }, [])
    return <>
    <DXAgGrid setVolunteers={setVolunteers} volunteers={volunteers} ></DXAgGrid>
    </>
}