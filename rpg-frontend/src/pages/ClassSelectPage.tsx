import React from 'react';
import ImageButtons from "../components/ClassSelectComponent";
import Layout from "../Layout";
import "./ClassSelectPage.css";
const ClassSelectPage: React.FC = () => {

    const handleSelectClass = (className: string) => {
        console.log("User selected:", className);
    };


    return (
        <Layout showLogo={true}>

            <div>
                <p className="text1">CHOOSE YOUR CLASS:</p>
            </div>

          <div>
               <div style={{maxWidth:1000,marginLeft: "auto", marginRight: "auto"}}>
                  <ImageButtons onSelectClass={handleSelectClass} />
              </div>
          </div>

        </Layout>
    );
};

export default ClassSelectPage;