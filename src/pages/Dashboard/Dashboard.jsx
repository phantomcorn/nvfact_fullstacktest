import { useSelector } from "react-redux"
import { useSendLogoutMutation } from "../../features/auth/authApiSlice.js"
import { useGetUserInfoQuery } from "../../features/user/userApiSlice.js"
import { useNavigate } from "react-router-dom"
import { selectMyInfo } from "../../features/auth/authSlice.js"
import { useCallback, useState } from "react"
import Modal from "../../component/Modal/Modal.jsx"
import Icon from "../../component/Icon/Icon.jsx"
import "./Dashboard.scss"
export default function Dashboard() {

    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false)
    const [showFilter, setShowFilter] = useState(false)
    const [selected, setSelected] = useState(null)
    const [query, setQuery] = useState({
        query: "",
        status: null,
        role: null
    })
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

    const handleCreate = (e) => {
        e.preventDefault()
        setSelected(null)
        setShowModal(true)
    }

    const handleQueryChange = (e, key) => {
        let val = e.target.value === "" ? null : e.target.value

        setQuery((prev) => (
            {...prev, [key] : val}
        ))
    }

    if (isError) return <div> Error </div>
    if (isLoading) return <div> Loading... </div>

    const filtered = data.filter(({name, email, role, isActive}) => {
        let res = true
        if (query.query) {
            const q = query.query.toLocaleLowerCase()
            res = res && (name.toLowerCase().startsWith(q) || email.toLowerCase().startsWith(q))
        }
        if (query.role) res = res && role === query.role

        if (query.status) {
            const toBool = query.status === "true" ? true : false
            res = res && isActive === toBool
        }
        return res
    })

    return (
        <>
            <div className={`dashboard flex flex-col gap-10 ${showModal? "blur" : ""}`}>
                <div>
                    <h1> Welcome back, {myInfo.name} </h1>
                    <div className="flex justify-between">
                         <button className="warning-btn" onClick={handleLogout}> Sign out </button>
                        <button className="secondary-btn flex items-center justify-center gap-2" onClick={handleCreate}>
                            <Icon variant={"plus"} strokeColor="white"/> New User
                        </button>
                    </div>
                </div>

                <div className="table-container shadow"> 
                
                    {/* Search bar */}
                    <div className="flex filters">
                        <input type="text" placeholder="Search" onChange={(e) => handleQueryChange(e, "query")}/>
                        <Icon variant="chevron-down" strokeColor="white" onClick={() => setShowFilter((prev) => !prev)}/>
                    </div>

                    {/* Filter bar */}
                    {showFilter && 
                        <div className="filter-options">


                            <div className="flex">
                                <h6>Role:</h6>
                                <select onChange={(e) => handleQueryChange(e, "role")}>
                                    <option value={""}>-</option>
                                    <option value={"ADMIN"}>ADMIN</option>
                                    <option value={"USER"}>USER</option>
                                </select>
                            </div>

                            <div className="flex"> 
                                <h6>STATUS:</h6>
                                <select onChange={(e) => handleQueryChange(e, "status")}>
                                    <option value={""}>-</option>
                                    <option value={"true"}>ACTIVE</option>
                                    <option value={"false"}>INACTIVE</option>
                                </select>
                            </div>

                        </div>
                    }
                    <table className="min-w-full table-auto border-separate border-spacing-y-2">    
                        <thead className="bg-green-100">
                            <tr>
                                <th className="px-4 py-2 text-left">Status</th>
                                <th className="px-4 py-2 text-left">Email</th>
                                <th className="px-4 py-2 text-left">Name</th>
                                <th className="px-4 py-2 text-left">Role</th>
                            </tr>
                        </thead>
                            
                        <tbody>
                        {filtered && filtered.map((u,idx) => (
                            <tr key={`user-${idx}`} className="select-user cursor-pointer"> 
                                <td className="px-4 py-2">
                                    <span
                                        className={`inline-block px-2 rounded ${
                                            u.isActive ? 'bg-green-200' : 'bg-red-200'
                                        }`}
                                    >
                                        {u.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td className="px-4 py-2">{u.email}</td>
                                <td className="px-4 py-2">{u.name}</td>
                                <td className="px-4 py-2">{u.role}</td>
                                <button className="edit-btn primary-btn" onClick={(e) => handleEditUser(e,u)}> 
                                    <Icon variant={"edit"} strokeColor="white"/>
                                </button>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                
            </div>
            {showModal && <Modal user={selected} closeModal={() => setShowModal(false)}/>}
        </>
    )
}