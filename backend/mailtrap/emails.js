import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "../mailtrap/emailTemplates.js";
import { mailtrapClient, sender } from "../mailtrap/mailtrapConfig.js";




export const sendVerificationEmail =async (email, verificationToken)=>{
    const recipient=[{ email }];

    try {
        const response =await mailtrapClient.send({
            from:sender,
            to:recipient,
            subject:"Verify Your Email",
            html:VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category:"Email Verification",
        })

        console.log("Email sent successfully:", response);
    } catch (error) {
        console.error(`Error sending verification  `,error);
        throw new Error(`Error sending verification email: ${error}`);
    }
}

export const sendWelcomeEmail =async (email, name)=>{
    const recipient=[{ email }];
    
    try {
        const response =await mailtrapClient.send({
            from:sender,
            to:recipient,
            template_uuid:"c915e80d-581e-4ae4-a67d-64793b176b4d",
            template_variables:{
                "name": name,
                "company_info_name": "ze company "
            },
        })

        console.log("Welcome Email sent successfully:", response);
    } catch (error) {
        console.error(`Error sending welcome email`,error);
        throw new Error(`Error sending welcome email: ${error}`);
    }
}

export const sendPasswordResetEmail=async (email,resetURL)=>{
    const recipient=[{email}];
    try {
        const response =await mailtrapClient.send({
                        from:sender,
                        to:recipient,
                        subject:"Reset Your Password",
                        html:PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
                        category:"Password Reset",
                    });
                    console.log("Password Reset Email sent successfully:", response);

    } catch (error) {
        console.error(`Error sending password reset email`,error);
        throw new Error(`Error sending password reset email: ${error}`);
    }
}

export const sendResetSuccessEmail=async(email)=>{
    const recipient=[{email}];
    try {
        const response=await  mailtrapClient.send({
            from:sender,
            to:recipient,
            subject:"Password Reset Successful",
            html:PASSWORD_RESET_SUCCESS_TEMPLATE,
            category:"Password Reset ",
        })
        console.log("Password Reset  Email sent successfully:", response);
    } catch (error) {
        console.error(`Error sending password reset success email`,error);  
        throw new Error(`Error sending password reset success email: ${error}`);
    }
}