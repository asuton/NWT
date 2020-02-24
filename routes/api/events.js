const express = require("express");
const router = express.Router();
// express-validator: requires to express-validator/check are deprecated.
// You should just use require("express-validator") instead.
// Stoga express-validator' umjesto express-validator/check kao u tutorijalu
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

const Event = require("../../models/Event");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route  POST api/events
// @desc   Create an event
// @access Private
router.post(
  "/",
  [
    auth,
    [
      check("text", "Text is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Trebamo dohvatiti usera
    try {
      const user = await User.findById(req.user.id).select("-password");
      const profile = await Profile.findOne({ user: req.user.id });
      const newEvent = new Event({
        text: req.body.text,
        name: user.name,
        user: req.user.id,
        location: req.body.location,
        date: req.body.date,
        profileImg: profile.image,
        category: req.body.category,
        eventImg: req.body.eventImg,
        eventDate: req.body.eventDate,
        title: req.body.title
      });

      const event = await newEvent.save();

      res.json(event);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route  GET api/events
// @desc   Get all events
// @access Private
// Postavljeno da su profiles public, events private
router.get("/", auth, async (req, res) => {
  try {
    // Sortira ih po datumu od najnovijeg
    const events = await Event.find().sort({ date: -1 });
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route  GET api/events/:id
// @desc   Get event by ID
// @access Private
router.get("/:id", auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ msg: "Event not found" });
    }

    res.json(event);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Event not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route  DELETE api/events/:id
// @desc   Delete an event
// @access Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ msg: "Event not found" });
    }

    // Osoba koje moze izbrisati event je kreator eventa
    // Check user
    // id je string, post.user je object id, da bi bili istog tipa koristimo post.user.toString
    if (event.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    // ako je korisnik autoriziran, ukloni event
    await event.remove();

    res.json({ msg: "Event removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Event not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route  PUT api/events/like/:id
// @desc   Like an event
// @access Private
router.put("/like/:id", auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    // Check if the event has already been liked by this user
    if (
      event.likes.filter(like => like.user.toString() === req.user.id).length > 0
    ) {
      return res.status(400).json({ msg: "Event already liked" });
    }

    // Ako event nije vec likean
    event.likes.unshift({ user: req.user.id });

    // Spremi da je likeano u bazu
    await event.save();

    res.json(event.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route  PUT api/events/unlike/:id
// @desc   Unlike an event
// @access Private
router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    // Check if the event has already been liked by this user
    // Ako je duljina jednaka nuli, nije likeano
    if (
      event.likes.filter(like => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "Event has not yet been liked" });
    }

    // Get remove index
    const removeIndex = event.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id);

    event.likes.splice(removeIndex, 1);

    // Spremi da je likeano u bazu
    await event.save();

    res.json(event.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/events/comment/:id
// @desc     Comment on an event
// @access   Private
router.post(
  "/comment/:id",
  [
    auth,
    [
      check("text", "Text is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const profile = await Profile.findOne({user: req.user.id});
      const event = await Event.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        user: req.user.id,
        profileImg: profile.image
      };

      event.comments.unshift(newComment);

      await event.save();

      res.json(event.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    DELETE api/events/comment/:id/:comment_id
// @desc     Delete comment
// @access   Private
router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    // Dohvatiti event prema id-u
    const event = await Event.findById(req.params.id);

    // Pull out comment from event
    const comment = event.comments.find(
      comment => comment.id === req.params.comment_id
    );

    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: "Comment does not exist" });
    }

    // Check user tj je li korisnik koji brise komentar onaj koji ga je i napisao
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    // Get remove index
    const removeIndex = event.comments
      .map(comment => comment.id)
      .indexOf(req.params.comment_id);

    event.comments.splice(removeIndex, 1);

    await event.save();

    res.json(event.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
