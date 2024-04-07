import { Button } from "~/components/Button"
import { Heading } from "~/components/Heading"


const VerifyEmail=()=>{
    const userData = JSON.parse(localStorage.getItem("user")) || {}

    const verifyMail=()=>{
        console.log("Verifyng,,,")
    }
    return  <div className="border border-gray-300 px-14 py-10 max-w-xl rounded-3xl max-h-dvh mx-auto ">
    <div className="flex flex-col items-center justify-center">
        <div className="mb-8">
            <Heading title="Verify your email"/>
        </div>
        <div className="mb-8 text-center">
        <p className="text-base">
         Enter the 8 digit code you have received on {userData?.email}
        </p>
        </div>
   
    <div className="w-full mb-12">
        <Button onClick={verifyMail} text="Verify"/>
    </div>
    </div>
   
</div>
}

export default VerifyEmail