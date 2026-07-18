const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const Food = require('./models/Food');
const connectDB = require('./configration/db'); // ✅ Configured Database Connection
const Order = require('./models/Order');

// --- (User Model dynamically created for safety) ---
const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const User = mongoose.models.User || mongoose.model('User', UserSchema);

dotenv.config();
const app = express();

// Middleware
app.use(cors()); // ✅ Ab CORS block nahi karega!
app.use(express.json());

// Database Connection
connectDB();

// --- API Routes ---

// 1. Check Server status
app.get('/', (req, res) => {
    res.send("API is running...");
});

// 2. USER SIGNUP ROUTE
app.post('/api/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Validation
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "Astronaut email already registered!" });
        }

        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).json({ message: "Registration successful! Welcome to the squad." });
    } catch (err) {
        res.status(500).json({ message: "Transmission Error during Signup", error: err.message });
    }
});

// 3. USER LOGIN ROUTE
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find user
        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(400).json({ message: "Invalid Access Key (Password) or Email!" });
        }

        res.json({ 
            message: "Authentication Successful! Systems online.", 
            user: { id: user._id, name: user.name, email: user.email } 
        });
    } catch (err) {
        res.status(500).json({ message: "Transmission Error during Login", error: err.message });
    }
});

// 4. Seed Initial Food Data (For testing with 50 Unique Space Items!)
app.get('/api/seed', async (req, res) => {
    try {
        await Food.deleteMany({});
        const dummyFoods = [
            // --- PIZZAS (10 Items) ---
            { name: "Nebula Double Cheese Pizza", price: 299, description: "Loaded with glowing astronomical mozzarella.", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591", category: "Pizza" },
            { name: "Supernova Spicy Paneer Pizza", price: 320, description: "Fiery paneer cubes blasted with cosmic pepper.", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002", category: "Pizza" },
            { name: "Asteroid Onion & Olive Pizza", price: 280, description: "Topped with asteroid-shaped olives and sweet onions.", image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e", category: "Pizza" },
            { name: "Galaxy Golden Corn Pizza", price: 270, description: "Sweet golden corn from the fields of Jupiter.", image: "https://images.unsplash.com/photo-1544982503-9f984c14501a", category: "Pizza" },
            { name: "Meteorite Mushroom Pizza", price: 310, description: "Earthly mushrooms with alien spices on a crispy crust.", image: "https://images.unsplash.com/photo-1604917621956-10dfa7cce2e7", category: "Pizza" },
            { name: "Capsicum Crater Pizza", price: 260, description: "Fresh green capsicum rings laid over heavy cheese craters.", image: "https://images.unsplash.com/photo-1590947132387-155cc02f3212", category: "Pizza" },
            { name: "Red Rocket Tomato Pizza", price: 250, description: "Tangy sun-dried space tomatoes with basil.", image: "https://images.unsplash.com/photo-1511018556340-d16986a1c194", category: "Pizza" },
            { name: "Solar Flare Jalapeno Pizza", price: 295, description: "Extremely spicy jalapenos that ignite your taste buds.", image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee", category: "Pizza" },
            { name: "Black Hole BBQ Paneer Pizza", price: 340, description: "Smoky paneer chunks pulled into a dark sweet BBQ spiral.", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38", category: "Pizza" },
            { name: "Cosmic Crust Cheese Burst Pizza", price: 380, description: "Liquid cheese lava flowing straight from Mars core.", image: "https://images.unsplash.com/photo-1594001478280-e486e3db351f", category: "Pizza" },

            // --- BURGERS (10 Items) ---
            { name: "Cosmic Crispy Veg Burger", price: 99, description: "Asteroid-shaped crispy patty with fresh galaxy veggies.", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd", category: "Burger" },
            { name: "Nebula Cheese Lava Burger", price: 149, description: "Overflowing hot cheese inside a toasted cosmic bun.", image: "https://images.unsplash.com/photo-1550547660-d9450f859349", category: "Burger" },
            { name: "Meteor Spicy Paneer Burger", price: 139, description: "Crispy paneer block dipped in spicy rocket sauce.", image: "https://images.unsplash.com/photo-1499028344343-cd173ffc68a9", category: "Burger" },
            { name: "Star Dust Double Decker Veg Burger", price: 179, description: "Two high-protein patties layered with stardust cheese.", image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90", category: "Burger" },
            { name: "Galaxy Alootikki Supreme Burger", price: 89, description: "The classic desic-space taste with a crunchy aloo patty.", image: "https://images.unsplash.com/photo-1525059696034-4967a8e1dca2", category: "Burger" },
            { name: "Astro Onion Rings Burger", price: 119, description: "Stuffed with crispy golden fried onion rings.", image: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d", category: "Burger" },
            { name: "Solar Spicy Jalapeno Burger", price: 129, description: "Fierce spicy jalapenos with creamy eggless space mayo.", image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5", category: "Burger" },
            { name: "Eclipse BBQ Mushroom Burger", price: 159, description: "Grilled mushrooms brushed with rich dark BBQ glaze.", image: "https://images.unsplash.com/photo-1586816001966-79b736744398", category: "Burger" },
            { name: "Space Ranger Corn & Peas Burger", price: 109, description: "A sweet and savory mix of garden peas and corn.", image: "https://images.unsplash.com/photo-1512152272829-e3139592d56f", category: "Burger" },
            { name: "Black Nebula Charcoal Burger", price: 199, description: "Served in an edible black charcoal bun with double cheese.", image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add", category: "Burger" },

            // --- NOODLES & SIDES (15 Items) ---
            { name: "HyperSpace Hakka Noodles", price: 149, description: "Classic Indo-Chinese style noodles from sector 9.", image: "https://images.unsplash.com/photo-1585032226651-759b368d7246", category: "Noodles" },
            { name: "Supernova Schezwan Noodles", price: 169, description: "Noodles tossed in fiery hot space schezwan sauce.", image: "https://images.unsplash.com/photo-1526318896980-cf78c088247c", category: "Noodles" },
            { name: "Meteorite Mushroom Noodles", price: 179, description: "Packed with sliced earth-grown button mushrooms.", image: "https://images.unsplash.com/photo-1617470703128-26a0fc9af10f", category: "Noodles" },
            { name: "Solar Paneer Fried Noodles", price: 189, description: "Crispy fried noodles topped with soft paneer cubes.", image: "https://images.unsplash.com/photo-1552611052-33e04de081de", category: "Noodles" },
            { name: "Garlic Butter Space Noodles", price: 159, description: "A subtle and rich blend of roasted garlic and space butter.", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624", category: "Noodles" },
            { name: "Singapori Stardust Noodles", price: 179, description: "Mildly sweet yellow noodles with cosmic veggies.", image: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6", category: "Noodles" },
            { name: "Comet Chilli Garlic Noodles", price: 165, description: "Heavy on red chilli flakes and crushed alien garlic.", image: "https://images.unsplash.com/photo-1558985250-27a406d64cb3", category: "Noodles" },
            { name: "Stardust French Fries", price: 89, description: "Salted golden potato sticks dusted with cosmic salt.", image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877", category: "Sides" },
            { name: "Asteroid Peri Peri Fries", price: 109, description: "Super spicy peri peri powder sprinkled evenly.", image: "https://images.unsplash.com/photo-1576107232684-1279f390859f", category: "Sides" },
            { name: "Nebula Cheese Loaded Fries", price: 149, description: "Fries drowned in gooey white and yellow liquid cheese.", image: "https://images.unsplash.com/photo-1585109649139-366815a0d713", category: "Sides" },
            { name: "Cosmic Veg Spring Rolls", price: 119, description: "Crispy outer roll with seasoned veggie stuffing inside.", image: "https://images.unsplash.com/photo-1544025162-d76694265947", category: "Sides" },
            { name: "Space Station Garlic Bread", price: 129, description: "Freshly baked bread with butter, herbs, and garlic.", image: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c", category: "Sides" },
            { name: "Supernova Cheese Garlic Bread", price: 159, description: "Topped with melted mozzarella cheese and herbs.", image: "https://images.unsplash.com/photo-1619535860434-ba1d8fa12536", category: "Sides" },
            { name: "Meteorite Veg Nuggets", price: 99, description: "Crunchy nuggets packed with mashed vegetables and spices.", image: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec", category: "Sides" },
            { name: "Milkyway Paneer Tikka", price: 219, description: "Soft marinated paneer blocks roasted inside a space tandoor.", image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8", category: "Sides" },

            // --- DESERTS & DRINKS (15 Items) ---
            { name: "Mars Melting Chocolate Lava Cake", price: 129, description: "Warm chocolate flowing out of a soft dark cake.", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c", category: "Desert" },
            { name: "Stardust Vanilla Ice Cream", price: 79, description: "Smooth vanilla ice cream with glowing silver sprinkles.", image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371", category: "Desert" },
            { name: "Supernova Hot Fudge Sundae", price: 149, description: "Vanilla scoops layered with thick chocolate sauce and nuts.", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb", category: "Desert" },
            { name: "Nebula Blueberry Mousse", price: 139, description: "Soft, whipped cream infused with galactic blueberries.", image: "https://images.unsplash.com/photo-1532499016263-f2c3e89df9cd", category: "Desert" },
            { name: "Cosmic Caramel Pudding", price: 119, description: "Rich custard with a sweet dark caramel pool on top.", image: "https://images.unsplash.com/photo-1541832676-9b763b0239ab", category: "Desert" },
            { name: "Black Hole Brownie with Ice Cream", price: 169, description: "Hot sizzler brownie with a scoop of cold vanilla.", image: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e", category: "Desert" },
            { name: "Solar Lemonade Fuel", price: 69, description: "Super refreshing carbonated lemon drink to recharge.", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd", category: "Drinks" },
            { name: "HyperSpace Iced Tea", price: 89, description: "Chilled brewed black tea with a splash of fresh lemon juice.", image: "https://images.unsplash.com/photo-1497534446932-c925b458314e", category: "Drinks" },
            { name: "Galaxy Blue Lagoon Mocktail", price: 119, description: "A glowing blue curacao syrup drink with soda.", image: "https://images.unsplash.com/photo-1536935338788-846bb9981813", category: "Drinks" },
            { name: "Supernova Strawberry Shake", price: 129, description: "Thick strawberry shake blended with real fruit syrup.", image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc", category: "Drinks" },
            { name: "Comet Oreo Chocolate Shake", price: 139, description: "Blended cookies and rich chocolate fudge.", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699", category: "Drinks" },
            { name: "Milkyway Cold Coffee", price: 119, description: "Strong coffee blended with fresh milk and ice cream.", image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c", category: "Drinks" },
            { name: "Meteorite Mango Shake", price: 129, description: "Rich king mango pulp blended smooth.", image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888", category: "Drinks" },
            { name: "Solar Mint Mojito", price: 109, description: "Crushed mint leaves, fresh lime wedges, and sugar over ice.", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd", category: "Drinks" },
            { name: "Red Rocket Virgin Mary", price: 129, description: "Tangy tomato juice with a pinch of black pepper and lemon.", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd", category: "Drinks" }
        ];
        
        await Food.insertMany(dummyFoods);
        res.json({ message: "50 Cosmic food items inserted successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 5. Get All Food Items
app.get('/api/food', async (req, res) => {
    try {
        const foods = await Food.find({});
        res.json(foods);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 6. Place a New Order
app.post('/api/orders', async (req, res) => {
    try {
        const { customerName, address, items, totalAmount } = req.body;
        const newOrder = new Order({ customerName, address, items, totalAmount });
        await newOrder.save();
        res.status(201).json({ message: "Order placed successfully!", order: newOrder });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT} 🚀`));

