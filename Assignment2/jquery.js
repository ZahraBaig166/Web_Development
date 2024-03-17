
    $(document).ready(function() {
        const contactForm = $('#contactForm');
        const errorMessage = $('.errormsg');

        contactForm.on('submit', function(event) {
            event.preventDefault();

            errorMessage.text('');
            resetFormStyles();

            const fullName = $('#fullName').val().trim();
            const gender = $('#gender').val();
            const phoneNumber = $('#phoneNumber').val().trim();
            const email = $('#email').val().trim();
            const subject = $('#subject').val().trim();
            const message = $('#message').val().trim();

            const emptyFields = [];

            if (!fullName) emptyFields.push($('#fullName'));
            if (!gender) emptyFields.push($('#gender'));
            if (!phoneNumber) emptyFields.push($('#phoneNumber'));
            if (!email) emptyFields.push($('#email'));
            if (!subject) emptyFields.push($('#subject'));
            if (!message) emptyFields.push($('#message'));

            if (emptyFields.length > 0) {
                errorMessage.text('Please fill in all fields.');
                displayErrorStyles(emptyFields);
                return;
            }

            errorMessage.text('Message sent successfully.');
            errorMessage.css('color', 'green');
        });

        function resetFormStyles() {
            $('.form-control').css('border', '1.5px solid #c7c7c7');
        }

        function displayErrorStyles(fields) {
            fields.forEach(field => {
                field.css('border', '1.5px solid red');
            });
        }
    });
