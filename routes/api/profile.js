const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route  GET api/profile/me
// @desc   Get current users profile
// @access Private
router.get("/me", auth, async (req, res) => {
  try {
    //Trazimo ga prema id-u usera
    //Populate kako bi dodali tj. dohvatili iz Usera ime 
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate("user", ["name"]);

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route  POST api/profile
// @desc   Create or update user profile
// @access Private

router.post(
  "/",
  [
    auth,
    [
      check("age", "Age is required")
        .not()
        .isEmpty(),
      check("location", "Location is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      location,
      bio,
      age,
      interests,
      youtube,
      twitter,
      instagram,
      facebook
    } = req.body;

    //Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (age) profileFields.age = age;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (interests) {
      profileFields.interests = interests.split(",").map(interest => interest.trim());
    }

    //Build social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        // Update profile ako je pronaden
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      // Ako profil nije naden Create i spremi ga
      profile = new Profile(profileFields);

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route  GET api/profile
// @desc   Get all profiles
// @access Public
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name"]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route  GET api/profile/user/:user_id
// @desc   Get profile by user ID
// @access Public
router.get("/user/:user_id", async (req, res) => {
  try {
    // Trazimo prema user_id-u koji je iz URL-a
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate("user", ["name"]);

    if (!profile) return res.status(400).json({ msg: "Profile not found" });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(400).json({ msg: "Profile not found" });
    }
    res.status(500).send("Server Error");
  }
});

//@route POST api/profile/avatar
//@desc spremanje linka slike na ucitane na cloudinaryju
//@access private

router.post('/avatar', auth, async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user.id });
    const { image } = req.body;
    profile.image = image;
    await profile.save();
    return res.json(profile);
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
  }
});


module.exports = router;