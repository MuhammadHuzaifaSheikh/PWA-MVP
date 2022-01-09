import React from 'react'
import BottomNav from '../components/BottomNav/BottomNav'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../config/Firebase'
import { setDoc, doc } from "firebase/firestore";
import { db } from '../config/Firebase'
import { setUserId, setUserName, setEmailAddress, setFullName, setPregnancyDueDate, setUserTodoss, setBabyName, setBabyGender } from '../store/Slices/UserSlice'
import { signOut } from "firebase/auth";

export default function SettingScreen() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state) => state.user)
    const menu = [
        { title: "Settings", redirectTo: "/" },
        { title: "FAQ", redirectTo: "/" },
        { title: "Tell a freind", redirectTo: "/" },
        { title: "privacy policy", redirectTo: "/privacypolicy" },
        { title: "Terms and Condition", redirectTo: "/" }
    ]

    const handleSexChange = (e) => {

        const docRef = doc(db, "users", localStorage.getItem("userID"));
        const payload = {
            pregnancy_dueDate: user.pregnancy_dueDate,
            emailAddress: user.emailAddress,
            username: user.username,
            user_todos: user.user_todos,
            pregnancy_babyName: user.pregnancy_babyName,
            pregnancy_babyGender: e.target.value,
            fullName: user.fullName
        };

        setDoc(docRef, payload);
        dispatch(setBabyGender(e.target.value))

    }
    const handleNameChange = (e) => {

        dispatch(setBabyName(e.target.value))
        const docRef = doc(db, "users", localStorage.getItem("userID"));
        const payload = {
            pregnancy_dueDate: user.pregnancy_dueDate,
            emailAddress: user.emailAddress,
            username: user.username,
            user_todos: user.user_todos,
            pregnancy_babyName: user.pregnancy_babyName,
            pregnancy_babyGender: user.pregnancy_babyGender,
            fullName: user.fullName
        };

        setDoc(docRef, payload);
        dispatch(setBabyName(e.target.value))
    }
    const handleLogOut = () => {
        signOut(auth).then(() => {
            dispatch(setUserId(''));
            dispatch(setUserName(''));
            dispatch(setEmailAddress(''));
            dispatch(setPregnancyDueDate(''));
            dispatch(setUserTodoss([]));
            dispatch(setBabyName(''));
            dispatch(setBabyGender(''))
            dispatch(setFullName(''))
            localStorage.removeItem('userID');
            navigate('/')
        }).catch((error) => {
            // An error happened.
        });
    }

    return (
        <div >
            <div className='Profile'>
                <div>
                    <Link to="/">
                        <i className='fa fa-chevron-left right-arraw'></i>
                    </Link>
                </div>
                <div className='Profile-Image'>
                    <img src='https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png' />
                </div>
                <div className='Profile-username'>
                    {user.username}
                </div>
            </div>

            <div className='menu-setting'>
                <h4>Menu</h4>
            </div>
            <div>

                {menu.map((menuItem, index) => {
                    return (
                        <div key={index}>
                            <Link to={menuItem.redirectTo} >
                                <div className='setting-items'>
                                    <h3>{menuItem.title}</h3>
                                    <i className='fa fa-chevron-right'></i>
                                </div>
                            </Link>
                        </div>
                    )
                })}

            </div>

            <div>
                <div className='account'>
                    <h3>Pregnancy</h3>

                </div>
                <div className='setting-items'>
                    <h3>Baby's Sex:</h3>
                    <select value={user.pregnancy_babyGender ? user.pregnancy_babyGender : "Select"} onChange={handleSexChange} >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>

                </div>
                <div className='setting-items'>
                    <h3>Baby's name</h3>
                    <input type="text" placeholder='Type Here ...' value={user.pregnancy_babyName && user.pregnancy_babyName} onChange={handleNameChange} />

                </div>
                <div className='setting-items'>
                    <h3>Due Date</h3>
                    <span>{user.pregnancy_dueDate}</span>
                </div>

            </div>

            <div>
                <div className='account'>
                    <h3>Account</h3>
                </div>
                <div className='setting-items'>
                    <h3>Full name</h3>
                    <span>{user.fullName}</span>
                </div>
                <div className='setting-items'>
                    <h3>E-mail</h3>
                    <span>{user.emailAddress}</span>

                </div>

                <Link to="/">

                    <div className='setting-items'>
                        <h3>Payment Details</h3>
                        <i className='fa fa-chevron-right'></i>
                    </div>
                </Link>
                <Link to="/">
                    <div className='setting-items'>
                        <h3>Delete Account</h3>
                        <i className='fa fa-chevron-right'></i>
                    </div>
                </Link>
            </div>

            <div className='log-out-div' onClick={handleLogOut}>
                <h3>Logout</h3>
                <i className='fa fa-chevron-right'></i>

            </div>
            <BottomNav />

        </div >
    )
}
