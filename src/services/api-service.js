const BASE_URL = "http://localhost:3001/api/clockins";



function fetchInfo(userId) {
  return fetch(BASE_URL + '?uid=' + userId).then(res => res.json());
}


function deleteInfo(infoId) {
  return fetch(BASE_URL + '/' + infoId, {
    method: 'DELETE'
  }).then(res => res.json());
}

function createInfo(data, uid) {
  return fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-type': 'Application/json'
    },
    body: JSON.stringify({
      ...data,
      uid
    })
  }).then(res => res.json());
}

function updateInfo({employeeID, managerID, timePunch,  _id }) {
  return fetch(`${BASE_URL}/${_id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'Application/json'
    },
    body: JSON.stringify({
      employeeID,
        managerID,
        timePunch,
        _id 
    })
  }).then(res => res.json());
}

export {
  fetchInfo,
  deleteInfo,
  createInfo,
  updateInfo,
};
