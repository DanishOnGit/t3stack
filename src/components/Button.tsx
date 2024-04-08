
type ButtonProps={
    text:string,
    onClick:()=>void
}

export const Button=({text,onClick}:ButtonProps)=>{

    return <button onClick={onClick} className="w-full bg-black border rounded-md text-white p-4 uppercase">{text}</button>
}