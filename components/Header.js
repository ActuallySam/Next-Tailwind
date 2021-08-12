import Image from "next/image";
import { SearchIcon, MenuIcon, GlobeAltIcon, UsersIcon, UserCircleIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { DateRangePicker } from "react-date-range";
import 'react-date-range/dist/styles.css';  //main style file
import 'react-date-range/dist/theme/default.css';   //theme css file

function Header() {

    //To define the search input and hold its value as *blank* when refreshed
    const [searchInput, setSearchInput] = useState("");

    //To define startDate and endDate as different dates for the date selection process
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    //For Selecting the range of the dates
    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: 'selection'
    };

    //showing the startDate and endDate range on the calendar
    const handleSelect = (ranges) => {
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate);
    };

    return (
        <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-5 md:px-10">

            {/* left */}
            <div className='relative flex items-center h-10 cursor-pointer my-auto md:'>
                <Image 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/2560px-Airbnb_Logo_B%C3%A9lo.svg.png" 
                    layout="fill"
                    objectFit="contain"
                    onjectPosition="left" />
            </div>


            {/* middle */}
            <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm">
                <input 
                    value={searchInput} 
                    onChange={(event) => {
                        setSearchInput(event.target.value)
                    }}
                    type="text" 
                    placeholder="Start your search" 
                    className="flex-grow pl-5 bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400" />

                <SearchIcon className="hidden md:inline-flex h-8 bg-red-300 text-white rounded-full p-2 cursor-pointer md:mx-2" />
            </div>


            {/* right */}
            <div className="flex items-center space-x-4 justify-end text-gray-500">
                <p className="hidden md:inline cursor-pointer">Become a host</p>
                <GlobeAltIcon className="h-6 cursor-pointer" />

                <div className="flex items-center space-x-2 border-2 p-2 rounded-full">
                    <MenuIcon className="h-6" />
                    <UserCircleIcon className="h-6" />
                </div>

            </div>

            {searchInput && (
                <div className="flex flex-col col-span-3 mx-auto mt-5">
                    <DateRangePicker
                        ranges={[selectionRange]}
                        minDate={new Date()}
                        rangeColors={["#fd5b61"]}
                        onChange={handleSelect} />
                </div>
            )}

        </header>
    );
}

export default Header;
