const toggleData = document.getElementById('toggleData');

fetch('cse341-project1-112u.onrender.com/contacts')
  .then(response => response.json())
  .then(data => {
    const contactsList = document.getElementById('contactsList');
    data.forEach(contact => {
      const listItem = document.createElement('li');
      const updateListItem = () => {
        if (toggleData.checked) {
          listItem.innerHTML = `
            <strong>${contact.firstName} ${contact.lastName}</strong><br>
            Email: ${contact.email}<br>
            Favorite Color: ${contact.favoriteColor}<br>
            Birthday: ${contact.birthday}
          `;
        } else {
          listItem.innerHTML = `
            <strong>${contact.firstName} ${contact.lastName}</strong><br>
            Email: ${contact.email}
          `;
        }
      };
      updateListItem();
      toggleData.addEventListener('change', updateListItem);
      listItem.addEventListener('click', () => {
        fetch(`cse341-project1-112u.onrender.com/contacts/${contact._id}`)
          .then(response => response.json())
          .then(individualContact => {
            const individualContactDiv = document.getElementById('individualContact');
            individualContactDiv.innerHTML = `
              <h2>${individualContact.firstName} ${individualContact.lastName}</h2>
              <p>Email: ${individualContact.email}</p>
              <p>Favorite Color: ${individualContact.favoriteColor}</p>
              <p>Birthday: ${individualContact.birthday}</p>
            `;
          });
      });
      contactsList.appendChild(listItem);
    });
  });