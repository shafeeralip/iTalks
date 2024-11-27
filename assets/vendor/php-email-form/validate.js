
const form = document.getElementById("contactForm");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const thisForm = form; // Reference to the form
  const formData = {
    name: form.name.value,
    email: form.email.value,
    contact: form.contact.value,
    message: form.message.value,
  };

  // Show the loading indicator
  thisForm.querySelector(".loading").classList.add("d-block");
  thisForm.querySelector(".error-message").classList.remove("d-block");
  thisForm.querySelector('.sent-message').classList.remove('d-block');

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbw6yRT8h8JxwfqwcUzNurK24XB2_g8j1x-WXLJxef-xF6U_o6beo5c-5jFKPO43Oy4fvw/exec", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    const result = await response.text();

    // Hide the loading indicator
    thisForm.querySelector(".loading").classList.remove("d-block");

    if (response.ok) {
      thisForm.querySelector('.sent-message').classList.add('d-block');
      alert(" Your message has been sent. Thank you!"); // Show success message
    } else {
      throw new Error(result);
    }
  } catch (error) {
    // Hide the loading indicator
    thisForm.querySelector(".loading").classList.remove("d-block");

    // Display error message
    thisForm.querySelector(".error-message").innerHTML = error.message;
    thisForm.querySelector(".error-message").classList.add("d-block");
  }
});


// */
// (function () {
//   "use strict";

//   let forms = document.querySelectorAll('.php-email-form');

//   forms.forEach( function(e) {
//     e.addEventListener('submit', function(event) {
//       event.preventDefault();

//       let thisForm = this;

//       let action = thisForm.getAttribute('action');
//       let recaptcha = thisForm.getAttribute('data-recaptcha-site-key');
      
//       if( ! action ) {
//         displayError(thisForm, 'The form action property is not set!');
//         return;
//       }
//       thisForm.querySelector('.loading').classList.add('d-block');
//       thisForm.querySelector('.error-message').classList.remove('d-block');
//       thisForm.querySelector('.sent-message').classList.remove('d-block');

//       let formData = new FormData( thisForm );

//       if ( recaptcha ) {
//         if(typeof grecaptcha !== "undefined" ) {
//           grecaptcha.ready(function() {
//             try {
//               grecaptcha.execute(recaptcha, {action: 'php_email_form_submit'})
//               .then(token => {
//                 formData.set('recaptcha-response', token);
//                 php_email_form_submit(thisForm, action, formData);
//               })
//             } catch(error) {
//               displayError(thisForm, error);
//             }
//           });
//         } else {
//           displayError(thisForm, 'The reCaptcha javascript API url is not loaded!')
//         }
//       } else {
//         php_email_form_submit(thisForm, action, formData);
//       }
//     });
//   });

//   function php_email_form_submit(thisForm, action, formData) {
//     fetch(action, {
//       method: 'POST',
//       body: formData,
//       headers: {'X-Requested-With': 'XMLHttpRequest'}
//     })
//     .then(response => {
//       if( response.ok ) {
//         return response.text();
//       } else {
//         throw new Error(`${response.status} ${response.statusText} ${response.url}`); 
//       }
//     })
//     .then(data => {
//       thisForm.querySelector('.loading').classList.remove('d-block');
//       if (data.trim() == 'OK') {
//         thisForm.querySelector('.sent-message').classList.add('d-block');
//         thisForm.reset(); 
//       } else {
//         throw new Error(data ? data : 'Form submission failed and no error message returned from: ' + action); 
//       }
//     })
//     .catch((error) => {
//       displayError(thisForm, error);
//     });
//   }

//   function displayError(thisForm, error) {
//     thisForm.querySelector('.loading').classList.remove('d-block');
//     thisForm.querySelector('.error-message').innerHTML = error;
//     thisForm.querySelector('.error-message').classList.add('d-block');
//   }

// })();
