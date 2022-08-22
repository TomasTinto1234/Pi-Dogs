const { Router } = require("express");
const axios = require("axios");
const { Dog, Temperament } = require("../db");
const { API_KEY } = process.env;

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getFromApi = async () => {
  const api = await axios.get(
    "https://api.thedogapi.com/v1/breeds?api_key=2508b8d8-4c64-4be9-ab6e-36d668134ae9"
  );
  const dogList = await api.data.map((e) => {
    return {
      id: e.id,
      name: e.name,
      heightMin: e.height.metric.split("-")[0],
      heightMax: e.height.metric.split("-")[1],
      weightMin: e.weight.metric.split("-")[0],
      weightMax: e.weight.metric.split("-")[1],
      life_span: e.life_span,
      temperament: e.temperament,
      image: e.image.url,
    };
  });

  return dogList;
};

const getFromDB = async () => {
  const dogsDb= await Dog.findAll({  //aca me traigo todos los perros y ademas le pido que le agrege el modelo Temperament
    include: {    
      model: Temperament,        // esto hace la relacion para que me traiga el perro con el temperamento, y le pido el nombre
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  })
  const newDb = dogsDb.map((e)=>{ // hay que hacerle un map a los creados en la base de datos
    return {                      // antes de concatenar ambos datos de la api y de la DATABASE
      id: e.id,                   // e= DataValue     
      image: e.image,
      name: e.name,
      heightMin: e.heightMin,
      heightMax: e.heightMax,
      weightMin: e.weightMin,
      weightMax: e.weightMax,
      life_span: e.life_span,
      createdInDb: e.createdInDb,
      temperament: e.temperaments.map(cur=> cur.name+ ", ")
  }
  })
  return newDb
};

const getAll = async () => {
  const api = await getFromApi();  // me concateno toda la info de la api y de la base de datos
  const db = await getFromDB();
  const all = api.concat(db);

  return all;
};



const deleteDog = async (id) => {
  try {
    const deleteDg = await Dog.findByPk(id);  // trato de encotnrar en dog el perro por el id
    if (deleteDg){                    
      await deleteDg.destroy({ where: { id:id } }); // si lo encuentra que lo destruya

    } 
  } catch (error) {
    console.log(error);
  }
};

router.get("/dogs", async (req, res) => {
  const allDog = await getAll();    // primero busco en toda la info concatenada
  const { name } = req.query;       // el nombre en este caso puede ser cualquier otro que me llege de la api
  try {                             //como por ejemplo: life_span , heightMin , image
    if (name) {
      let dogName = await allDog.filter((e) => // busca en getAll si encuentra el perro con ese nombre, lo filtra 
        e.name.toLowerCase().includes(name.toLowerCase())//si hay un nombre, filtralos y transforma mayusc por minusc
      );
      dogName //encontraste un nombre?
        ? res.status(200).send(dogName)
        : res.status(404).send("Name not found");
    } else {
      res.status(200).send(allDog); //sino hay name pasado por query, envia todos los dogs
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/temperaments", async (req, res) => {
  try {   
    let temperamentApi = await axios.get(
      "https://api.thedogapi.com/v1/breeds?api_key=2508b8d8-4c64-4be9-ab6e-36d668134ae9"
  );
  let tempMapeo = temperamentApi.data.map((e) => e.temperament).toString(); //mapeo toda la data de temperamentos
  tempMapeo = await tempMapeo.split(", "); // separo los strings
  const tempSpace = await tempMapeo.map((e) => e.trim()); //elimino los espacios en blanco
  const tempNotRepeat = [...new Set(tempSpace)]; //con el constructor Set creo un objeto donde guardo los valores

  tempNotRepeat.forEach(async (e) => {
    //para cada uno entra al modelo temperament y hace un findOrCreate
    if (e) {
      await Temperament.findOrCreate({
        //es un metodo de Sequelize p/chequear si un elemento existe en la DB y sino lo crea
        where: {
          name: e,
        },
      });
    }
  });
  const allTemps = await Temperament.findAll();
  res.status(200).send(allTemps);
} catch (error) {
  console.log(error);
}
});

router.get("/dogs/:id", async (req, res) => {
  const allDog = await getAll();
  const { id } = req.params;
  try {
    if (id) {
      let dogId = await allDog.filter((e) => e.id == id);
      dogId.length
        ? res.status(200).send(dogId)
        : res.status(404).send("Id not found");
    }
  } catch (error) {
    console.log(error);
  }
});
router.delete("/dogs/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    await deleteDog(id);
    console.log(id)
    res.status(200).send("Dog Deleted");
  } catch (error) {
    console.log(error);
  }
});

router.post("/dogs", async (req, res) => {
  const {
    name,
    heightMin,
    heightMax,
    weightMin,
    weightMax,
    life_span,
    image,
    createdInDb,
    temperament,
  } = req.body;
  try {
    if (name) {
      const newDog = await Dog.create({
        name,
        heightMin,
        heightMax,
        weightMin,
        weightMax,
        life_span,
        image,
        createdInDb,
      });
      const createdDb = await Temperament.findAll({
        where: { name: temperament },
      });
      console.log(name);
      newDog.addTemperament(createdDb);
      return res.status(200).send("Dog Created");
    } else {
      return res.status(404).send("Dog Not Created");
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
