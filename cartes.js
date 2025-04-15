const API_KEY = "2383fa59cc794be199d1de67f45cd131";
    const SERVICE_ID = "service_uvgjp16";
    const TEMPLATE_ID = "template_87ljy3k";
    const USER_ID = "zRksb8uQChj8ZGIYO";

    emailjs.init(USER_ID);

    var carte = L.map("carte").setView([0, 0], 2);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors"
    }).addTo(carte);

    let latitude = null, longitude = null, rue = "Inconnue", quartier = "Inconnu", ville = "Inconnue", marker = null;

    document.querySelector(".btn-reperer").addEventListener("click", function () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async function (position) {
          latitude = position.coords.latitude;
          longitude = position.coords.longitude;
          carte.setView([latitude, longitude], 15);

          if (marker) {
            marker.setLatLng([latitude, longitude]);
          } else {
            marker = L.marker([latitude, longitude]).addTo(carte);
          }

          alert("Position repérée avec succès !");

          try {
            const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${API_KEY}&language=fr`);
            const data = await response.json();

            if (data.results.length > 0) {
              const result = data.results[0].components;
              rue = result.road || "Inconnue";
              quartier = result.suburb || result.neighbourhood || "Inconnu";
              ville = result.city || result.town || result.village || "Inconnue";
            }

            console.log({ rue, quartier, ville });
          } catch (e) {
            console.error("Erreur OpenCage :", e);
          }

        }, function (error) {
          alert("Erreur de géolocalisation : " + error.message);
        });
      } else {
        alert("La géolocalisation n'est pas supportée.");
      }
    });

    document.querySelector(".btn-envoyer").addEventListener("click", function () {
      if (latitude === null || longitude === null) {
        alert("❌ Veuillez d'abord repérer votre position !");
        return;
      }

      const emailParams = {
        rue: rue,
        quartier: quartier,
        ville: ville,
        latitude: latitude,
        longitude: longitude,
        description: "Problème d'ordures dans les environs."
      };

      console.log("Données envoyées :", emailParams);

      emailjs.send(SERVICE_ID, TEMPLATE_ID, emailParams)
        .then(function () {
          alert(`✅ Signalement envoyé !

📍 Position :
- Latitude : ${latitude}
- Longitude : ${longitude}
- Adresse : ${rue}, ${quartier}, ${ville}`);
        })
        .catch(function (error) {
          alert("❌ Erreur lors de l'envoi : " + JSON.stringify(error));
        });
    });