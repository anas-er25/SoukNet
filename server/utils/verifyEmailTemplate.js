const verifyEmailTemplate = ({ name, url }) => {
  return `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f9; border-radius: 8px; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #007bff; color: white; padding: 10px 20px; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0; font-size: 24px;">Bienvenue ${name} !</h2>
        </div>
        <div style="padding: 20px; background-color: white; border-radius: 0 0 8px 8px;">
            <p style="font-size: 16px; color: #333;">Merci de vous être inscrit sur notre application. Pour continuer, veuillez vérifier votre adresse e-mail.</p>
            <a href="${url}" style="display: inline-block; background-color: #28a745; color: white; text-decoration: none; padding: 12px 25px; border-radius: 5px; font-size: 18px; font-weight: bold; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); transition: background-color 0.3s ease;">
                Vérifier l'Email
            </a>
            <p style="margin-top: 20px; font-size: 14px; color: #555;">Si vous n'avez pas demandé cette inscription, ignorez ce message.</p>
        </div>
        <div style="text-align: center; font-size: 12px; color: #888; margin-top: 20px;">
            <p>© 2024 Votre Application. Tous droits réservés.</p>
        </div>
    </div>
    `;
};

export default verifyEmailTemplate;
