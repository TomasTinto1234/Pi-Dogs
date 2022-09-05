const { Router } = require("express");
const axios = require("axios");
const { Dog, Temperament } = require("../db");
const { API_KEY } = process.env;

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// const getApiInfo = () => {
//   const apiUrl = axios.get("https://api.thedogapi.com/v1/breeds?api_key=2508b8d8-4c64-4be9-ab6e-36d668134ae9")
//       .then(response => response.data.map(e => {
//         let height = e.height.metric.split("-").map((e)=>e.trim())
//         let weight = e.weight.metric.split("-").map(e=>e.trim())
//           return {
//               id: l.id,
//               name: e.name,
//               heightMin: parseInt(height[0]), 
//               heightMax: parseInt(height[1]),
//               weightMin: parseInt(weight[0]),
//               weightMax: parseInt(weight[1]),
//               life_span: e.life_span,
//               breeds: e.breed_group,
//               temperament: e.temperament,
//               image: e.image.url ? e.image.url : "not image Dog",
//           }
//       }));
//   return apiUrl
// }


const getFromApi = async () => {
  try {
    const api = await axios.get(
      "https://api.thedogapi.com/v1/breeds?api_key=2508b8d8-4c64-4be9-ab6e-36d668134ae9"  // un pedido a la api de todos estos datos
    );
    const dogList = await api.data.map((e) => {    // los mapeo y es de esta forma que voy a acceder desde el front
      let height = e.height.metric.split("-").map((e)=>e.trim())
      let weight = e.weight.metric.split("-").map(e=>e.trim())
      
      return {
        id: e.id,
        name: e.name,
        heightMin: parseInt(height[0]), 
        heightMax: parseInt(height[1]),
        weightMin: parseInt(weight[0]),
        weightMax: parseInt(weight[1]),
        breeds: e.breed_group,
        life_span: e.life_span,
        temperament: e.temperament,              // /? e.temperament.split() : ["naN"]).map(e=>e.trim())
        image: e.image.url ? e.image.url : "not image Dog" ,
      };
    });

    return dogList;
  } catch (error) {
    console.log(error);
  }
};

const getFromDB = async () => {
  try {
    const dogsDb = await Dog.findAll({
      //aca me traigo todos los perros y ademas le pido que le agrege el modelo Temperament
      include: {
        model: Temperament, // esto hace la relacion para que me traiga el perro con el temperamento, y le pido el nombre del temperamento
        attributes: ["name"], // y de este modelo temperameno traeme el nombre
        through: {
          attributes: [],
        },
      },
    });
    const newDb = dogsDb.map((e) => {
      // hay que hacerle un map a los creados en la base de datos
      return {
        // antes de concatenar ambos datos de la api y de la DATABASE
        id: e.id, // e= DataValue
        image: e.image,
        name: e.name,
        heightMin: parseInt(e.heightMin),
        heightMax: parseInt(e.heightMax),          // aca es donde yo puedo cambiarle en el front algun detalle determinado
        weightMin: parseInt(e.weightMin),
        weightMax:parseInt(e.weightMax),
        breeds: e.breeds,
        life_span: e.life_span + " years",
        createdInDb: e.createdInDb,
        temperament: e.temperaments.map((cur) => cur.name),
      };
    });
    return newDb;
  } catch (error) {
    console.log(error);
  }
};

const getAll = async () => {
  try {
    const api = await getFromApi(); // me concateno toda la info de la api y de la base de datos
    const db = await getFromDB();
    const all = api.concat(db);

    return all;
  } catch (error) {
    console.log(error);
  }
};

const deleteDog = async (id) => {
  try {
    const deleteDg = await Dog.findByPk(id); // trato de encotnrar en dog el perro por el id
    if (deleteDg) {
      await deleteDg.destroy({ where: { id: id } }); // si lo encuentra que lo destruya
    }
  } catch (error) {
    console.log(error);
  }
};

