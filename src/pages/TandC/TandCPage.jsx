import React from "react";
import { useNavigate } from 'react-router-dom';
import { TandCSubsection } from "./TandCSubsection";
import { Button } from "../../components/Button/Button";

import "./TandCPage.css";

export const TAndCPage = () => {

    const navigate = useNavigate();

    return (
        <div className="flex-column complete-center full-height page-margin full-width">
            <h1 className="TandCPage-text">Terms & Conditions</h1>
            <TandCSubsection title={"1. Use of Website"} paragraphs={[
                "1.1. The Website is intended for personal use to prepare for exams, tests, or educational assessments.",
                "1.2. You must not use the Website for any illegal or unauthorized purpose. This includes, but is not limited to, distributing, sharing, or claiming content as your own, hacking or attempting to hack the Website, or engaging in any activity that violates the rights of others.",
                "1.3. Users found violating these terms may be subject to a permanent ban from the Website and may face legal action."
            ]}/>
            <TandCSubsection title={"2. Content Ownership"} paragraphs={[
                "2.1. All content on the Website, including but not limited to practice questions, answers, and explanations, is the intellectual property of the Company and is protected by copyright and other intellectual property laws.",
                "2.2. Users are strictly prohibited from copying, distributing, selling, or claiming any content from the Website as their own.",
                "2.3. Any unauthorized use of the Website's content may result in legal action and a permanent ban from the Website."
            ]}/>
            <TandCSubsection title={"3. Disclaimer"} paragraphs={[
                "3.1. The Company strives to provide accurate and up-to-date content. However, the Company does not guarantee the accuracy, reliability, or completeness of the content on the Website. Users should use the content for educational purposes only and verify information independently.",
                "3.2. The Company is not liable for any losses or damages incurred as a result of using the Website."
            ]}/>
            <TandCSubsection title={"4. Privacy"} paragraphs={[
                "4.1. The Website's privacy practices are outlined in the Privacy Policy. By using the Website, you consent to the collection and use of your information as described in the Privacy Policy.",
            ]}/>
            <TandCSubsection title={"5. Modifications to Terms"} paragraphs={[
                "5.1. The Company reserves the right to update or modify these Terms at any time without prior notice. Users are responsible for regularly reviewing the Terms for changes."
            ]}/>
            <TandCSubsection title={"6. Governing Law"} paragraphs={[
                "6.1. These Terms are governed by and construed in accordance with the laws of the United Kington. Any disputes related to the use of the Website will be subject to the exclusive jurisdiction of the courts in the United Kingdom."
            ]}/>
            <TandCSubsection title={"7. Money-Back Guarantee"} paragraphs={[
                "7.1. The Company offers a money-back guarantee to users who do not pass their exams after using the Website's content.",
                `7.2. To be eligible for the money-back guarantee, users must fulfill the following conditions:
                a. Users must have completed all available practice questions within a specific question set relevant to their exam.
                b. Users must have taken the actual exam within 30 days of completing the practice questions.
                c. Users must provide proof of their exam results, including a copy of the exam score report.`,
                "7.3. If users meet these conditions and do not pass their exam, they are entitled to a refund according to the Company's refund policy.",
                "7.4. The money-back guarantee is subject to the terms and conditions specified in the Company's refund policy. Please refer to the refund policy for additional details."
            ]}/>          
            <div className="TandCPageButton-container">
                <Button text="Go back" func={() => {
                    navigate(-1)
                }}/>
            </div>

        </div>
    )
}