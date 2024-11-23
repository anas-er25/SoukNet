// Importation des modules nécessaires
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import connectDB from "./config/db.js";

// Chargement des variables d'environnement
dotenv.config();

// Création de l'application Express
const app = express();

// Définition du port
const port = process.env.PORT || 8080;

// Configuration du middleware CORS pour gérer les requêtes cross-origin
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);

// Middleware pour parser les requêtes en JSON
app.use(express.json());

// Middleware pour parser les cookies
app.use(cookieParser());

// Middleware pour loguer les requêtes HTTP
app.use(morgan());

// Middleware pour sécuriser les en-têtes HTTP
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

// Route principale
app.get("/", (req, res) => {
  res.json({
    message: "Le serveur est en cours d'exécution",
  });
});

// Connexion à la base de données et démarrage du serveur une fois la connexion réussie
connectDB().then(() => {
  app.listen(port, () => {
    console.log("Le serveur est en cours d'exécution sur le port : ", port);
  });
});
