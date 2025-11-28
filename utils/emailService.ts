import sgMail from '@sendgrid/mail';
import { config } from '../config/env';

sgMail.setApiKey(config.smtp.pass);

export const sendVerificationEmail = async (to: string, token: string) => {
    const link = `${config.smtp.baseUrl}/api/verify-email?token=${token}`;

    console.log('🔗 [DEV] Verification Link:', link); // Залишаємо для дебагу

    const msg = {
        to,
        from: config.smtp.from,
        subject: 'Verify your email',
        html: `<p>Click <a href="${link}">here</a> to verify your email.</p>`,
    };

    try {
        await sgMail.send(msg);
        console.log('Verification email sent');
        return true;
    } catch (error: any) {
        console.error('Email send failed:');

        if (error.response) {
            console.error(error.response.body);
        } else {
            console.error(error);
        }
        return null;
    }
};