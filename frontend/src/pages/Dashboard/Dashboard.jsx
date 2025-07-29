import { useTranslation } from "react-i18next";
import PieChart from "../../component/PieChart/PieChart";
import { useGetUserInfoQuery } from "../../features/user/userApiSlice";
import { useState, useMemo} from "react";
import { computeUserToAdminRatioSeverity } from "./DashboardHelper.jsx";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
export default function Dashboard() {

    const navigate = useNavigate()
    const {t, i18n} = useTranslation("dashboard")
    const [activeRatio, setActiveRatio] = useState([])
    const [adminCount, setAdminCount] = useState(-1)
    const [userCount, setUserCount] = useState(-1)
    const [userAdminRatio, setUserAdminRatio] = useState(-1)

    const { data, error, isLoading, isError } = useGetUserInfoQuery(undefined, {
            pollingInterval: 5 * 60 * 1000, //Retrieve information every 5 minutes
            refetchOnFocus: true,
            refetchOnMountOrArgChange: true
    })

    useMemo(() => {

        let admin_count = 0;
        let user_count = 0;

        if (data) {
            let result = data.reduce((acc, user) => {
                if (user.isActive) {
                    acc[0].value += 1
                } else {
                    acc[1].value += 1
                }

                if (user.role === "ADMIN") admin_count += 1
                else user_count += 1

                return acc
            } ,[{label: "Active", value: 0},{label: "Inactive", value: 0}])

            
            setAdminCount(admin_count)
            setUserCount(user_count)
            setUserAdminRatio((user_count/admin_count).toFixed(1))
            setActiveRatio(result)
        }
    }, [data])

    const stats = [
        {
            label: "Total account",
            value: adminCount + userCount
        },
        {
            label: "Admin count",
            value: adminCount
        },
        {
            label: "User count",
            value: userCount
        },
        {
            label: `Admin/User`,
            value: userAdminRatio
        },

    ]

    if (isError) {
        return (
            <div className="flex flex-row gap-5 items-center justify-center">
                <h2>{error.data.message}</h2>
                <button className="secondary-btn" onClick={() => navigate("/")}>Back to Login</button>
            </div>
        )
    }
    
    
    return (
        <div className="flex flex-row justify-center gap-5 p-10">
            <div className="bg-[#E8F4F7] p-5 rounded-4xl grid grid-rows-4 grid-cols-3 gap-1 min-w-50">

                {stats.map(({label,value}, idx) => (
                        label === "Admin/User" ? (
                            <div key={`row-${idx+1}`} className="flex flex-col col-span-3">
                                <div className="flex flex-row justify-between">
                                    <h2 className={`col-span-2`}>{label}:</h2>
                                    <span className={`col-3 justify-self-end`}>{value}</span>
                                </div>
                                <div className="flex flex-row justify-between">
                                    <h2 className={`col-span-2`}>Severity:</h2>
                                    <span className={`col-3 justify-self-end`}>{computeUserToAdminRatioSeverity(value)}</span>
                                </div>
                            </div>

                        ) : (
                            <Fragment key={`row-${idx+1}`}>
                                <h2 className={`col-span-2`}>{label}:</h2>
                                <span className={`col-3 justify-self-end`}>{value}</span>
                            </Fragment>
                        )
                    
                ))}
            </div>

            <div className="bg-[#E8F4F7] p-5 rounded-4xl">
                <PieChart data={activeRatio} colors={["var(--color-green-200)", "var(--color-red-200)"]}/>
            </div>
            <div className="bg-[#E8F4F7] p-5 rounded-4xl gap-3 w-100">
                <h2>Recent changes</h2>
                <div className="text-center mt-20">Coming soon...</div>
            </div>
        </div>
    )
}