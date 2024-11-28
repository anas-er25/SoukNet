const forgotPasswordTemplate = ({ name, otp }) => {
  return `
    <div style="font-family: Arial, sans-serif; padding: 30px; background-color: #f4f4f9; border-radius: 8px; max-width: 600px; margin: 0 auto; box-sizing: border-box;">
        <div style="background-color: #007bff; color: white; padding: 20px 30px; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0; font-size: 26px; font-weight: 600;">Cher ${name},</h2>
        </div>
        <div style="padding: 30px; background-color: white; border-radius: 0 0 8px 8px;">
            <p style="font-size: 16px; color: #333; line-height: 1.6;">Nous avons reçu une demande de réinitialisation de mot de passe pour votre compte. Veuillez utiliser le code OTP ci-dessous pour réinitialiser votre mot de passe :</p>
            <div style="background-color: #f7f7f7; padding: 20px; border-radius: 6px; margin: 20px 0; text-align: center;">
                <p style="font-size: 22px; font-weight: bold; color: #333; margin: 0;">${otp}</p>
            </div>
            <p style="font-size: 16px; color: #333; line-height: 1.6;">Ce code expirera dans 1 heure. Si vous n'avez pas demandé cette réinitialisation, ignorez ce message.</p>
        </div>
        <div style="text-align: center; font-size: 12px; color: #888; margin-top: 30px;">
            <p>© ${new Date().getFullYear()} SoukNet. Tous droits réservés.</p>
        </div>
    </div>
  `;
};

export default forgotPasswordTemplate;
