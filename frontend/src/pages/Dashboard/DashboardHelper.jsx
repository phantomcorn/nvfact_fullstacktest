export function computeUserToAdminRatioSeverity(ratio) {
    if (ratio < 10) { //1 admin manages <= 10 user
        return <span className="inline-block px-2 rounded bg-green-200">Low</span>
    } else if (ratio < 20) {//1 admin manages between 10 to 20 user
        return <span className="inline-block px-2 rounded bg-yellow-200">Medium</span>
    } else { //1 admin manages >= 20 user
        return <span className="inline-block px-2 rounded bg-red-200">High</span>
    }
}