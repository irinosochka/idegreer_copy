import React, {useEffect, useState} from 'react';
import {ICourse} from "../../models/ICourse";
import {IUser} from "../../models/IUser";

interface SearchProps {
    getList: () => void,
    list: Array<ICourse|IUser> ,
    setSelected: (unit: any) => void
}

const SearchComponent: React.FC<SearchProps> = ({list, getList, setSelected}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [show, setShow] = useState(false);
    const [active, setActive] = useState(false);


    useEffect(() => {
        getList();
    }, [list]);

    const handleSelecting = (unit: any) => {
        setSelected(unit);
        setActive(false);
    };

    return(
        <>
            <div className={`search__input ${active && 'active'}`}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={e => {
                        setSearchTerm(e.target.value);
                        setShow(!show)
                        setActive(true);
                    }}
                />
                <div className="item__box">
                    {list?.filter((unit: any ) => {
                        if (searchTerm == "") {
                            return unit;
                        } else if(unit?.title?.toLowerCase().includes(searchTerm.toLowerCase()) || unit?.username?.toLowerCase().includes(searchTerm.toLowerCase())){
                            return unit;
                        }
                    }).map((unit: any) => {
                        return(
                            <li key={unit._id}
                                onClick={() => {
                                    handleSelecting(unit)
                                }}>
                                {(unit?.title || unit?.username)}
                            </li>
                        )})}
                </div>
            </div>
        </>
    )
}

export default SearchComponent;
