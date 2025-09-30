import React from 'react';
import logo from "../../../assets/CollabStudy-FavIcon0.png"


const CollabStudyLogo = () => {
    return (
        <div className='flex gap-1.5 items-center ml-2'>
            <img className='w-8 h-10' src={logo} alt="" />
            <div className='font-extrabold text-xl'>
                <h1 className='text-blue-500'>Collab Study</h1>
                {/* <h1 className='text-blue-500'></h1> */}
            </div>
        </div>
    );
};

export default CollabStudyLogo;
//collabstudylogo