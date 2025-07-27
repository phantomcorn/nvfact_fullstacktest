import { useNavigate } from "react-router-dom"
import { useSendLogoutMutation } from "../../features/auth/authApiSlice"
import { useSelector } from "react-redux"
import { selectMyInfo } from "../../features/auth/authSlice"
import LanguageSelect from "../LanguageSelect/LanguageSelect"

export default function Navbar() {

    const navigate = useNavigate()
    const [sendLogout, logoutMutationProps] = useSendLogoutMutation()
    const myInfo = useSelector(selectMyInfo)

    async function handleLogout(e) {
        e.preventDefault()
        try {
            sendLogout().unwrap
            navigate("/")
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="bg-[#2ea44f] h-22 flex flex-row justify-between p-5"> 
            <div className="flex flex-row items-center gap-5">
                <div>Dashboard</div>
                <div>Manage Users</div>
            </div>
            <div className="flex flex-row items-center gap-5">
                <LanguageSelect/>
                <h1> Welcome back, {myInfo.name} </h1>
                <button className="warning-btn" onClick={handleLogout}> Sign out </button>
            </div>
        </div>
    )
}