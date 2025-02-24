const apiUrl = 'http://localhost:3000/api/donations';

// Handle donation form submission
const donationForm = document.getElementById('donationForm');
if (donationForm) {
  donationForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const donation = {
      donorName: document.getElementById('donorName').value.trim(),
      foodType: document.getElementById('foodType').value.trim(),
      quantity: parseInt(document.getElementById('quantity').value),
      contact: document.getElementById('contact').value.trim(),
      expiryTime: parseInt(document.getElementById('expiryTime').value)
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(donation)
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        window.location.href = 'view.html';
      } else {
        alert('Failed to register donation.');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('An error occurred while registering.');
    }
  });
}

// Handle update donation form submission
const updateForm = document.getElementById('updateForm');
if (updateForm) {
  updateForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const donationId = document.getElementById('donationId').value.trim();
    const donation = {
      donorName: document.getElementById('donorName').value.trim(),
      foodType: document.getElementById('foodType').value.trim(),
      quantity: parseInt(document.getElementById('quantity').value),
      contact: document.getElementById('contact').value.trim(),
      expiryTime: parseInt(document.getElementById('expiryTime').value)
    };

    try {
      const response = await fetch(`${apiUrl}/${donationId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(donation)
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        window.location.href = 'view.html';
      } else {
        alert('Failed to update donation.');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('An error occurred while updating.');
    }
  });
}

// Handle delete donation form submission
const deleteForm = document.getElementById('deleteForm');
if (deleteForm) {
  deleteForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const donationId = document.getElementById('donationId').value.trim();

    if (!donationId) {
      alert('Please provide a valid Donation ID.');
      return;
    }

    if (confirm('Are you sure you want to delete this donation?')) {
      try {
        const response = await fetch(`${apiUrl}/${donationId}`, {
          method: 'DELETE'
        });
        const data = await response.json();

        if (response.ok) {
          alert(data.message);
          window.location.href = 'view.html';
        } else {
          alert('Failed to delete donation.');
        }
      } catch (err) {
        console.error('Error:', err);
        alert('An error occurred while deleting.');
      }
    }
  });
}

// Load and display donations with delete buttons
const donationList = document.getElementById('donationList');
if (donationList) {
  fetch(apiUrl)
    .then(res => res.json())
    .then(donations => {
      donationList.innerHTML = donations.length === 0
        ? '<p>No donations yet. Start making a difference today!</p>'
        : donations.map(donation => `
          <div class="donation-card">
            <strong>ID:</strong> ${donation._id}<br>
            <strong>Donor:</strong> ${donation.donorName}<br>
            <strong>Food:</strong> ${donation.foodType}<br>
            <strong>Quantity:</strong> ${donation.quantity} servings<br>
            <strong>Contact:</strong> ${donation.contact}<br>
            <strong>Expires in:</strong> ${donation.expiryTime} hours<br>
            <strong>Reward Points:</strong> ${donation.rewardPoints}<br>
            <button onclick="deleteDonation('${donation._id}')">Delete</button>
          </div>
        `).join('');
    })
    .catch(err => {
      console.error('Error loading donations:', err);
      donationList.innerHTML = '<p>Error loading donations.</p>';
    });
}

// Delete donation directly from view page
function deleteDonation(donationId) {
  if (confirm('Are you sure you want to delete this donation?')) {
    fetch(`${apiUrl}/${donationId}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(data => {
        alert(data.message);
        location.reload();
      })
      .catch(err => {
        console.error('Error deleting donation:', err);
        alert('Error deleting donation.');
      });
  }
}

// Load and display rewards
const totalPointsElement = document.getElementById('totalPoints');
if (totalPointsElement) {
  fetch(apiUrl + '/rewards/total')
    .then(res => res.json())
    .then(data => {
      totalPointsElement.textContent = `Total Reward Points: ${data.totalPoints}`;
    })
    .catch(err => {
      console.error('Error loading rewards:', err);
      totalPointsElement.textContent = 'Error loading reward points.';
    });
}