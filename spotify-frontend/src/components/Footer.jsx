import { useNavigate } from "react-router-dom";

import {
  FaInstagram,
  FaTwitter,
  FaFacebook,
} from "react-icons/fa";


const Footer = () => {

  const navigate = useNavigate();


  return (

    <footer className="bg-[#121212] text-gray-400 px-8 py-12 mt-10">


      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">


        {/* Company */}

        <div>

          <h3 className="text-white font-bold mb-4">
            Company
          </h3>


          <p
            onClick={() => navigate("/")}
            className="hover:text-white cursor-pointer mb-2"
          >
            About
          </p>


          <p className="hover:text-white cursor-pointer mb-2">
            Jobs
          </p>


          <p className="hover:text-white cursor-pointer mb-2">
            For the Record
          </p>


        </div>





        {/* Communities */}

        <div>

          <h3 className="text-white font-bold mb-4">
            Communities
          </h3>


          <p
            onClick={() => navigate("/artists")}
            className="hover:text-white cursor-pointer mb-2"
          >
            Artists
          </p>


          <p className="hover:text-white cursor-pointer mb-2">
            Developers
          </p>


          <p className="hover:text-white cursor-pointer mb-2">
            Advertising
          </p>


        </div>






        {/* Useful Links */}

        <div>

          <h3 className="text-white font-bold mb-4">
            Useful Links
          </h3>


          <p
            onClick={() => navigate("/search")}
            className="hover:text-white cursor-pointer mb-2"
          >
            Support
          </p>


          <p
            onClick={() => navigate("/")}
            className="hover:text-white cursor-pointer mb-2"
          >
            Free Mobile App
          </p>


        </div>






        {/* Social Icons */}

        <div className="flex gap-4 md:justify-end">


          <a
            href="https://instagram.com"
            target="_blank"
            className="
            w-11
            h-11
            rounded-full
            bg-[#242424]
            flex
            items-center
            justify-center
            hover:bg-green-600
            hover:text-white
            transition
            "
          >

            <FaInstagram size={20}/>

          </a>





          <a
            href="https://twitter.com"
            target="_blank"
            className="
            w-11
            h-11
            rounded-full
            bg-[#242424]
            flex
            items-center
            justify-center
            hover:bg-green-600
            hover:text-white
            transition
            "
          >

            <FaTwitter size={20}/>

          </a>





          <a
            href="https://facebook.com"
            target="_blank"
            className="
            w-11
            h-11
            rounded-full
            bg-[#242424]
            flex
            items-center
            justify-center
            hover:bg-green-600
            hover:text-white
            transition
            "
          >

            <FaFacebook size={20}/>

          </a>



        </div>



      </div>





      <hr className="border-gray-700 my-8"/>




      <div className="flex flex-col md:flex-row justify-between text-sm gap-3">


        <div className="flex gap-5">


          <span className="hover:text-white cursor-pointer">
            Privacy Policy
          </span>


          <span className="hover:text-white cursor-pointer">
            Terms
          </span>


          <span className="hover:text-white cursor-pointer">
            Cookies
          </span>


        </div>



        <p>
          © 2026 Spotify Clone
        </p>



      </div>



    </footer>

  );

};


export default Footer;