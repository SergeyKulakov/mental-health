export function stripeCheckoutRedirectHTML(publicKey, sessionId) {
  return `
  <html>
  <script src="https://js.stripe.com/v3"></script>

  <h1>Loading...</h1>
  <h1><div id="error-message"></div></h1>
  <script>
    try {
      var stripe = Stripe('${publicKey}');}
    catch(e) {
      var displayError = document.getElementById('error-message');
      displayError.textContent = e.message;
    }
    stripe.redirectToCheckout({
       sessionId: '${sessionId}'
    })
    .then(function (result) {
       if (result.error) {
          var displayError = document.getElementById('error-message');
          displayError.textContent = result.error.message;
       }
    });
  </script>
</html>
  `;
}
