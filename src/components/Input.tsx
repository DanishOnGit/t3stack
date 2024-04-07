
const InputLabel=({children}:{children:React.ReactNode})=>{
    return <span className="text-xs">
        {children}
    </span>
}
const InputBox=({onChange,name}:{onChange:()=>void,name:string})=>{
    return <input name={name} onChange={onChange} placeholder="Enter" className="w-full border border-gray-300 rounded-md h-10 p-2" type="text"/>
}

type InputProps={
    children:React.ReactNode,
}

const Input=({children}:InputProps)=>{

    return  <div className="flex-col flex justify-center items-start gap-2">
    {children}
</div>
}

Input.InputLabel = InputLabel;
Input.InputBox = InputBox;

export {Input}