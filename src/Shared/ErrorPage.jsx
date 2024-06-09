import PrimaryBtn from "../Components/PrimaryBtn";


const ErrorPage = () => {
    return (
        <div className=" w-full text-center">
            <img className="mx-auto" src="/public/404page.svg" alt="" />
            <PrimaryBtn link={'/'} customClass={'my-4'} name={'Go Back To Home'} ></PrimaryBtn>
        </div>
    );
};

export default ErrorPage;