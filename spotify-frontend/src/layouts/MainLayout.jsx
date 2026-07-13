import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Player from "../components/Player";
import Footer from "../components/Footer";


const MainLayout = ({ children }) => {

  return (

    <div className="h-screen flex flex-col bg-black text-white">


      <div className="flex flex-1 overflow-hidden">


        {/* Sidebar */}

        <Sidebar />



        {/* Main area */}

        <div className="flex-1 flex flex-col">


          {/* Navbar */}

          <Navbar />



          {/* Page content */}

          <div className="flex-1 overflow-y-auto px-2 md:px-0">


            {children}


            {/* Footer */}

            <Footer />


          </div>


        </div>


      </div>




      {/* Player */}

      <Player />


    </div>

  );

};


export default MainLayout;