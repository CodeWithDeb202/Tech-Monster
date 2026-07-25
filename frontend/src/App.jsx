import { useState } from "react";

import Loader from "./components/Common/Loader";
import AppRoutes from "./routes/AppRoutes";


function App(){
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading ? <Loader finish={setLoading} /> : (
        <>
          <div className="cyber-page">

            <div className="cyber-bg">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <AppRoutes/>
          </div>
        </>
      )}
    </>
  )

}

export default App;