import { useGetUserInfoQuery } from "../../features/user/userApiSlice.js"
import { useCallback, useState } from "react"
import Modal from "../../component/Modal/Modal.jsx"
import Icon from "../../component/Icon/Icon.jsx"
import "./ManageUsersPage.scss"
import { useTranslation } from "react-i18next"
export default function ManageUsersPage() {

    const {t, i18n} = useTranslation("manage_users_page")
    const [showModal, setShowModal] = useState(false)
    const [showFilter, setShowFilter] = useState(false)
    const [selected, setSelected] = useState(null)
    const [query, setQuery] = useState({
        query: "",
        status: null,
        role: null
    })
    const { data, isLoading, isError } = useGetUserInfoQuery(undefined, {
        pollingInterval: 5 * 60 * 1000, //Retrieve information every 5 minutes
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

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
            <div className={`manage-users-page flex flex-col gap-6 ${showModal? "blur" : ""}`}>
                <div className="flex flex-row gap-5 items-center justify-end">      
                        <button className="secondary-btn flex items-center justify-center gap-2" onClick={handleCreate}>
                            <Icon variant={"plus"} strokeColor="white"/> {t("New User")}
                        </button>
                </div>

                <div className="shadow flex flex-col gap-5 rounded-3xl p-5 bg-[#2ea44f]"> 
                
                    {/* Search bar */}
                    <div className="flex justify-between items-center">
                        <input type="text" placeholder="Search" onChange={(e) => handleQueryChange(e, "query")}/>
                        <Icon variant="chevron-down" strokeColor="white" onClick={() => setShowFilter((prev) => !prev)}/>
                    </div>

                    {/* Filter bar */}
                    {showFilter && 
                        <div className="filter-options">


                            <div className="flex">
                                <h6>{t("Role")}:</h6>
                                <select onChange={(e) => handleQueryChange(e, "role")}>
                                    <option value={""}>-</option>
                                    <option value={"ADMIN"}>{t("ADMIN")}</option>
                                    <option value={"USER"}>{t("USER")}</option>
                                </select>
                            </div>

                            <div className="flex"> 
                                <h6>{t("Status")}:</h6>
                                <select onChange={(e) => handleQueryChange(e, "status")}>
                                    <option value={""}>-</option>
                                    <option value={"true"}>{t("ACTIVE")}</option>
                                    <option value={"false"}>{t("INACTIVE")}</option>
                                </select>
                            </div>

                        </div>
                    }
                    <table className="min-w-full table-auto border-collapse">    
                        <thead className="bg-green-100">
                            <tr>
                                <th className="px-4 py-2 text-left">{t("Status")}</th>
                                <th className="px-4 py-2 text-left">{t("Email")}</th>
                                <th className="px-4 py-2 text-left">{t("Name")}</th>
                                <th className="px-4 py-2 text-left">{t("Role")}</th>
                            </tr>
                        </thead>
                            
                        <tbody>
                        {filtered && filtered.map((u,idx) => (
                            <tr 
                                key={`user-${idx}`} 
                                className="select-user cursor-pointer" 
                                onClick={(e) => handleEditUser(e,u)}
                            > 
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