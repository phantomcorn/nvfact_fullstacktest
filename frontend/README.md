# 📦 Moornmo Full-Stack Assignment Submission

**Candidate Name**:  Phantakorn Prarusudamkerng
**Email Address**:  jj.phantakorn@outlook.com
**GitHub Repository (if any)**:  
**Submission Date**:  Friday 25th July 2025

---

## ✅ 1. Project Overview

I am using MERN stack for this project. The specifics details are:

- Backend framework used:  Express (NodeJS)
- Frontend framework used:  ReactJS + ThreeJS
- State management library:  RTK Query (Redux-Toolkit)
- Authentication method:  JWT
- Deployment method (if any):  
- Database: MongoDB (mongoose library)

Different smart factory software for different clients may have different requirements therefore structure cannot be guaranteed hence the choice of noSQL database. This will also help with consistent workflow since we do not have to swap between different tech stack.

---

## 🧠 2. Architecture Explanation

### Folder Structure
Describe your folder/component structure and reasoning.

### State Management
Why did you choose this state management library?  
Provide a simple flow or diagram if possible.

---

## 🔐 3. Backend Details

- Endpoints implemented:
  - [x] POST /login
  - [x] GET /users
  - [x] POST /users
  - [x] PUT /users/:id
  - [x] DELETE /users/:id

- JWT applied: (Yes/No)  
- Swagger or API Docs: (Yes/No)  

Instructions to run backend:
```bash
# e.g.
npm install
npm run backdev
```

---

## 💻 4. Frontend Details

- Components implemented:
  - [x] Login page
  - [x] User table with filter
  - [x] User create/edit form
  - [ ] Dashboard (Three.js or visual summary)

Instructions to run frontend:
```bash
# e.g.
npm install
npm run front
```

---

## 🧮 5. SQL Answers

### Q1: Daily login count (past 7 days)

Assuming we do not count login from the same user more than once
```sql
SELECT COUNT(DISTINCT (user_id)) as Weekly login count 
FROM user_logins
WHERE login_time >= DATEADD(day,-7, GETDATE())

```

### Q2: Detect 3 consecutive login days
```sql
WITH dates AS (
  SELECT user_id, CAST(login_time AS DATE) AS d
  FROM user_logins
  GROUP BY user_id, CAST(login_time AS DATE)
)
SELECT DISTINCT d1.user_id
FROM dates d1
JOIN dates d2 
  ON d2.user_id = d1.user_id 
  AND d2.d = DATEADD(day, 1, d1.d)
JOIN dates d3 
  ON d3.user_id = d1.user_id 
  AND d3.d = DATEADD(day, 2, d1.d);

```

---

## 📄 6. Additional Notes or Assumptions

(Describe any assumptions made, mock data used, or areas you'd improve.)
Hashed password field included in the database (In the file `Moornmo_Fullstack_Assignment_EN.md` password was not included in the fields requirement)

Assume test marker will create their own MongoDB database
Areas to improve:
- Separate backend and frontend to its own git projects (for the sake of the assignment I stored it as 1 to keep things simple)
- Add users table paging
- On user first create, must verify email before admin can update status (ACTIVE/INACTIVE)
- Improve layout (Responsive for mobile)

---

## 📸 7. Screenshots (Optional)

(Include key screenshots of your UI, dashboard, or Swagger documentation.)

---

## 📂 8. Docker / i18n / Bonus Items

- Dockerized: (Yes/No)  
- i18n support (EN/TH): (Yes/No)  
- Postman collection included: (Yes/No)  

---

Thank you for reviewing my submission!
