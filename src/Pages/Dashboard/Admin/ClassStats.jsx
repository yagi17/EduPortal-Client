import { useLoaderData } from "react-router-dom";


const ClassStats = () => {
    const {title} = useLoaderData()
    // console.log(title);


    return (
        <div className="text-center"> 
            <h2 className='text-5xl font-semibold'>Class Stat will be here</h2>
            <h2>{title}</h2>
        </div>
    );
};

export default ClassStats;