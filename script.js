let orders = [];
const motDePasseAdmin = "admin123";

// Accès sécurisé
function accederEspaceVendeur(event) {
    event.preventDefault();
    let meSaisie = prompt("Entrez votre mot de passe Vendeur WidedSache :");
    if (meSaisie === motDePasseAdmin) {
        document.getElementById('admin-space').style.display = 'block';
        window.location.hash = '#admin-space';
    } else if (meSaisie !== null) {
        alert("Accès refusé : Mot de passe incorrect.");
    }
}

function fermerEspaceVendeur() {
    document.getElementById('admin-space').style.display = 'none';
}

// Enregistrement de commande
document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('clientName').value;
    const phone = document.getElementById('clientPhone').value;
    const size = document.getElementById('bagSize').value;
    const quantity = document.getElementById('quantity').value;

    const newOrder = {
        id: Date.now(),
        name: name,
        phone: phone,
        size: size,
        quantity: quantity,
        status: 'En attente'
    };

    orders.push(newOrder);
    document.getElementById('orderForm').reset();
    alert("Merci ! Votre commande a été enregistrée avec succès chez WidedSache.");

    updateOrdersTable();
});

function updateOrdersTable() {
    const tbody = document.getElementById('ordersTableBody');
    if (orders.length === 0) return;

    tbody.innerHTML = '';
    orders.forEach(order => {
        const tr = document.createElement('tr');
        const statusBadge = order.status === 'Validée' 
            ? '<span class="badge bg-success">Validée</span>' 
            : '<span class="badge bg-warning text-dark">En attente</span>';

        const actionButton = order.status === 'Validée'
            ? '<button class="btn btn-sm btn-secondary" disabled>Validée</button>'
            : `<button class="btn btn-sm btn-primary" onclick="validateOrder(${order.id})">Valider</button>`;

        tr.innerHTML = `
            <td><strong>${order.name}</strong></td>
            <td>${order.phone}</td>
            <td>${order.size}</td>
            <td>${order.quantity} pcs</td>
            <td>${statusBadge}</td>
            <td>${actionButton}</td>
        `;
        tbody.appendChild(tr);
    });
}

function validateOrder(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (order) {
        order.status = 'Validée';
        updateOrdersTable();
    }
}