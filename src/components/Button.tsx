
type ButtonProps={
    text:string
}

export const Button=({text}:ButtonProps)=>{

    return <button className="w-full bg-black border rounded-md text-white p-4 uppercase">{text}</button>
}