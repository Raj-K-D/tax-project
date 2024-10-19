document.getElementById('itrForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    // Create a FormData object
    const formData = new FormData(this);

    // Create an object to store form data
    const formObject = {};

    // Convert form data into an object
    formData.forEach((value, key) => {
        if (key in formObject) {
            if (Array.isArray(formObject[key])) {
                formObject[key].push(value);
            } else {
                formObject[key] = [formObject[key], value];
            }
        } else {
            formObject[key] = value;
        }
    });

    // Convert object to JSON
    const jsonString = JSON.stringify(formObject, null, 4);

    // Display JSON on the page
    document.getElementById('jsonData').textContent = jsonString;

    // Trigger JSON download
    downloadJSON(jsonString, 'itr_form_data.json');
});

function downloadJSON(jsonString, filename) {
    // Create a Blob from the JSON string
    const blob = new Blob([jsonString], { type: 'application/json' });

    // Create a temporary anchor element
    const link = document.createElement('a');

    // Create a URL for the Blob and set it as the href attribute of the link
    link.href = URL.createObjectURL(blob);
    link.download = filename;

    // Append the link to the document
    document.body.appendChild(link);

    // Programmatically click the link to trigger the download
    link.click();

    // Remove the link from the document
    document.body.removeChild(link);
}
