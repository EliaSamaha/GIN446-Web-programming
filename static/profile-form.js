const form = document.querySelector("form");
form.addEventListener("submit", function(event) {
    event.preventDefault();
   if (!form.checkValidity()) {
    form.reportValidity();
    return;
}
const stdId= document.getElementById("stdId").value;
const name= document.getElementById("name").value;
const email= document.getElementById("email").value;
const telnum= document.getElementById("telnum").value;
const dob= document.getElementById("dob").value;
const glink= document.getElementById("glink").value;
const rlink= document.getElementById("rlink").value;

const major= document.getElementById("major").value;
const gpa= document.getElementById("gpa").value;
const credits= document.getElementById("credits").value;
const graduation = document.querySelector('input[name="graduation"]:checked')?.value;
const month= document.getElementById("month").value;
const answer= document.getElementById("answer").value;