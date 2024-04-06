
type HeadingProps = {
    title:string
}
export const Heading=({title}:HeadingProps)=>{

    return <div>
        <h1 className="bold text-black text-3xl font-semibold">{title}</h1>
    </div>
}