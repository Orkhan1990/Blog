import { Button } from "flowbite-react";

const CallToAction = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 border-2 border-blue-400 p-10 rounded-tl-3xl rounded-br-3xl rounded-bl-none rounded-tr-none">
      <div className="flex-1 flex flex-col justify-center">
        <h2 className="text-center font-bold text-xl ">Want to learn more about Javascript?</h2>
        <p className="text-center my-3">Checkout these resources with 100 Javascript Projects</p>
        <a href="https://www.100jsprojects.com" target="_blank">
        <Button gradientDuoTone={"purpleToPink"} className="w-full rounded-tl-xl rounded-bl-none">
     Learn more
        </Button>
        </a>
    
      </div>
      <div className="flex-1 w-full pl-15">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5_xpul_qIjiuZvEO5RbvKIWYe-hS1GHdK2Z5vM8Yafw&s"
          alt="js"
          className="w-full"
        />
      </div>
    </div>
  );
};

export default CallToAction;
