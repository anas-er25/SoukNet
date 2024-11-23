import mongoose from "mongoose";
import dotenv from "dotenv";

// Chargement des variables d'environnement à partir du fichier .env
dotenv.config();

// Vérification que la variable d'environnement MONDODB_URI est définie
if (!process.env.MONDODB_URI) {
  // Lancer une erreur si la variable d'environnement n'est pas définie
  throw new Error(
    "Veuillez fournir une variable d'environnement MONDODB_URI valide"
  );
}

// Fonction pour se connecter à la base de données MongoDB
async function connectDB() {
  try {
    // Tentative de connexion à MongoDB avec l'URI stocké dans la variable d'environnement
    await mongoose.connect(process.env.MONDODB_URI);
    console.log("Connecté à la base de données")
  } catch (error) {
    // En cas d'erreur de connexion, afficher l'erreur et arrêter le processus
    console.log("Erreur de connexion", error);
    process.exit(1); // Quitter le processus avec un code d'erreur
  }
}

// Exportation de la fonction pour utilisation dans d'autres parties de l'application
export default connectDB;
