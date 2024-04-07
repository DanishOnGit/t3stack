import { useRouter } from "next/router"
import { Heading } from "~/components/Heading"
import { api } from "~/utils/api";

const Category=({name}:{name:string})=>{

    return <div>
        <label>
            <input type="checkbox" />
            {name}
        </label>
    </div>
}
const Categories=()=>{
    const data = api.category.getCategories.useQuery();
    const {mutate}= api.category.createCategory.useMutation()

    return <div className="border border-gray-300 px-14 py-10 max-w-xl rounded-3xl max-h-dvh mx-auto ">
    <div className="flex flex-col items-center justify-center">
        <div className="mb-8">
            <Heading title="Please mark your interests!"/>
        </div>
        <div className="mb-8 text-center">
        <p className="text-base">
            We will keep you notified.
        </p>
        </div>
    </div>
    <div className="flex flex-col gap-8 mb-10 w-full">
        <p onClick={()=>mutate({name:"danny"})} className="text-xl font-lg">My saved interests!</p>

    </div>
</div>
}

export default Categories