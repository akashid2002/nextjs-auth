import nodemailer from 'nodemailer';
import User from '@/models/userModel'
import bcrypt from 'bcryptjs'; 

export const sendEmail = async ({email, emailType, userID}: any) => {
    try {
        // Create a hashed token
        const hashedToken = await bcrypt.hash(userID.toString(), 10)

        if (emailType === 'VERIFY') {
            await User.findByIdAndUpdate(userID, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000 // 1 hour expiry
            })
        } else if (emailType === 'RESET') {
            await User.findByIdAndUpdate(userID, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000 // 1 hour expiry
            })
        }

        // Looking to send emails in production? Check out our Email API/SMTP product!
        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAILTRAP_USERNAME,
                pass: process.env.MAILTRAP_PASSWORD
            }
        });

        const mailOptions = {
            from: 'abhijeetkashid@gmail.com',
            to: email,
            subject: emailType === 'VERIFY' ? 'Verify your account' : 'Reset your password',
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here<a/>
            to ${emailType === 'VERIFY' ? 'Verify your email.' : 'reset you password'}</p>
            or copy and paste the following link into your browser:
            <p>${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`
        }

        const mailResponse = await transport.sendMail(mailOptions);

        return mailResponse;
    } catch (error: any) {
        console.log('Error sending email:', error.message);
    }
}