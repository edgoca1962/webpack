document.addEventListener('DOMContentLoaded', () => {
   if (typeof paypal === 'undefined' || typeof wpfrwPayPal === 'undefined') {
      console.error('PayPal SDK or configuration missing');
      return;
   }

   const buttonContainer = document.getElementById('paypal-button-container');
   const processingElement = document.getElementById('paypal-processing');
   const amountElement = document.querySelector('.paypal-amount');
   const descriptionElement = document.querySelector('.paypal-description');
   const itemNameElement = document.querySelector('.paypal-item-name');

   if (!buttonContainer) return;

   const amount = amountElement?.value || '0.00';
   const description = descriptionElement?.value || '';
   const itemName = itemNameElement?.value || 'Purchase';

   paypal.Buttons({
      style: {
         layout: 'vertical',
         color: 'gold',
         shape: 'rect'
      },

      createOrder: (data, actions) => {
         return actions.order.create({
            purchase_units: [{
               amount: {
                  value: amount,
                  currency_code: wpfrwPayPal.currency
               },
               description: description,
               items: [{
                  name: itemName,
                  unit_amount: {
                     value: amount,
                     currency_code: wpfrwPayPal.currency
                  },
                  quantity: '1'
               }]
            }]
         });
      },

      onApprove: async (data) => {
         if (buttonContainer) buttonContainer.style.display = 'none';
         if (processingElement) processingElement.style.display = 'block';

         try {
            const response = await fetch(wpfrwPayPal.ajax_url, {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
               },
               body: new URLSearchParams({
                  action: 'process_paypal_payment',
                  order_id: data.orderID,
                  nonce: wpfrwPayPal.nonce
               })
            });

            const result = await response.json();

            if (result.success) {
               window.location.href = result.data.redirect;
            } else {
               throw new Error(result.data?.message || 'Payment failed');
            }
         } catch (error) {
            console.error('Error:', error);
            alert(error.message);
            window.location.href = wpfrwPayPal.cancel_url;
         }
      },

      onError: (err) => {
         console.error('PayPal error:', err);
         alert('Payment error occurred');
      }
   }).render('#paypal-button-container');
});