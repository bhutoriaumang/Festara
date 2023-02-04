import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useEventsContext } from '../hooks/useEventsContext'
import { FaTrashAlt,FaPencilAlt } from 'react-icons/fa'
import { useState } from 'react'

const EventCard = ({event})=>{

    const { dispatch } = useEventsContext()
    const [isUpdating, setIsUpdating] = useState(false)
    const [title,setTitle] = useState(event.title)
    const [description,setDescription] = useState(event.description)
    const [timing,setTiming] = useState(event.timing)

    const handleUpdate = () => {
        setIsUpdating(true)
    }

    const handleDelete = async () => {
        const response = await fetch('/home/api/events/'+event._id,{
            method: 'DELETE',
        })
        const json = await response.json()
        if(response.ok){
            dispatch({type:"DELETE_EVENT",payload: json})
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const participants = event.participants
        const x = {title,description,timing,participants}
        const response = await fetch('/home/api/events/'+event._id,{
            method: 'PATCH',
            body: JSON.stringify(x),
            headers: {
                'Content-Tyoe': 'applicaiton/json'
            }
        })
        const json = await response.json()
        if(response.ok){
            json["title"] = title
            json["description"] = description
            json["timing"] = timing
            dispatch({type:"UPDATE_EVENT",payload: json})
            setIsUpdating(false)
        }
    }

    return(
        <div className="event-card">
            { !isUpdating && 
                <>
                    <div className="event-card-header">
                        <h2>{event.title}</h2>
                    </div>
                    <div className="event-card-body">
                        <p>{event.description}</p>
                    </div>
                    <div className="event-card-info">
                        <p>No of seats left : {event.participants}</p>
                        <p>{formatDistanceToNow(new Date(event.timing), { addSuffix: true })}</p>
                    </div>
                    <div className="event-card-update">
                        <FaPencilAlt className="icon" size="20%" onClick={handleUpdate}/>
                    </div>
                    <div className="event-card-delete">
                        <FaTrashAlt className="icon" size="20%" onClick={handleDelete}/>
                    </div>
                </>
            }
            { isUpdating &&
                <form onSubmit={handleSubmit}>
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
                        <input type="datetime-local" name="date" id="date" step="1" value={timing.substring(0,timing.length-1)}  onChange={(e)=>setTiming(e.target.value)}/>
                    </div>
                    <button> SUBMIT </button>
                </form>
            }
        </div>
    );
}

export default EventCard;