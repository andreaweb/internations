import React, { useState } from 'react'
import uuid from 'react-uuid'

type Props = {
    onSubmit: () => void
}

export const NewGroup = ({onSubmit}: Props) => {
    const [groupName, setGroupName] = useState('')

    const handleSubmit = () => {
        if (groupName) {
            const newGroup = {
                "id": uuid(),
                "name": groupName
            }
            sessionStorage.setItem(`group-${newGroup.id}`, JSON.stringify(newGroup))
            onSubmit()
        } else {
            alert("Field Name is mandatory.")
        }
    }

    return (
        <div>
            <h2>Please input your new group's name*</h2>
            <input onChange={(e) => setGroupName(e.target.value)} value={groupName} required id="groupname"></input>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}
