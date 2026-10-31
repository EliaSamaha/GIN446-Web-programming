import re
from datetime import date
STUDENT_ID = re.compile(r"^\d{9}$")
FULLNAME = re.compile(r"^[A-Za-z][A-Za-z .'\-]{1,79}$")
EMAIL = re.compile(r"^[\w\.-]+@usek\.edu\.lb$")
PHONE = re.compile(r"^\+961\s?\d{2}\s?\d{6}$")
GITHUB = re.compile(r"^https:\/\/github\.com\/[A-Za-z0-9_-]+$")
HTTPS_URL = re.compile(r"^https:\/\/[^\s]+$")
MONTH = re.compile(r"^\d{4}-(?:0[1-9]|1[0-2])$")
TIME = re.compile(r"^([01]\d|2[0-3]):([0-5]\d)$")
HEXCOLOR = re.compile(r"^#[0-9A-Fa-f]{6}$")
MAJORS = {"Telecom", "Electrical", "Computer", "Biomed"}
GRADUATION = {"Spring", "Fall"}
YESNO = {"yes", "no"}
SKILLS={"Programming","Embedded Systems","Network architecture","Communication Systems","Electrical Installation","Artificial Intelligence"}
SOFTWARE ={"MATLAB","LabVIEW","AutoCAD","SolidWorks","Multisim","Altium Designer","CycoPacketTracer","COMSOL Multiphysics"}
PROJECT_AREA ={"Mobile Networks","DSP","DIP","RF","Com","Electronics","Electrical Installation","Power Systems","Embedded Systems","Software Developpment","Machine Learning","Biosignals Analysis","Medical instrumentation design"}
REQUIRED = {"student_id","fullname","email","phone","portfolio","gin446","major","gpa","credits","graduation","language","software","project_title","team_size"}
def validate_profile(form):
    errors={}
    cleaned={}
    for field in REQUIRED: 
        if  form.get(field,"").strip() =="":
            errors[field]="This field is required"
    student_id=form.get("student_id","").strip()
    if student_id != "" and not STUDENT_ID.match(student_id):
        errors["student_id"]="Student ID must be exactly 9 digits"
    cleaned["student_id"]=student_id

    fName=form.get("fullname","").strip()
    if fName != "" and not FULLNAME.match(fName):
        errors["fullname"]="Use letters, spaces, hyphens or apostrophes (2-80 chars)."
    cleaned["fullname"]=fName

    mail=form.get("email","").strip()
    if mail != "" and not EMAIL.match(mail):
        errors["email"]="The email must end in @usek.edu.lb"
    cleaned["email"]=mail

    phone=form.get("phone","").strip()
    if phone != "" and not PHONE.match(phone):
         errors["phone"]="The phone number must be +961 XX XXXXXX"
    cleaned["phone"]=phone

    def parse_date(text):
        try:
            return date.fromisoformat(text)
        except ValueError:
            return None


    birthdate = form.get("birthdate", "").strip()
    if birthdate != "":
        day = parse_date(birthdate)
        if day is None:
            errors["birthdate"] = "Not a valid date."
        elif day > date.today():
            errors["birthdate"] = "Date of birth cannot be in the future."
        else:
            age = (date.today() - day).days // 365
            if age < 15 or age > 100:
                errors["birthdate"] = "Age looks out of range."
    cleaned["birthdate"] = birthdate

    gLink=form.get("portfolio","").strip()
    if gLink != "" and not GITHUB.match(gLink):
        errors["portfolio"]="Invalid github link"
    cleaned["portfolio"]=gLink

    gin446=form.get("gin446","").strip()
    if gin446 != "" and not HTTPS_URL.match(gin446):
        errors["gin446"]="Invalid link"
    cleaned["gin446"]=gin446

    major = form.get("major", "").strip()
    if major != "" and major not in MAJORS:
        errors["major"] = "Choose a valid major."
    cleaned["major"] = major

    def to_number(text):
        try:
            return float(text)
        except ValueError:
            return None

    gpa = form.get("gpa", "").strip()
    if gpa != "":
        number = to_number(gpa)
        if number is None or number < 40 or number > 100:
            errors["gpa"] = "GPA must be a number between 40 and 100."
    cleaned["gpa"] = gpa

    credits = form.get("credits", "").strip()
    if credits != "":
        number = int(credits)
        if number is None or number < 0 or number > 148:
            errors["credits"] = "Number of credits must be between 0 and 148."
    cleaned["credits"] = credits

    graduation = form.get("graduation", "").strip()
    if graduation != "" and graduation not in GRADUATION:
        errors["graduation"] = "Choose a valid graduation date."
    cleaned["graduation"] = graduation

    graduation_month = form.get("graduation_month", "").strip()
    if graduation_month != "":
        if not MONTH.match(graduation_month):
            errors["graduation_month"] = "Use the month picker (YYYY-MM)."
        else:
            current_ym = date.today().strftime("%Y-%m")
            if graduation_month < current_ym:
                errors["graduation_month"] = "Graduation month cannot be in the past."
    cleaned["graduation_month"] = graduation_month

    internship_completed= form.get("internship_completed", "").strip()
    if internship_completed != "" and internship_completed not in YESNO:
        errors["internship_completed"] = "Choose a valid answer."
    cleaned["internship_completed"] = internship_completed

    language = form.get("language", "").strip()
    if len(language) > 40:
        errors["language"] = "Maximum 40 characters."
    cleaned["language"] = language

    skills = form.getlist("skills")
    good_skills = []
    bad_skills = []
    for skill in skills:
        if skill in SKILLS:
            good_skills.append(skill)
        else:
            bad_skills.append(skill)
    if bad_skills:
        errors["skills"] = "Unknown skill(s): " + ", ".join(bad_skills)
    cleaned["skills"] = good_skills

    software = form.getlist("software")
    correct = []
    incorrect = []
    for soft in software:
        if soft in SOFTWARE:
            correct.append(soft)
        else:
            incorrect.append(soft)
    if incorrect:
        errors["software"] = "Unknown software: " + ", ".join(incorrect)
    cleaned["software"] = correct

    project_title = form.get("project_title", "").strip()
    if project_title != "":
        lengh = len(project_title)
        if lengh >120 :
            errors["project_title"] = "Title must be at most 120 character."
    cleaned["project_title"] = project_title

    project_area = form.get("project_area", "").strip()
    if project_area != "" and project_area not in PROJECT_AREA:
        errors["project_area"] = "Choose a valid project area."
    cleaned["project_area"] = project_area

    description = form.get("description", "").strip()
    if description != "":
        if len(description) >1000 :
            errors["description"] = "Do not exceed 1000 character."
    cleaned["description"] = description

    def to_int(value):
   
        try:
            return int(value)
        except (ValueError, TypeError):
            return None


    team_size = form.get("team_size", "").strip()
    if team_size != "":
        number = to_int(team_size)
        if number is None or number < 1 or number > 4:
            errors["team_size"] = "Team size must be a whole number from 1 to 4."
    cleaned["team_size"] = team_size

    project_color = form.get("project_color", "").strip()
    if project_color != "" and not HEXCOLOR.match(project_color):
        errors["project_color"] = "Use a colour like #336699."
    if project_color == "":
        project_color = "#336699"
    cleaned["project_color"] = project_color

    meeting_date = form.get("meeting_date", "").strip()
    if meeting_date != "":
        day = parse_date(meeting_date)
        if day is None:
            errors["meeting_date"] = "Not a valid date."
        elif day < date.today():
            errors["meeting_date"] = "Meeting date cannot be in the past."
    cleaned["meeting_date"] = meeting_date

    meeting_time = form.get("meeting_time", "").strip()
    if meeting_time != ""and not TIME.match(meeting_time):
             errors["meeting_time"] = "Use HH:MM."
    if  "08:00" <= meeting_time and meeting_time <= "18:00":
            errors["meeting_time"] = "Pick a time between 08:00 and 18:00."
    cleaned["meeting_time"] = meeting_time

    confirmation= form.get("confirmation", "").strip()
    if confirmation == "":
        errors["confirmation"] = "You must confirm the information is accurate"
    cleaned["confirmation"]=confirmation
    return errors,cleaned













    








