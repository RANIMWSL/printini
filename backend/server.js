require("dotenv").config(); // ✅ Charger .env dès le début

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Vérifier si MONGO_URI est bien chargé
if (!process.env.MONGO_URI) {
  console.error("❌ Erreur: MONGO_URI n'est pas défini !");
  process.exit(1); // Arrêter le serveur si MongoDB n'est pas configuré
}

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connecté à MongoDB"))
  .catch(err => console.error("❌ Erreur MongoDB:", err));

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(PORT, () => console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`));
