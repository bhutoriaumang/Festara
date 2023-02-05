import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useEventsContext } from '../hooks/useEventsContext'
import { FaTrashAlt,FaPencilAlt } from 'react-icons/fa'
import { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'

const EventCard = ({event})=>{

    const { dispatch } = useEventsContext()
    const [isUpdating, setIsUpdating] = useState(false)
    const [title,setTitle] = useState(event.title)
    const [description,setDescription] = useState(event.description)
    const [timing,setTiming] = useState(event.timing)
    const { user, isAdmin, dispatch: authDispatch } = useAuthContext()
    const isRegistered = user.events.includes(event._id)



    const handleRegister = async () => {
        console.log(user,event._id)

        if(!user)
            return

        const email = user.email
        const event_id = event._id
        const x = {email,event_id}

        const response = await fetch('/home/api/user/update',{
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(x),
        })

        const json = await response.json()

        if(response.ok){
            authDispatch({type:"UPDATE_USER",payload: json})
            alert("Registered for event")
        }
    }

    const handleUpdate = () => {
        var card = document.getElementById(event._id);
        card.classList.toggle('is-flipped');
    }

    const handleDelete = async () => {

        if(!user)
            return

        const response = await fetch('/home/api/events/'+event._id,{
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()
        if(response.ok){
            dispatch({type:"DELETE_EVENT",payload: json})
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!user)
            return

        const participants = event.participants
        const x = {title,description,timing,participants}
        const response = await fetch('/home/api/events/'+event._id,{
            method: 'PATCH',
            body: JSON.stringify(x),
            headers: {
                'Content-Tyoe': 'applicaiton/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()
        if(response.ok){
            json["title"] = title
            json["description"] = description
            json["timing"] = timing
            dispatch({type:"UPDATE_EVENT",payload: json})
            setIsUpdating(false)
            var card = document.getElementById(event._id);
            card.classList.toggle('is-flipped');
        }
    }

    return(
        <div className="event-card" id={event._id}>
            <div className='event-card-face event-card-front'>
                <div className="event-card-header">
                    <h2>{event.title}</h2>
                </div>
                <div className="event-card-body">
                    <span>{event.description}</span>
                </div>
                <div className="event-card-info">
                    <span>No of seats left : {event.participants}</span>
                    <br /><br />
                    <span>{formatDistanceToNow(new Date(event.timing), { addSuffix: true })}</span>
                </div>
                { isAdmin && <div className="event-card-update">
                    <FaPencilAlt className="icon" size="20%" onClick={handleUpdate}/>
                </div>}
                { isAdmin && <div className="event-card-delete">
                    <FaTrashAlt className="icon" size="20%" onClick={handleDelete}/>
                </div>}
                { !isAdmin && 
                    <div className="event-card-register-event">
                        <button className="btn btn-primary" onClick={handleRegister} disabled={isRegistered} >REGISTER</button>
                    </div>
                }
            </div>
            <div className='event-card-face event-card-back'>
                <div className="update-title">
                    <label>Enter Title of event: </label>
                    <input type="text" name="title" id="title" placeholder="Enter title of event" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                </div>
                <div className="update-description">
                    <label>Enter Description for event: </label>
                    <textarea rows="3" name="description" placeholder="Enter description for event" value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
                </div>
                <div className="update-timing">
                    <label>Enter Date and Time of event:</label>
                    <input type="datetime-local" name="date" id="date" value={timing.substring(0,timing.length-1)}  onChange={(e)=>setTiming(e.target.value+'Z')}/>
                </div>
                <button onClick={handleSubmit} className="update-submit"> SUBMIT </button>
                <button onClick={handleUpdate} className="update-cancel"> CANCEL </button>
            </div>
        </div>
    );
}

export default EventCard;