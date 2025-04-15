emailjs.init("zRksb8uQChj8ZGIYO"); // Remplacez par votre User ID EmailJS

    document.getElementById("candidatureForm").addEventListener("submit", function(event) {
        event.preventDefault();

        // Vérification des champs
        let inputs = document.querySelectorAll("#candidatureForm input, #candidatureForm select, #candidatureForm textarea");
        for (let input of inputs) {
            if (!input.value.trim()) {
                alert("Veuillez remplir tous les champs.");
                return;
            }
        }

        // Préparer les données
        let params = {
            nom: document.getElementById("nom").value,
            prenom: document.getElementById("prenom").value,
            date_naissance: document.getElementById("date-naissance").value,
            adresse: document.getElementById("adresse").value,
            telephone: document.getElementById("telephone").value,
            email: document.getElementById("email").value,
            ville: document.getElementById("ville").value,
            poste: document.getElementById("poste").value,
            formation: document.getElementById("formation").value,
            experience: document.getElementById("experience").value
        };

        // Envoyer l'email via EmailJS
        emailjs.send("service_zj0pbx8", "template_60mqlee", params)
            .then(function(response) {
                alert("Votre candidature a été envoyée avec succès !");
                
                // Réinitialisation des champs après 500ms
                setTimeout(() => {
                    document.getElementById("candidatureForm").reset();
                }, 500);
            }, function(error) {
                alert("Erreur lors de l'envoi du mail. Veuillez réessayer.");
                console.error("EmailJS Error:", error);
            });
    });