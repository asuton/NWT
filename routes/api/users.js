const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');

// @route  POST api/users
// @desc   Register user
// @access Public 
// potreban name, email i pass za kreiranje korisnika 
// drugi parametar kao middleware za provjeru i definiranje pravila 
router.post(
    '/', 
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Please enter a password with 6 or more characters').isLength({min: 6})
    ], 
    async (req, res) => {
        // provjera grešaka unutar requesta
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            // vraća se json s error porukama iz checka
            return res.status(400).json({errors: errors.array()});
        }

        const {name, email, password} = req.body;

        try {

        // Provjera da li korisnik postoji
            let user = await User.findOne({ email }); // async/await jer .findOne vraca promise

            if(user) {
                // isto kao i za prethodni status
                return res.status(400).json({ errors: [{ msg: 'User already exists' }]});
            }

            // stvaranje instance a sa .save() sprema se u bazu
            user = new User({
                name, 
                email,
                password
            });

        // Encrypt password
            // Salt za hashing

            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            await user.save();

        // Return jsonwebtoken
            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(
                payload, 
                config.get('jwtSecret'),
                { expiresIn: 360000 },
                (err, token) => {
                    if(err) throw err;
                    // dobiva se token kao response
                    res.json({ token });
                }
            );
        
        } catch(err){
            console.error(err.message);
            res.status(500).send('Server error');
        }

    }
);

module.exports = router;