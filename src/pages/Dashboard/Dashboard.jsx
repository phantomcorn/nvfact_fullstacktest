import { useSelector } from "react-redux"
import { useSendLogoutMutation } from "../../features/auth/authApiSlice.js"
import { useGetUserInfoQuery } from "../../features/user/userApiSlice.js"
import { useNavigate } from "react-router-dom"
import { selectMyInfo } from "../../features/auth/authSlice.js"
import { useCallback, useMemo, useState } from "react"
import Modal from "../../component/Modal/Modal.jsx"
import "./Dashboard.scss"
export default function Dashboard() {

    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false)
    const [showFilter, setShowFilter] = useState(false)
    const [selected, setSelected] = useState(null)
    const [query, setQuery] = useState("")
    const myInfo = useSelector(selectMyInfo)

    const { data, isLoading, isError } = useGetUserInfoQuery(undefined, {
        pollingInterval: 5 * 60 * 1000, //Retrieve information every 5 minutes
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    const [sendLogout, logoutMutationProps] = useSendLogoutMutation()

    async function handleLogout(e) {
        e.preventDefault()
        try {
            sendLogout().unwrap
            navigate("/")
        } catch (err) {
            console.log(err)
        }
    }

    const handleEditUser = useCallback((e,user) => {
        e.preventDefault()
        setSelected(user)
        setShowModal(true)
        
    },[])

    useEffect(() => {
        console.log(showModal)
    },[showModal])

    if (isError) return <div> Error </div>
    if (isLoading) return <div> Loading... </div>

    const filtered = useMemo(() => {

        const q = query.toLowerCase()
        if (!q) return data

        return data.filter(({name, email}) => (
            name.toLowerCase().includes(q) || email.toLowerCase().includes(q)
        ))

    },[data,query])

    return (
        <>
            <div className={`dashboard ${showModal? "blur" : ""}`}>
                <div>
                    <h1> Welcome back, {myInfo.name} </h1>
                    <button className="warning-btn" onClick={handleLogout}> Sign out </button>
                </div>
                

                <div className="user-table">
                    <input type="text" placeholder="Search"/>

                    <div className="table-heading">
                        <div> Status </div>
                        <div> Email </div>
                        <div> Name </div>
                        <div> Role </div>
                    </div>
                    <div className="users">
                    {filtered && filtered.map((user,idx) => (
                        <>
                            <div key={`user-${idx}`} className="select-user"> 
                                <div className={`isActive ${user.isActive ? "active" : "inactive"}`}>
                                    {user.isActive ? "Active" : "Inactive"}
                                </div>
                                <div>{user.email}</div>
                                <div>{user.name}</div>
                                <div>{user.role}</div>
                                <button className="edit-btn primary-btn" onClick={(e) => handleEditUser(e,user)}> Edit </button>
                            </div>
                            
                        </>
                    ))}
                    </div>
                </div>
                
            </div>
            {showModal && <Modal user={selected} closeModal={() => setShowModal(false)}/>}
        </>
    )
}