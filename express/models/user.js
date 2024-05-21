const mongoose = require("mongoose");

let userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  hint: String,
  role: { type: String, default: "user" } 
});

// userSchema.methods.bcryptpasswords = async function(){
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// }

let user = mongoose.models.User || mongoose.model("User", userSchema);
module.exports = user;