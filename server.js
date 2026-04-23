import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;
const DATA_FILE = path.join(__dirname, 'src', 'data', 'reports.json');

app.use(cors());
app.use(express.json());

// Charger les rapports
app.get('/api/reports', async (req, res) => {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la lecture des données" });
  }
});

// Ajouter un rapport
app.post('/api/reports', async (req, res) => {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    const reports = JSON.parse(data);
    
    const newReport = {
      ...req.body,
      id: Date.now().toString() // Simple ID generation
    };
    
    reports.push(newReport);
    await fs.writeFile(DATA_FILE, JSON.stringify(reports, null, 2));
    res.status(201).json(newReport);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la sauvegarde" });
  }
});

// Supprimer un rapport
app.delete('/api/reports/:id', async (req, res) => {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    let reports = JSON.parse(data);
    
    reports = reports.filter(r => r.id !== req.params.id);
    
    await fs.writeFile(DATA_FILE, JSON.stringify(reports, null, 2));
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la suppression" });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur local lancé sur http://localhost:${PORT}`);
});
