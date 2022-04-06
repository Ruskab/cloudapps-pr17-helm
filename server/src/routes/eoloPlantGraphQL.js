import * as plantService from "../services/eoloPlantService.js";

async function eoloPlants() {
  console.log("All plants")
  const plants = await plantService.getAllPlants();
  console.log(toDTO(plants));
  return toDTO(plants);
};

async function eoloPlant({ id }) {
  const plant = await plantService.getEoloPlantById(id);
  return toDTO(plant);
};

async function createEoloPlant({ eoloPlant }) {
  const plant = await plantService.createEoloPlant({ city: eoloPlant.city }, eoloPlant.userId);
  console.log(toDTO(plant));
  return toDTO(plant);

};

async function deleteEoloPlant({ id }) {
  const plant = await plantService.removeEoloPlantById(id);
  return toDTO(plant);
};

function toDTO(model) {
  if (model === null) {
    return null;
  }
  if (model instanceof Array) {
    return model.map(elem => toDTO(elem));
  } else {
    return model.get({ plain: true });
  }
}

export default {
  eoloPlants,
  eoloPlant,
  createEoloPlant,
  deleteEoloPlant
};