router.get("/dogs", async (req, res) => {
  const allDog = await getAll(); // primero busco en toda la info concatenada
  const { name } = req.query; // el nombre en este caso puede ser cualquier otro que me llege de la api
  //como por ejemplo: life_span , heightMin , image
  try {
    if (name) {
      let dogName = await allDog.filter(// busca en getAll si encuentra el perro con ese nombre, lo filtra
        (e) => e.name.toLowerCase().includes(name.toLowerCase()) //si hay un nombre, filtralos y transforma mayusc por minusc
      ); //   e.name es cada elemento de getAll,  name es lo que recibo por query
      dogName //encontraste un nombre?
        ? res.status(200).send(dogName) // mostralo
        : res.status(404).send("Name not found"); // y sino..
    } else {
      res.status(200).send(allDog); //sino hay name (pasado por query), envia todos los dogs
    }
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
    console.log(id);
    res.status(200).send("Dog Deleted");
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
    // console.log(tempMapeo)
    const tempEspacios = await tempMapeo.map((e) => e.trim()); //elimino los espacios en blanco
    // console.log(tempEspacios)
    const temperament = [...new Set(tempEspacios)]; //con el constructor Set creo un objeto donde guardo los valores
    console.log(temperament)

    temperament.forEach(async (e) => {   //para cada uno entra al modelo temperament y hace un findOrCreate   
      if (e) {
        await Temperament.findOrCreate({   //es un metodo de Sequelize para chequear si un elemento existe en la DB y sino lo crea
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
router.post("/dogs", async (req, res) => {
  const {
    name,
    heightMin,
    heightMax,           // esto me va a llegar por body
    weightMin,
    weightMax,
    breeds,
    life_span,
    image,
    createdInDb,
    temperament,
  } = req.body;
  try {
   
    if (name) {
      const newDog = await Dog.create({  // aca creo el perro con todo esto
        name,
        heightMin,
        heightMax,
        weightMin,
        weightMax,
        breeds,
        life_span,
        image,
        createdInDb,
      });
      const createdDb = await Temperament.findAll({  // se lo paso aparte porque tengo que hacer la relacion aparte
        where: { name: temperament },   // lo tengo que buscar en el modelo que tiene todas los temperamentos
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
// router.put("/dogs", async (req, res)=>{
  // const id =req.params.id
//   const {
//     name,
//     heightMin,
//     heightMax,
//     weightMin,
//     weightMax,
//     breeds,
//     life_span,
//     image,
//     createdInDb,
//     temperament,
//   } = req.body;
//   try {
//     if (name) {
//       const newDog = await Dog.update({
//         name,
//         heightMin,
//         heightMax,
//         weightMin,
//         weightMax,
//         breeds,
//         life_span,
//         image,
//         createdInDb,
//       });
//       const createdDb = await Temperament.findAll({
//         where: { name: temperament },
//       });
//       console.log(name);
//       newDog.addTemperament(createdDb);
//       return res.status(200).send("Dog Update");
//     } else {
//       return res.status(404).send("Dog Not Update");
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }
// );

module.exports = router;

// // heightmax:
// //         e.height.metric &&
// //         e.height.metric.split(" - ").filter((e) => Number(e)).length > 1
// //           ? e.height.metric.split(" - ").filter((e) => Number(e))[1]
// //           : e.height.metric &&
// //             e.height.metric.split(" - ").filter((e) => Number(e)).length === 1
// //           ? e.height.metric.split(" - ").filter((e) => Number(e))[0]
// //           : !e.height.metric &&
// //             e.height.imperial.split(" - ").filter((e) => Number(e)).length > 1
// //           ? e.height.imperial.split(" - ").filter((e) => Number(e))[1] * 0.45
// //           : e.height.imperial.split(" - ").filter((e) => Number(e)).length === 1
// //           ? e.height.imperial.split(" - ").filter((e) => Number(e))[0] * 0.45
// //           : "No hay datos",

// //       heightmin:
// //         e.height.metric &&
// //         e.height.metric.split(" - ").filter((e) => Number(e)).length > 1
// //           ? e.height.metric.split(" - ").filter((e) => Number(e))[0]
// //           : e.height.imperial &&
// //             e.height.imperial.split(" - ").filter((e) => Number(e)).length > 1
// //           ? e.height.imperial.split(" - ").filter((e) => Number(e))[0] * 0.45
// //           : "No hay datos",

// //       weightmin:
// //         e.weight.metric &&
// //         e.weight.metric.split(" - ").filter((e) => Number(e)).length > 1
// //           ? e.weight.metric.split(" - ")[0]
// //           : e.weight.imperial &&
// //             e.weight.imperial.split(" - ").filter((e) => Number(e)).length > 1
// //           ? Math.round(
// //               e.weight.imperial.split(" - ").filter((e) => Number(e))[1] * 0.45
// //             ).toString()
// //           : "No hay datos",

// //       weightmax:
// //         e.weight.metric &&
// //         e.weight.metric.split(" - ").filter((e) => Number(e)).length > 1
// //           ? e.weight.metric.split(" - ").filter((e) => Number(e))[1]
// //           : e.weight.metric &&
// //             e.weight.metric.split(" - ").filter((e) => Number(e)).length === 1
// //           ? e.weight.metric.split(" - ").filter((e) => Number(e))[0]
// //           : !e.weight.metric &&
// //             e.weight.imperial.split(" - ").filter((e) => Number(e)).length > 1
// //           ? e.weight.imperial.split(" - ").filter((e) => Number(e))[1] * 0.45
// //           : e.weight.imperial.split(" - ").filter((e) => Number(e)).length === 1
// //           ? e.weight.imperial.split(" - ").filter((e) => Number(e))[0] * 0.45
// //           : "No hay datos",