import getSvgIcon from "./IconUtils"
import "./Icon.scss"
export default function Icon({variant, onClick, strokeColor = "black"}) {
    return (
        <div className="icon" onClick={onClick} >
            {getSvgIcon(variant, strokeColor)}
        </div>
    )
}