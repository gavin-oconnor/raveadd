import React, { useState } from 'react'



const AddRestaurant = () => {
    const [name,setName] = useState("")
    const [website,setWebsite] = useState("")
    const [address,setAddress] = useState([null,null,null])
    const [hours,setHours] = useState([[null,null],[null,null],[null,null],[null,null],[null,null],[null,null],[null,null]])
    const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
    const [success,setSuccess] = useState(false)
    const set_Address = (index,value) => {
        const new_add = [...address]
        new_add[index] = value
        setAddress(new_add)
    }
    const set_hours = (major_index,minor_index,value) => {
        const new_hours = [...hours]
        new_hours[major_index][minor_index] = value
        setHours(new_hours)
    }
    const copy_hours = (index,value) => {
        const new_value = [...value]
        const new_hours = [...hours]
        new_hours[index] = new_value
        setHours(new_hours)
    }
    const reset = () => {
        setSuccess(false)
        setName("")
        setWebsite("")
        setAddress([null,null,null])
        setHours(([[null,null],[null,null],[null,null],[null,null],[null,null],[null,null],[null,null]]))
    }
    const add_restaurant = async() => {
        try {
            console.log(1)
            if(!name || !website) {
                return
            }
            console.log(2)
            for(let i=0; i<address.length; i++) {
                if(!address[i]) {
                    return
                }
            }
            console.log(3)
            for(let i=0; i<hours.length; i++) {
                if(!hours[i]) {
                    return
                }
            }
            console.log(4)
            const response = await fetch("https://smacks.herokuapp.com/addpendingrestaurant",
            {
                method: "POST",
                crossorigin: true,          
                headers: {
                    Accept: "application/json",
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    "name":name,
                    "website":website,
                    "address":address,
                    "hours":hours
                })
            })
            console.log(5)
            const json = await response.json()
            if(json.error === -1) {
                setSuccess(true)
            }
        } catch(error) {
            console.error(error)
        }
    }
    return (
        <div className="ar-containter">
        {success ? 
        <div>
            <h2>Added Successfully</h2>
            <button className="btn" onClick={reset}>Add another restaurant</button>

        </div> 
        : <><h2>Add a New Restaurant</h2>
            <div className="ar-flex-row">
        <input type="text" placeholder="Name" onInput={(e) => setName(e.target.value)}/>
        <input type="text" placeholder="Website" onInput={(e) => setWebsite(e.target.value)}/>
        </div>
        <div className="ar-flex-row">
        <input type="text" placeholder="Street Address" onInput={(e) => set_Address(0,e.target.value)}/>
        <input type="text" placeholder="City" onInput={(e) => set_Address(1,e.target.value)}/>
        </div>
        <div className="ar-flex-row">
        <input type="number" placeholder="Zip Code" onInput={(e) => set_Address(2,e.target.value)}/>
        </div>
        {days.map((value,index) => <>
        <p>{value} Hours</p>
        <div className="ar-flex-row-1">
        <input className="time-input" type="time" placeholder="open" value={hours[index][0] ? hours[index][0] : ""} onChange={(e) => set_hours(index,0,e.target.value)}/>
        <input className="time-input" type="time" placeholder="close" value={hours[index][1] ? hours[index][1] : ""} onChange={(e) => set_hours(index,1,e.target.value)}/>
        {index < 6 ? <button onClick={() => copy_hours(index+1,hours[index])}>⬇</button> : <></>}
        </div>
        </>)}
        <div className="ar-flex-row">
        <button className="btn" onClick={add_restaurant}>Add Restaurant</button>
        </div>
        </>}
        </div>

  )
}

export default AddRestaurant