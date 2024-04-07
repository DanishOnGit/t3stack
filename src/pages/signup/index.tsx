import Link from "next/link";
import { useState } from "react";
import { Button } from "~/components/Button";
import { Heading } from "~/components/Heading";
import { Input } from "~/components/Input";
import { api } from "~/utils/api";


const Signup=()=>{
    const [userDetails,setUserDetails]= useState({name:"",email:"",password:""});
    const {mutate}=api.user.create.useMutation()

    const onChange=(e)=>{
        setUserDetails((prev)=>{
            return {...prev,[e.target.name]:e.target.value}
        })
    }

    const createUser=async()=>{
        try {
           const data = await mutate(userDetails);
           console.log({data})
        } catch (error) {
            console.error(error)
        }
    }
    return <div className="border border-gray-300 px-14 py-10 max-w-xl rounded-3xl max-h-dvh mx-auto ">
        <div className="flex flex-col items-center justify-center">
            <div className="mb-8">
                <Heading title="Create your account"/>
            </div>
        <div className="flex flex-col gap-8 mb-10 w-full">
        <Input>
            <Input.InputLabel>Name</Input.InputLabel>
            <Input.InputBox name="name" onChange={onChange}/>
        </Input>
        <Input>
            <Input.InputLabel>Email</Input.InputLabel>
            <Input.InputBox name="email" onChange={onChange}/>
        </Input>
        <Input>
            <Input.InputLabel>Password</Input.InputLabel>
            <Input.InputBox name="password" onChange={onChange}/>
        </Input>
        </div>
        <div className="w-full mb-12">
            <Button onClick={createUser} text="Create Account"/>
        </div>
        <div>
            <p className="flex gap-2 text-sm">
                Have an Account?
            <span className="font-semibold">
                <Link href={'/login'}>
                    LOGIN
                </Link>
            </span>
            </p>
        </div>
        </div>
       
    </div>
}

export default Signup