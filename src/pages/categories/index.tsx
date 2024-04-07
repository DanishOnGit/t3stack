import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Heading } from "~/components/Heading"
import { Spinner } from "~/components/Spinner";
import { api } from "~/utils/api";
const itemsPerPage=6

type CategoryProps<T>={
    items:T[],
    updateSelectedCategories:()=>void,
    selectedCategories:T[]
}
const Category=({items,updateSelectedCategories,selectedCategories}:CategoryProps)=>{
    const {mutate} = api.userCategory.updateCategory.useMutation();

    const addToUserCategories=async(categoryId:number)=>{
        const {id} = JSON.parse(localStorage.getItem("user")) || {}
        try {
            const res = mutate({userId:id,categoryId});
            updateSelectedCategories(categoryId)
        } catch (error) {
            console.error(error)
        }
    }

    const isCategorySelected = (categoryId:number)=>{
        return selectedCategories.find(id=>id===categoryId)?true:false
    } 

    if(!items || !items.length) return null

    return items.map(item=><div>
        <label onClick={(e)=>addToUserCategories(item.id)} key={item.id} for={item.id}>
            <input className="w-4 h-4 text-blue-600 bg-black border-black rounded focus:ring-blue-500 focus:ring-2 dark:bg-black dark:border-black dark:focus:ring-blue-600 dark:ring-offset-gray-800
" type="checkbox" checked={isCategorySelected(item.id)} id={item.id} />
            {item.name}
        </label>
    </div>)
}


const Categories=()=>{
    const {mutate}= api.category.createCategory.useMutation()
    const [itemOffset, setItemOffset] = useState(0);
    const [selectedCategories,setSelectedCategories]=useState([])
    const {data={},refetch} = api.category.getCategories.useQuery({offset:itemOffset},{enabled:false});
    const [isLoading,setIsLoading]=useState(data?.data?false:true)
    const [activePage,setActivePage]=useState(1)
    const router = useRouter()
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
      setActivePage(event.selected)
      setItemOffset(newOffset);
    };

    const getUserSelectedCategories=()=>{
        try {
            setIsLoading(true);

        } catch (error) {
            
        }finally{
            setIsLoading(false)
        }
    }

    useEffect(()=>{
        try{
            setIsLoading(true)
            refetch()
            getUserSelectedCategories()
        }catch(err){
            console.log(err)
        }finally{
            setIsLoading(false)
        }
    },[itemOffset])

    useEffect(()=>{
        const isAuthenticated= localStorage.getItem("authToken");
        if(!isAuthenticated) router.push("/login")
    },[])

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
      {isLoading?<Spinner/>:  <Category items={data?.data} updateSelectedCategories={updateSelectedCategories} selectedCategories={selectedCategories}/>}
      <div className="parent">
        <ReactPaginate
         breakLabel="..."
         nextLabel=">"
         onPageChange={handlePageClick}
         pageRangeDisplayed={6}
         pageCount={pageCount}
         previousLabel="<"
         renderOnZeroPageCount={null}
         pageClassName="pageNumber"
        />
      </div>
    </div>
</div>
}

export default Categories