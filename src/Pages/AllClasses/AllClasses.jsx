import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import ClassCard from "./ClassCard";


const AllClasses = () => {

    const axiosPublic = useAxiosPublic()

    const [classes, setClasses] = useState([])

    useEffect(()=>{
        axiosPublic.get('/classes/status/approved')
        .then(res=>{
            setClasses(res.data)
            // console.log(res.data);
        })
    },[axiosPublic])

    return (
        <div>
            <div className="py-20 text-center font-bold text-4xl bg-[#FFF1E7] ">
                <h2>List Of Our Classes</h2>
            </div>
            <div className="max-w-5xl mx-auto my-32 grid md:grid-cols-3 gap-6">
                {
                    classes.map(SingleClass=> <ClassCard
                    key={SingleClass._id} classes={SingleClass} ></ClassCard> )
                }
            </div>
        </div>
    );
};

export default AllClasses;