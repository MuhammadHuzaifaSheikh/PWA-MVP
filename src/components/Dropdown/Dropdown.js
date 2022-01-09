import React from 'react'
import { useDispatch } from 'react-redux'
import KeyboardArrowDownSharpIcon from '@mui/icons-material/KeyboardArrowDownSharp';
import { setDate, setMonth, setYear } from '../../store/Slices/DateSlice'
import '../../index.css'

function Dropdown({ type, title, dropdownData }) {
    const dispatch = useDispatch()

    let [isOpen, setIsOpen] = React.useState(false)
    const handleToggle = () => {
        setIsOpen((isOpen) => !isOpen)
    }

    const handleDateChange = (payload) => {

        if (type === 'dd') {
            dispatch(setDate(payload))
        }
        if (type === 'mm') {
            dispatch(setMonth(payload))
        }
        if (type === 'yyyy') {
            dispatch(setYear(payload))
        }
        setIsOpen((isOpen) => !isOpen)
    }
    return (
        <>
            <div className='dropdown-div' onClick={handleToggle}>
                <div>
                    <p>{title}</p>
                </div>
                <div>
                    <KeyboardArrowDownSharpIcon />
                </div>
            </div>
            {
                isOpen &&
                <div className="dropdown-content">
                    <ul className="dropdown-contet-items">
                        {dropdownData.map((date, index) => (
                            < li key={index} className="dropdown-contet-item" onClick={() => { handleDateChange(date) }}  > {date}</li>
                        ))}
                    </ul>
                </div>
            }
        </>
    )

}

export default Dropdown;