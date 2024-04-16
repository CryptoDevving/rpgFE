import React from 'react';
import ImageButtons from "../components/ClassSelectComponent";
import WhiteButton from "../components/WhiteButton";
import Layout from "../Layout";
import "./ClassSelectPage.css";


const ClassSelectPage: React.FC = () => {

    const handleSelectClass = (className: string) => {
        console.log("User selected:", className);
    };

    const handleClick = () => {
        console.log("Button clicked!");
    };

    return (
        <Layout showLogo={true}>

            <div>
                <p className="text1">CHOOSE YOUR CLASS:</p>
            </div>

          <div>
               <div style={{maxWidth:1000,marginLeft: "auto", marginTop: 30, marginRight: "auto"}}>
                  <ImageButtons onSelectClass={handleSelectClass} />
              </div>
              <div className="down-buttons">
                  <WhiteButton onClick={handleClick} text="GITHUB REPO" />
                  <WhiteButton onClick={handleClick} text="ABOUT PROJECT" width="160px"/>
                  <WhiteButton onClick={handleClick} text="CLASS INFO" />
                  <WhiteButton onClick={handleClick} text="CONFIRM" />
              </div>
          </div>

        </Layout>
    );
};

export default ClassSelectPage;