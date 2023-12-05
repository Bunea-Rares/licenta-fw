import { useState, useEffect } from "react";
import get from "../../api/get";
import PostCard from "./PostCard";

export const Feed = () => {
    const [events, setEvents] = useState();
    useEffect(() => {
        const getEvents = async() => {
            const response = await get("/Event/GetAllEvents");
            setEvents(await response.json());
        }
        getEvents();
    }, [])
    return (
        <>
        {events?.map(event => <PostCard event={event} setEvents={setEvents}/>)}
        </>
    )
}