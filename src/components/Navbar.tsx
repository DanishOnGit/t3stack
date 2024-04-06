import { CartIcon } from "./CartIcon"
import { LeftArrow } from "./LeftArrow"
import { RightArrow } from "./RightArrow"
import { SearchIcon } from "./SearchIcon"


export const Navbar=()=>{

    return <nav className="mb-10">
        <div  className="px-10 py-3 pb-5">
        <div className="grid mb-2">
            <ul className="justify-self-end text-xs flex gap-5">
                <li>Help</li>
                <li>Orders & Returns</li>
                <li>Hi, John</li>
            </ul>
        </div>
        <div className="flex justify-between items-center">
            <strong className="text-3xl">ECOMMERCE</strong>
            <div>
            <ul className="text-xs flex gap-5 font-bold relative top-[6px]">
                <li>Categories</li>
                <li>Sale</li>
                <li>Clearance</li>
                <li>New stock</li>
                <li>Trending</li>
            </ul>
            </div>
            <div className="flex gap-8 items-center">
                <SearchIcon/>
                <CartIcon/>
            </div>
        </div>
        </div>
        <div className="flex justify-center bg-[#F4F4F4] py-2">
            <div className="text-center  flex justify-between items-center gap-5">
                <LeftArrow/>
                <p className="font-medium text-sm">
                Get 10% off on business sign up
                    </p>
                    <RightArrow/>
            </div>
            </div>   
    </nav>
}