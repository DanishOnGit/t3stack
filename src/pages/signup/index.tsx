import Link from "next/link";
import { Button } from "~/components/Button";
import { Heading } from "~/components/Heading";
import { Input } from "~/components/Input";


const Signup=()=>{
    return <div className="border border-gray-300 px-14 py-10 max-w-xl min-h rounded-3xl pb-28">
        <div className="flex flex-col items-center justify-center">
            <div className="mb-8">
                <Heading title="Create your account"/>
            </div>
        <div className="flex flex-col gap-8 mb-10 w-full">
        <Input>
            <Input.InputLabel>Name</Input.InputLabel>
            <Input.InputBox/>
        </Input>
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
            <Button text="Create Account"/>
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