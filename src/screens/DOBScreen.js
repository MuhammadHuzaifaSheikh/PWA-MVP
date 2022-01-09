import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { setDoc, doc } from "firebase/firestore";
import Dropdown from '../components/Dropdown/Dropdown';
import { setPregnancyDueDate } from '../store/Slices/UserSlice'
import { db } from '../config/Firebase'
import '../index.css'

function DOBScreen() {
    const navigate = useNavigate()
    const date = useSelector(state => state.date);
    const user = useSelector(state => state.user);
    let [loading, setLoading] = React.useState(false)
    const dispatch = useDispatch()

    let dd = [];
    for (let i = 1; i <= 31; i++) {
        dd.push(i)
    }
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let year = [];
    for (let i = 0; i <= 3; i++) {
        year.push(new Date().getFullYear() + i);
    }

    const handleSubmit = async () => {
        setLoading(true)
        let pregnancy_dueDate = `${date.dd} ${date.mm} ${date.yyyy}`;
        pregnancy_dueDate = new Date(pregnancy_dueDate).getTime()
        const docRef = doc(db, "users", localStorage.getItem("userID"));
        const payload = {
            pregnancy_dueDate,
            emailAddress: user.emailAddress,
            username: user.username,
            userId: user.userId
        };
        setDoc(docRef, payload);
        dispatch(setPregnancyDueDate(pregnancy_dueDate))
        navigate("/")
        setLoading(false)
    }

    return (
        <div >

            {/* Logo  */}

            <div className=''>

                {/* length question  */}

                <div className='align'>
                    <p>1 of 1</p>
                </div>



                {/* Question  */}

                <div className='question'>
                    <h3>When is the expected due date of your child ?</h3>
                </div>

                {/* dropdown  */}

                <Dropdown title={date.dd ? date.dd : 'dd'} type='dd' dropdownData={dd} />
                <Dropdown title={date.mm ? date.mm : 'mm'} type='mm' dropdownData={month} />
                <Dropdown title={date.yyyy ? date.yyyy : 'yyyy'} type='yyyy' dropdownData={year} />

                {/* caption */}

                <div>
                    <p className='underline parag'>
                        I don't know my calculate due date
                    </p>
                </div>

                {/* continue button  */}


                <button className='Continue-but' onClick={handleSubmit}>
                    {loading ?
                        <>
                            <span className="spinner"></span>
                        </> : 'Continue'
                    }
                </button>
            </div>
        </div>
    )
}

export default DOBScreen;