import Link from "next/link";
import { Button } from "~/components/Button";
import { Heading } from "~/components/Heading";
import { Input } from "~/components/Input";


const Login=()=>{
    return <div className="border border-gray-300 px-14 py-10 max-w-xl rounded-3xl max-h-dvh mx-auto ">
        <div className="flex flex-col items-center justify-center">
            <div className="mb-8">
                <Heading title="Login"/>
            </div>
            <div className="mb-8 text-center">
            <p className="text-2xl font-medium">
                Welcome back to ECOMMERCE
            </p>
            <p className="text-base">
             The next gen business marketplace
            </p>
            </div>
        <div className="flex flex-col gap-8 mb-10 w-full">
        <Input>
            <Input.InputLabel>Email</Input.InputLabel>
            <Input.InputBox/>
        </Input>
        <Input>
            <Input.InputLabel>Password</Input.InputLabel>
            <Input.InputBox/>
        </Input>
        </div>
        <div className="w-full mb-12">
            <Button text="Login"/>
        </div>
        <div>
            <p className="flex gap-2 text-sm">
                Don’t have an Account? 
            <span className="font-semibold">
                <Link href={'/login'}>
                    SIGN UP
                </Link>
            </span>
            </p>
        </div>
        </div>
       
    </div>
}

export default Login