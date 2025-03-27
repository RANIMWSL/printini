const mongoose = require('mongoose');


const inventorySchema = mongoose.Schema({
  materialType: String,
  quantity: Number,
  reorderLevel: Number,
  color: String,
  note: String
     
})
const InventorySchema = mongoose.model('inventories', inventorySchema);
module.exports =InventorySchema