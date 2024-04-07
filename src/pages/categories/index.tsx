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
    selectedCategories:T[],
    selectedItems:T[],
    refetchGetUserCategories:()=>void
}
const Category=({items,updateSelectedCategories,selectedCategories,selectedItems,refetchGetUserCategories}:CategoryProps)=>{
    const {mutate} = api.userCategory.addCategory.useMutation({
        onSuccess: refetchGetUserCategories()
    });
    const {mutate:removeMutation}= api.userCategory.removeCategory.useMutation({
        onSuccess: refetchGetUserCategories()
    })

    const updateUserCategories=(categoryId:number)=>{
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const {id} = JSON.parse(localStorage.getItem("user") || "") || {}
        try {
            console.log({selectedCategories,categoryId})
           const isExist= selectedCategories.find((num:number)=>num===categoryId);
           if(isExist){
              removeMutation({userId:id,categoryId});
            
           }else{
               mutate({userId:id,categoryId});
            }
            updateSelectedCategories(categoryId)
            
        } catch (error) {
            console.error(error)
        }
    }

    const isCategorySelected = (categoryId:number)=>{
        return selectedCategories.find((id:number)=>id===categoryId)?true:false
    } 

    const isIdChecked=(id:number)=>{
        if(!selectedItems?.length) return false;
        const item = selectedItems.find((item:any)=>item.categoryId===id)
        return item ?true:false
    }

    // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
    if(!items || !items.length) return null

    return items.map((item:any )=><div key={item.id} className="flex gap-4 font-md">
         {/* @ts-ignore */}
        <label onClick={(e)=>updateUserCategories(item.id)} key={item.id} for={item.id}>
            <input className="mr-4 accent-black w-4 h-4 text-black bg-black border-black rounded focus:ring-black focus:ring-2 dark:bg-black dark:border-black dark:focus:ring-black dark:ring-offset-gray-800
" type="checkbox" checked={isCategorySelected(item.id) || isIdChecked(item.id)} id={item.id} />
            {item.name}
        </label>
    </div>)
}


const Categories=()=>{
    const {mutate}= api.category.createCategory.useMutation()
    const [itemOffset, setItemOffset] = useState(0);
    const [selectedCategories,setSelectedCategories]=useState([])
    const [userData,setUserData]=useState()
    const {data={},refetch,isLoading:isAllCategoriesLoading} = api.category.getCategories.useQuery({offset:itemOffset},{enabled:false});
    // @ts-ignore
    const {data:dataForGetUserCategories,refetch:refetchGetUserCategories,isLoading,isSuccess,isFetching} = api.userCategory.getUserCategories.useQuery({userId:userData?.id},{enabled:false})
    const router = useRouter()
// @ts-ignore
    const pageCount = Math.ceil(data.count / itemsPerPage);
  
    const updateSelectedCategories=(categoryId:number)=>{
        const doesExist= selectedCategories.find(cat=>cat===categoryId)
        if(doesExist){
            console.log("removing...")
            const filtreddata= selectedCategories.filter(id=>id!==categoryId)
            setSelectedCategories(filtreddata)
        }else{
            // @ts-ignore
            setSelectedCategories(prev=>([...prev,categoryId]))
        }
    }
// @ts-ignore
    const handlePageClick = (event) => {
        // @ts-ignore
      const newOffset = (event.selected * itemsPerPage) % data.count;
      setItemOffset(newOffset);
    };

    useEffect(()=>{
        refetch()
    },[itemOffset])

    useEffect(()=>{
        const isAuthenticated= localStorage.getItem("authToken");
        if(!isAuthenticated) router.push("/login");
        
        const userData = JSON.parse(localStorage.getItem("user") || "") || {};
        setUserData(userData)
    },[])

    useEffect(()=>{
        // @ts-ignore
        if(userData?.id){
            refetchGetUserCategories()
        }
        // @ts-ignore
    },[userData?.id])

    // useEffect(()=>{
    //     console.log("isfetched",dataForGetUserCategories)
    //     setSelectedCategories(dataForGetUserCategories?.map(itm=>itm.categoryId))
    // },[JSON.stringify(dataForGetUserCategories)])


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
        <p onClick={()=>mutate({name:"danny"})} className="text-xl font-lg font-semibold">My saved interests!</p>
      {isLoading || isAllCategoriesLoading?<Spinner/>:  <Category refetchGetUserCategories={refetchGetUserCategories} selectedItems={dataForGetUserCategories} items={data?.data} updateSelectedCategories={updateSelectedCategories} selectedCategories={selectedCategories}/>}
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