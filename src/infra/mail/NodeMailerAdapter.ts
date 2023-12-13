import Mail from "./Mail";
import nodemailer, {Transporter} from "nodemailer";
import tls from 'tls';

export default class NodeMailerAdapter implements Mail {
    transport!: Transporter;
    async createTransport(): Promise<void> {
        this.transport = nodemailer.createTransport({
            host: 'sandbox.smtp.mailtrap.io',
            port: 465,
            secure: false,
            auth: {
                user: '67be179f84e22a',
                pass: 'df4edef396408f'
            }
        });
    }
    async send(mailOptions: any, callback:(...args: any[]) => void): Promise<void> {
        this.transport.sendMail(mailOptions, (...args) => {
            callback(...args);
        });
    }    
}