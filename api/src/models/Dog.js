const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false      
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
   
    },

    heightMin: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    heightMax: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    weightMin: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    weightMax: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    breeds: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    
    life_span: {
      type: DataTypes.STRING,
     
    },

    image: {
      type: DataTypes.STRING,
      allowNull: true
    },

    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },

  },{timestamps: false});

  
};