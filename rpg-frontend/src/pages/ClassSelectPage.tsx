import React from 'react';
import { useNavigate } from 'react-router-dom';
import ImageButtons from "../components/ClassSelectComponent";
import WhiteButton from "../components/WhiteButton";
import Layout from "../Layout";
import "./ClassSelectPage.css";

const ClassSelectPage: React.FC = () => {
    const navigate = useNavigate();
    const [selectedClass, setSelectedClass] = React.useState<string | null>(null);

    const handleSelectClass = (className: string) => {
        console.log("User selected:", className);
        setSelectedClass(className);
    };

    const handleClick = (button: string) => {
        console.log(`${button} button clicked!`);
        if (button === "CONFIRM" && selectedClass) {
            navigate('/profile'); // Navigate to profile page
        }
    };

    return (
        <Layout showLogo={true}>
            <div>
                <p className="text1">CHOOSE YOUR CLASS:</p>
            </div>

            <div>
                <div style={{ maxWidth: 1000, marginLeft: "auto", marginTop: 30, marginRight: "auto" }}>
                    <ImageButtons onSelectClass={handleSelectClass} />
                </div>
                <div className="down-buttons">
                    <WhiteButton onClick={() => handleClick("GITHUB REPO")} text="GITHUB REPO" />
                    <WhiteButton onClick={() => handleClick("ABOUT PROJECT")} text="ABOUT PROJECT" width="160px" />
                    <WhiteButton onClick={() => handleClick("CLASS INFO")} text="CLASS INFO" />
                    <WhiteButton onClick={() => handleClick("CONFIRM")} text="CONFIRM" />
                </div>
            </div>
        </Layout>
    );
};

export default ClassSelectPage;
