const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  // Zelimo povezati event s korisnikom stoga imamo user
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  text: {
    type: String,
    required: true
  },
  title: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  // nadodano lokacija
  location: {
    type: String,
    required: true
  },
  eventDate: {
    type: Date,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  eventImg: {
    type: String
  },
  profileImg: {
    type: String
  },
  // za like i unlike, ne dislike vec ukloniti like
  // povezujemo s korisnikom da znamo tko je likea, pojedini korisnik moze likeat samo jednom
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      // sadrzaj komentara
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      //   avatar: {
      //     type: String
      //   },
      profileImg: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Event = mongoose.model("event", EventSchema);
