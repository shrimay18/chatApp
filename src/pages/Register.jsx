import React from 'react';
import Add from "../img/addAvatar.svg";
import '../style.scss';
import {useState} from 'react';
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import {doc, setDoc} from 'firebase/firestore';
import {auth, storage} from '../firebase';
import {db} from '../firebase';
import {useNavigate} from 'react-router-dom';
import {Link} from 'react-router-dom';

import {
    ref,
    uploadBytesResumable,
    getDownloadURL,} from 'firebase/storage';

const Register = () => {
    const [err, setErr] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];
        try{
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const storageRef = ref(storage, displayName); 
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                (error)=>{
                    setErr(true);
                    console.log(error);
                
                },
                ()=>{
                    getDownloadURL(uploadTask.snapshot.ref).then( async(downloadURL)=>{
                        await updateProfile(res.user,{
                            displayName:displayName,
                            photoURL:downloadURL,
                        })
                        await setDoc(doc(db, 'users', res.user.uid),{
                            uid:res.user.uid,
                            displayName,
                            email,
                            photoURL:downloadURL,
                        });
                        await setDoc(doc(db,'userChats',res.user.uid),{
                        });
                        navigate('/');
                    });
                    
                }
            );    
        }
        catch(err){
            console.log(err);
            setErr(true);
        }
    }

    return (
        <div className='formContainer'>
            <div className='formWrapper'>
                <span className='logo'>VideoVerse Chat</span>
                <span className='title'>Register</span>
                <form onSubmit={handleSubmit}>
                    <input type='text' placeholder='First Name' />
                    <input type='email' placeholder='Email' />
                    <input type='password' placeholder='Password' />
                    <input style={{display:"none"}} type='file' id='file'/>

                    <label htmlFor='file'>
                        <img src={Add} />
                        <span>Profile Picture</span>
                        </label>
                    <button>Sign Up</button>
                    {err && <span style={{color:"red"}}>Something went wrong!</span>}
                </form>
                <p>Already have a account ? <Link to ="/login">Login</Link></p>
            </div>
            
        </div>
    );
};

export default Register;