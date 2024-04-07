import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Heading } from "~/components/Heading"
import { api } from "~/utils/api";
const itemsPerPage=6

type CategoryProps={
    items:[];
    updatese
}
const Category=({items,updateSelectedCategories}:{items:[],updateSelectedCategories:()=>void})=>{
    const {mutate} = api.userCategory.addCategory.useMutation();

    const addToUserCategories=async(categoryId)=>{
        const {id} = JSON.parse(localStorage.getItem("user")) || {}
        try {
            const res = await mutate({userId:id,categoryId})
        } catch (error) {
            console.error(error)
        }
    }

    if(!items || !items.length) return null
    return items.map(item=><div>
        <label onClick={(e)=>addToUserCategories(item.id)} key={item.id}>
            <input type="checkbox" />
            {item.name}
        </label>
    </div>)
}
const Categories=()=>{
    const {mutate}= api.category.createCategory.useMutation()
    const [itemOffset, setItemOffset] = useState(0);
    const [selectedCategories,setSelectedCategories]=useState([])
    const {data={},refetch} = api.category.getCategories.useQuery({offset:itemOffset},{enabled:false});
    console.log({dataaaa:data})

    const endOffset = itemOffset + itemsPerPage;
    const pageCount = Math.ceil(data.count / itemsPerPage);
  
    const updateSelectedCategories=(categoryId)=>{
        const doesExist= selectedCategories.find(cat=>cat===categoryId)
        if(doesExist){
            setSelectedCategories((prev)=>{
                return prev.filter(id=>id!==categoryId)
            })
        }else{
            setSelectedCategories(prev=>([...prev,categoryId]))
        }
    }

    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % data.count;
      setItemOffset(newOffset);
    };

    useEffect(()=>{
        refetch()
    },[itemOffset])

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
        <Category items={data.data} updateSelectedCategories={updateSelectedCategories}/>
        <ReactPaginate
         breakLabel="..."
         nextLabel=">"
         onPageChange={handlePageClick}
         pageRangeDisplayed={6}
         pageCount={pageCount}
         previousLabel="<"
         renderOnZeroPageCount={null}
        />
    </div>
</div>
}

export default Categories