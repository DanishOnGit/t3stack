import { useRouter } from "next/router"
import { useState } from "react"
import OTPInput from "react-otp-input"
import { Button } from "~/components/Button"
import { Heading } from "~/components/Heading"


const VerifyEmail=()=>{
    // const userData = JSON.parse(localStorage.getItem("user") )|| {}
    const [otp, setOtp] = useState('');
    const router =  useRouter()

    const verifyMail=async()=>{
        if(otp==="12345678"){
            await router.push("/login")
        }
    }

    return  <div className="border border-gray-300 px-14 py-10 max-w-xl rounded-3xl max-h-dvh mx-auto ">
    <div className="flex flex-col items-center justify-center">
        <div className="mb-8">
            <Heading title="Verify your email"/>
        </div>
        <div className="mb-8 text-center">
        <p className="text-base">
         Enter the 8 digit code you have received on hello@op.co
        </p>
        </div>
        <span style={{marginRight:"auto"}}>Code</span>
        <div className="mb-16">
        <OTPInput
          value={otp}
          onChange={setOtp}
          numInputs={8}
          renderSeparator={<span style={{display:"inline-block",width:"13px"}}></span>}
          renderInput={(props) => <input {...props} />}
          inputStyle={{
            border:"1px solid #C1C1C1",
            borderRadius:"6px",
            height:"48px",
            width:"46px"
          }}
        />
        </div>
   
    <div className="w-full mb-12">
        <Button onClick={verifyMail} text="Verify"/>
    </div>
    </div>
   
</div>
}

export default VerifyEmail