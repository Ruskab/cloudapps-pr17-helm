let socket = new WebSocket("ws://" + window.location.host + "/eoloplants");
let userKey;

socket.onmessage = function (event) {
  console.log(`[message] Data received from server: ${event.data}`);
  const data = JSON.parse(event.data);
  if (data['user-key']) {
    userKey = data['user-key'];
    console.log('user-key', data['user-key'])
    return;
  }
  if (data.completed) {
    document.querySelector('#generate').disabled = false;
    createOrUpdatePlanView(data);
    return;
  } else {
    createOrUpdatePlanView({ ...data, planning: '...' });
  }

};

socket.onopen = function (event) {
  console.log(`[onconnect] event received from server:`, event);
};

socket.onclose = function (event) {
  if (event.wasClean) {
    console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
  } else {
    console.log('[close] Connection died');
  }
};

socket.onerror = function (error) {
  console.log(`[error] ${error.message}`);
};

// Plant management functions
async function createPlant() {

  const city = document.querySelector('#city').value;

  disableCreationButton();

  const query = `mutation($eoloPlant: EoloPlantInput) {
    createEoloPlant(eoloPlant: $eoloPlant) {
      id
      city
    }
  }`;

  const response = await graphql(query, { eoloPlant: { city: city, userId: userKey }});
  console.log(response);
  const plant = await response.data.createEoloPlant;

  console.log(JSON.stringify(plant));

  createPlantView(plant);

  enableCreationButton();

}

async function getAllPlants() {

  const query = `query {
    eoloPlants {
      id
      city
      planning
      progress
      completed
    }
  }`;

  const response = await graphql(query);

  const plants = response.data.eoloPlants;
  plants.map(createPlantView);
}

function deletePlant(id) {

  const query = `mutation($id: ID!) {
    deleteEoloPlant(id: $id) {
      id
      city
      planning
      progress
      completed
    }
  }`;

  graphql(query, { id });

  deletePlantView(id);
}

async function graphql(request, variables) {
  const response = await fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'user-key': userKey,
    },
    body: JSON.stringify({ query: request, variables })
  });

  return await response.json();
}



// Plant View functions

function disableCreationButton() {
  document.querySelector('#generate').style.display = 'none';
  document.querySelector('#creationSpinner').style.display = 'block';
}

function enableCreationButton() {
  document.querySelector('#generate').style.display = 'block';
  document.querySelector('#creationSpinner').style.display = 'none';
}

function createPlantView(plant) {
  const htmlContent = `<div id="plant-${plant.id}" class="col"></div>`;
  const current = document.querySelector('#plants').innerHTML;
  document.querySelector('#plants').innerHTML = htmlContent + current;
  document.querySelector('#plants-title').style.display = 'block';
  createOrUpdatePlanView(plant);
}

function deletePlantView(id) {
  const elem = document.querySelector('#plant-' + id);
  elem.parentNode.removeChild(elem);

  if (document.querySelector('#plants').childElementCount === 0) {
    document.querySelector('#plants-title').style.display = 'none';
  }
}

function createOrUpdatePlanView(plant) {
  const plantElement = document.querySelector('#plant-' + plant.id);
  if (!plantElement) {
    createPlantView(plant);
  } else {

    const htmlContent = `
    <div class="card mb-4 shadow-sm">
      <div class="card-header">
        <h4 class="my-0 fw-normal">${plant.city}</h4>
      </div>
      <div class="card-body px-2">
        <ul class="list-unstyled mt-3 mb-4">
          <li class="weather">Planning: ${plant.planning}</li>
        </ul>
        <div class="d-flex align-items-center">
          <div class="progress flex-grow-1 m-2">
              <div class="progress-bar ${plant.completed ? 'bg-success' : ''}" role="progressbar" style="width: ${plant.progress || 0}%;" aria-valuemin="0" aria-valuemax="100">${plant.created ? 'created!' : plant.progress || 0}%</div>
          </div>
          <button type="button" onClick="deletePlant(${plant.id})" class="btn btn-danger btn-sm ${!plant.completed ? 'd-none' : ''}"><i class="fas fa-trash-alt"></i></button>
        </div>
      </div>
    </div>
  `;

    document.querySelector('#plant-' + plant.id).innerHTML = htmlContent;
  }
}

// -------------

getAllPlants();