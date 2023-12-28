'use client'
import {Button, Input} from '@material-tailwind/react'
import {useState} from 'react';


const CreateUser = () => {
    const [id,setId] = useState('');
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    
    const handleSubmit = async (e)=>{
        e.preventDefault();

        if(!id || !name || !email || !password){
            alert('Please fill all the input fields');
            return;
        }
        try{
            const response = await fetch('/api/users',{
                method:"POST",
                headers: { 
                    "Content-Type":'application/json'
                },
                body: JSON.stringify({id,name,email,password})
            })
            if(response.ok){
                alert('User Successfully Created')
            }else{ 
                alert('Something went wrong :(')
                return;
            }
        }catch(error){
            alert(error)
            return
        }
    }

    return (
    <div>
        <div>
            <form onSubmit={handleSubmit}>
                <Input label="ID" placeholder="ID" type="text" value={id} onChange={e=>setId(e.target.value)}/>
                <Input label="Name" placeholder="Name" type="text" value={name} onChange={e=>setName(e.target.value)}/>
                <Input label="Email" placeholder="Email"  type="email" value={email} onChange={e=>setEmail(e.target.value)}/>
                <Input label="Password" placeholder="Password"  type="password" value={password} onChange={e=>setPassword(e.target.value)}/>

                <Button className='mt-2' type='submit'>Create</Button>
            </form>
        </div>
    </div>
    )
}

export default CreateUser