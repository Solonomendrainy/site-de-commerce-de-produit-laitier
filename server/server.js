import express from "express";
import mysql from 'mysql'
import cors from 'cors'

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "crud"
})

app.get('/server/products', (req , res) => {
    const sql = " select * from product";
    db.query(sql, (err, result) => {
        if(err) return res.json({Message: " Error inside server"});
        return res.json(result);
    })
})

app.post('/server/addToCart', (req, res) => {
  const { Nom, quantite, MontantTotal, Images } = req.body;
  
  console.log("Received data:", req.body); // Afficher les données reçues

  const sql = "INSERT INTO carts (Nom, quantite, MontantTotal, Images) VALUES (?, ?, ?, ?)";
  db.query(sql, [Nom, quantite, MontantTotal, Images], (err, result) => {
    if (err) {
      console.error("Error inserting into cart:", err); // Afficher l'erreur si elle survient
      return res.json({ success: false, error: err.message });
    }
    return res.json({ success: true });
  });
});


  app.get('/server/cart', (req , res) => {
    const sql = "SELECT * FROM carts";
    db.query(sql, (err, result) => {
        if(err) return res.json({ Message: "Error inside server" });
        return res.json(result);
    });
});

app.delete('/server/cart/:id', (req, res) => {
  const itemId = req.params.id;
  const sql = "DELETE FROM carts WHERE id = ?";
  db.query(sql, itemId, (err, result) => {
      if(err) {
          console.error("Error cancelling item:", err);
          return res.json({ success: false, error: err.message });
      }
      return res.json({ success: true });
  });
});

app.post('/server/register', (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const checkEmailSql = "SELECT * FROM user WHERE email = ?";
  db.query(checkEmailSql, [email], (err, result) => {
    if (err) {
      console.error("Erreur lors de la vérification de l'email :", err);
      return res.status(500).json({ success: false, error: err.message });
    }

    if (result.length > 0) {
      return res.status(400).json({ success: false, error: "Cet email est déjà utilisé" });
    }

    const sql = "INSERT INTO user (firstName, lastName, email, password) VALUES (?, ?, ?, ?)";
    db.query(sql, [firstName, lastName, email, password], (err, result) => {
      if (err) {
        console.error("Erreur lors de l'enregistrement :", err);
        return res.status(500).json({ success: false, error: err.message });
      }

      return res.json({ success: true });
    });
  });
});


app.get('/server/cart/products', (req, res) => {
  const sql = `
    SELECT
      product.Nom,
      carts.Nom,
      carts.quantite,
      product.Images,
      carts.quantite,
      carts.MontantTotal
    FROM  carts INNER JOIN  product  ON carts.Nom = product.Nom
  `;
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching product data from cart:", err);
      return res.json({ success: false, error: err.message });
    }
    return res.json(result);
  });
});

app.post('/server/login', (req, res) => {
  const { email, password } = req.body;
  console.log("Requête de connexion reçue:", email, password);

  const sql = "SELECT * FROM user WHERE email = ? AND password = ?";
  db.query(sql, [email, password], (err, result) => {
    if (err) {
      console.error("Erreur lors de la connexion :", err);
      return res.json({ success: false, error: err.message });
    }

    console.log("Résultat de la requête:", result);

    if (result.length === 0) { // Si aucun utilisateur trouvé
      return res.json({ success: false, error: "Identifiants incorrects" });
    }

    return res.json({ success: true, data: result[0] });
  });
});




app.listen(8081, ()=> {
    console.log('Listening');
})