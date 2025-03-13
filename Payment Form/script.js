document.addEventListener("DOMContentLoaded", function () {
    let paymentMethods = document.querySelectorAll('input[name="payment"]');

    function updatePaymentFields() {
        let selectedPayment = document.querySelector('input[name="payment"]:checked').value;
        let cardDetails = document.getElementById("card_details");
        let upiDetails = document.getElementById("upi_details");

        if (selectedPayment === "credit" || selectedPayment === "debit") {
            cardDetails.style.display = "block";
            upiDetails.style.display = "none";
        } else {
            cardDetails.style.display = "none";
            upiDetails.style.display = "block";
        }
    }

    // Add event listeners to all radio buttons
    paymentMethods.forEach(payment => {
        payment.addEventListener("change", updatePaymentFields);
    });

    // Initialize the form with the correct payment method displayed
    updatePaymentFields();
});
