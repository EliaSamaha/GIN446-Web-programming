const form = document.querySelector("form");

form.addEventListener("submit", function(event) {
    event.preventDefault();
    
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    const stdId = document.getElementById("stdId").value;
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const telnum = document.getElementById("telnum").value;
    const dob = document.getElementById("dob").value;
    const glink = document.getElementById("glink").value;
    const rlink = document.getElementById("rlink").value;

    const major = document.getElementById("major").value;
    const gpa = document.getElementById("gpa").value;
    const credits = document.getElementById("credits").value;
    const graduation = document.querySelector('input[name="graduation"]:checked')?.value;
    const month = document.getElementById("month").value;
    const answer = document.getElementById("answer").value;
    const skills = [...document.querySelectorAll('input[name="skills"]:checked')].map(s => s.value); 
    const Lang = document.getElementById("Lang").value;
    const soft = [...document.getElementById("soft").selectedOptions].map(option => option.value); 
    const title = document.getElementById("title").value;
    const area = document.getElementById("area").value;
    const desc = document.getElementById("desc").value;
    const size = document.getElementById("size").value;
    const Dashboard = document.getElementById("Dashboard").value;
    const MeetingDate = document.getElementById("MeetingDate").value;
    const MeetingTime = document.getElementById("MeetingTime").value;
    const Confirmation = document.getElementById("Confirmation").checked;

   
    const reviewP = document.createElement("div");
    reviewP.className = "review-panel";
    
    const Title = document.createElement("h2");
    Title.textContent = "Review Panel";
    reviewP.appendChild(Title);
    
    document.body.appendChild(reviewP);
    form.style.display = "none"; 

    const editB = document.createElement("button"); 
    editB.textContent = "Edit"; 
    reviewP.appendChild(editB);
    editB.addEventListener("click", function() { 
        form.style.display = "";
        reviewP.remove(); 
    });

    const confirmB = document.createElement("button");
    confirmB.type = "button";
    confirmB.textContent = "Confirm & Submit";
    reviewP.appendChild(confirmB);
    confirmB.addEventListener("click", function() {
        form.submit(); 
    });

    const stdIdText = document.createElement("p");
    stdIdText.textContent = `Student Id: ${stdId}`;
    reviewP.appendChild(stdIdText);

    const nameText = document.createElement("p");
    nameText.textContent = `Full Name: ${name}`;
    reviewP.appendChild(nameText);

    const emailText = document.createElement("p");
    emailText.textContent = `Email: ${email}`;
    reviewP.appendChild(emailText);

    const telnumText = document.createElement("p");
    telnumText.textContent = `Telephone number: ${telnum}`;
    reviewP.appendChild(telnumText);

    const dobText = document.createElement("p");
    dobText.textContent = `Date of Birth: ${dob}`;
    reviewP.appendChild(dobText);

    const glinkText = document.createElement("p");
    glinkText.textContent = `GitHub: ${glink}`;
    reviewP.appendChild(glinkText);

    const rlinkText = document.createElement("p");
    rlinkText.textContent = `Render URL: ${rlink}`;
    reviewP.appendChild(rlinkText);

    const majorText = document.createElement("p");
    majorText.textContent = `Engineering Major: ${major}`;
    reviewP.appendChild(majorText);

    const gpaText = document.createElement("p");
    gpaText.textContent = `GPA: ${gpa}`;
    reviewP.appendChild(gpaText);

    const creditsText = document.createElement("p");
    creditsText.textContent = `Credits Completed: ${credits}`;
    reviewP.appendChild(creditsText);

    const graduationText = document.createElement("p");
    graduationText.textContent = `Graduation semester: ${graduation}`;
    reviewP.appendChild(graduationText);

    const monthText = document.createElement("p");
    monthText.textContent = `Graduation Month: ${month}`;
    reviewP.appendChild(monthText);

    const answerText = document.createElement("p");
    answerText.textContent = `Did you do an internship?: ${answer}`;
    reviewP.appendChild(answerText);

    const skillsText = document.createElement("p");
    skillsText.textContent = `Technical Skills: ${skills.join(", ")}`; 
    reviewP.appendChild(skillsText);

    const LangText = document.createElement("p");
    LangText.textContent = `Main programming Language: ${Lang}`;
    reviewP.appendChild(LangText);

    const softText = document.createElement("p");
    softText.textContent = `Engineering Software Used: ${soft.join(", ")}`;
    reviewP.appendChild(softText);

    const titleText = document.createElement("p");
    titleText.textContent = `Proposed Project Title: ${title}`;
    reviewP.appendChild(titleText);

    const areaText = document.createElement("p");
    areaText.textContent = `Preferred Project Area: ${area}`;
    reviewP.appendChild(areaText);

    const descText = document.createElement("p");
    descText.textContent = `Project Description: ${desc}`;
    reviewP.appendChild(descText);

    const sizeText = document.createElement("p");
    sizeText.textContent = `Preferred Team Size: ${size}`;
    reviewP.appendChild(sizeText);

    const DashboardText = document.createElement("p");
    DashboardText.textContent = `Preferred Project Color: ${Dashboard}`;
    reviewP.appendChild(DashboardText);

    const MeetingDateText = document.createElement("p");
    MeetingDateText.textContent = `Preferred Meeting Date: ${MeetingDate}`;
    reviewP.appendChild(MeetingDateText);

    const MeetingTimeText = document.createElement("p");
    MeetingTimeText.textContent = `Preferred Meeting Time: ${MeetingTime}`;
    reviewP.appendChild(MeetingTimeText);

    const ConfirmationText = document.createElement("p");
    ConfirmationText.textContent = `Confirmation: ${Confirmation}`;
    reviewP.appendChild(ConfirmationText);
});