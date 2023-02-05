import { useState } from 'react';
import { useEventsContext } from '../hooks/useEventsContext'
import { useAuthContext } from '../hooks/useAuthContext';

const EventForm = ()=>{

    const { dispatch } = useEventsContext()
    const [title,setTitle] = useState("")
    const [description,setDescription] = useState("")
    const [timing,setTiming] = useState("")
    const { user } = useAuthContext()

    const handleSubmit = async (e)=>{
        e.preventDefault();

        if(!user)
            return

        const participants = 60
        const event = {title,description,timing,participants}
        const response = await fetch('/home/api/events',{
            method: 'POST',
            body: JSON.stringify(event),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if (response.ok) {
            setTitle('')
            setDescription('')
            setTiming('')
            console.log('New event added:', json)
            dispatch({type:"CREATE_EVENT",payload: json})
          }
        
    }

    return (
        <div className="event-form">
            <div className="event-form-header">
                <h2>Add an event</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <label>Enter Title of event: </label>
                <input type="text" name="title" id="title" placeholder="Enter title of event" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                <label>Enter Description for event: </label>
                <textarea rows="3" name="description" placeholder="Enter description for event" value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
                <label>Enter Date and Time of event: </label>
                <input type="datetime-local" name="date" id="date" value={timing}  onChange={(e)=>setTiming(e.target.value)}/>
                <button> SUBMIT </button>
            </form>
        </div>
    );
}

export default EventForm;