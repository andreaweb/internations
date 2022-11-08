import React, { useEffect, useState } from 'react'
import { hot } from 'react-hot-loader/root'
import { AiFillDelete } from 'react-icons/ai'
import { users, groups } from './common'
import { NewUser } from './components/NewUser'
import { NewGroup } from './components/NewGroup'
import './style.css'

export const App = hot(_App)
export function _App(): JSX.Element | null {
    const [allUsers, setAllUsers] = useState(users)
    const [allGroups, setAllGroups] = useState(groups)
    const [isNewUserVisible, setIsNewUserVisible] = useState(false)
    const [isNewGroupVisible, setIsNewGroupVisible] = useState(false)

    const getLocalUsers = () => {
        const localUsers = Object.entries(sessionStorage).filter(([key]) => key.startsWith('user-')).map((i) => JSON.parse(i[1]))
        setAllUsers([...users,...localUsers])
    }

    const getLocalGroups = () => {
        const localGroups = Object.entries(sessionStorage).filter(([key]) => key.startsWith('group-')).map((i) => JSON.parse(i[1]))
        setAllGroups([...groups,...localGroups])
    }

    const onDelete = (id: string) => {
        alert("This user will be deleted.")
        sessionStorage.removeItem(`user-${id}`)
        getLocalUsers()
    }

    const handleNewUser = () => {
        setIsNewUserVisible(false)
        getLocalUsers()
    }

    const handleNewGroup = () => {
        setIsNewGroupVisible(false)
        getLocalGroups()
    }

    useEffect(() => {
        getLocalUsers()
        getLocalGroups()
    }, [])
    
    return (
        <div className="container">
            <div className="users">
                {allUsers.map(user => (
                    <div key={user.id} className="user">
                        <img src={user.image} alt="" width={200}/>
                        <h3>{user.name}</h3>
                        <p>Groups: {user.groups.join(', ')}</p>
                        {user.id.length > 1 //crude way to check if user is "deletable". in a real app would use e.g. "isDeletable: boolean"
                            ? <div className="delete" onClick={() => onDelete(user.id)}><AiFillDelete color="red" /></div>
                            : <span className="disclaimer">This user cannot be removed.</span>
                        }
                    </div>
                ))}
            </div>
            <div className="buttons">
                <button onClick={() => setIsNewUserVisible(true)}>New User</button>
                <button onClick={() => setIsNewGroupVisible(true)}>New Group</button>
            </div>
            {isNewUserVisible ? <NewUser onSubmit={handleNewUser} groups={allGroups} /> : null}
            {isNewGroupVisible ? <NewGroup onSubmit={handleNewGroup}/> : null}
        </div>
    )
}
