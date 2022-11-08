import React, { useState } from 'react'
import uuid from 'react-uuid'

type Props = {
    groups: {id: string, name: string}[]
    onSubmit: () => void
}

export const NewUser = ({groups, onSubmit}: Props) => {
    const [userName, setUserName] = useState('')
    const [userImage, setUserImage] = useState('')
    const [userGroup, setUserGroup] = useState(groups[0].name)

    const handleSubmit = () => {
        if (userName && userImage && userGroup) {
            const newUser = {
                "id": uuid(),
                "name": userName,
                "image": userImage,
                "groups": [userGroup]
            }
            sessionStorage.setItem(`user-${newUser.id}`, JSON.stringify(newUser))
            onSubmit()
        } else {
            alert("All fields are mandatory.")
        }
    }

    return (
        <div>
            <h2>Select a group for your new user*</h2>
            <select value={userGroup} onChange={(e) => setUserGroup(e.target.value)}>
                {groups.map((group) => (
                    <option id={`option-${group.id}`} value={group.name}>
                        {group.name}
                    </option>
                ))}
            </select>
            <h2>Please input your new user data</h2>
            <h4>Name*</h4>
            <input onChange={(e) => setUserName(e.target.value)} value={userName} required id="username"></input>
            <h4>Image*</h4>
            <input onChange={(e) => setUserImage(e.target.value)} value={userImage} required id="userimage"></input>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}
