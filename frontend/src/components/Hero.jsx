import Typewriter from "typewriter-effect";

function FrontPage() {
  // const navigate = useNavigate();
  // const { setIsLoggedIn } = useData();
  // useEffect(() => {
  //   async function checkAuth() {
  //     const res = await axios.get(`${baseUrl}/user/checkAuth`, {
  //       withCredentials: true,
  //     });
  //     const data = res?.data;
  //     if (data?.cookies) {
  //       navigate("/home");
  //       setIsLoggedIn(true);
  //     }
  //     console.log(data);
  //   }
  //   checkAuth();
  // }, []);
  return (
    <div className="relative sm:h-[80vh] overflow-hidden text-[#F9FAFB] h-auto">
      <img
        src="./house.jpg"
        alt="House"
        className="sm:w-full sm:h-full object-contain opacity-90 sm:object-cover w-auto h-auto"
      />
      <div className="absolute sm:inset-0 flex items-center justify-center px-4 flex-col mt-2">
        <h1 className=" text-3xl sm:text-4xl md:text-5xl  text-center font-bold sm:text-white text-blue-200 bg-indigo-950 sm:bg-transparent sm:block hidden">
          <Typewriter
            options={{
              strings: [
                "Welcome to Rental Website",
                "Find Your Dream Home Today",
              ],
              autoStart: true,
              loop: true,
              delay: 80,
            }}
          />
        </h1>
      </div>
    </div>
  );
}

export default FrontPage;
