import { sentToUser, sentToAllUsers } from '../ws.js';
import { EoloPlant } from '../models/EoloPlant.js';
import { sendRequestToPlanner } from "../clients/plannerClient.js";

import DebugLib from 'debug';

const debug = new DebugLib('server:eoloplantService');

const usersByPlantId = new Map();

export async function getAllPlants() {
    return EoloPlant.findAll();
}

export async function getEoloPlantById(id) {
    return await EoloPlant.findOne({ where: { id } });
}

export async function removeEoloPlantById(id) {
    const plant = await getEoloPlantById(id);
    if (plant !== null) {
        plant.destroy();
    }
    return plant;
}

export async function createEoloPlant(eoloplantCreationRequest, userId) {

    debug('createEoloplant', eoloplantCreationRequest, userId);

    console.log(`UserId: ${userId}`);
    console.log(`eolorequest: ${eoloplantCreationRequest}`);
    const eoloplant = EoloPlant.build(eoloplantCreationRequest);
    console.log(`eoloplant built: ${eoloplant}`);
    await eoloplant.save();

    console.log("Saved");
    usersByPlantId.set(eoloplant.id, userId);

    sendRequestToPlanner({ id: eoloplant.id, city: eoloplant.city });

    return eoloplant;
}

export async function updateEoloPlant(eoloplant) {

    debug('updateEoloplant', eoloplant);

    await EoloPlant.update(eoloplant, { where: { id: eoloplant.id } });

    const updatedEoloplant = await getEoloPlantById(eoloplant.id);

    notifyUsers(updatedEoloplant);
}

export function notifyUsers(eoloplant) {

    if (eoloplant.completed) {
        sentToAllUsers(eoloplant);
    } else {
        sentToUser(usersByPlantId.get(eoloplant.id), eoloplant);
    }
}

