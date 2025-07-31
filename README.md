# 📊 Customer Revenue Analysis Dashboard (Zenalyst Technical Assessment)

This project was developed as part of the **Zenalyst Technical Assessment**. It consists of both frontend and backend components that together provide interactive **Q3 and Q4 financial analysis** at the **customer, region, and country levels**.

---

## 🧩 Features

### ✅ Backend (Node.js + Express + MongoDB)

* API endpoints to fetch:

  * Customer-level revenue and growth data
  * Regional revenue comparisons
  * Country-wise quarterly analysis
* Percentage variance calculation between Q3 and Q4
* Support for dynamic filters (by region, country, min/max revenue, etc.)

### ✅ Frontend (React + Chart.js + MUI)

* Interactive data visualizations (Bar charts, Pie charts)
* Filterable tables and graphs for deep-dives into:

  * Customer performance
  * Regional financial trends
  * Country-level revenue contributions
* Responsive design for seamless experience across devices

---

## 🚀 How to Run

### 1. Clone the Repository

```bash
git clone https://github.com/sushmitha030/Zenalyst_Assignment.git
```

### 2. Backend Setup

```bash
cd backend
npm install
.env - I have added my local DB connection URL
npm start
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm start
```

---

## 📂 Folder Structure

```
├── backend/         # Node.js Express APIs
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── config/
├── frontend/        # React frontend with charts and UI
│   ├── components/
│   ├── App.js
│   └── index.js
└── README.md
```

---
## 📈 Backend Analysis Focus

* I have made `zenalyst` database in the local mongo db.
* I have made a total of 5 collections, the same names are being used in the **mongoose models**
<img width="251" height="166" alt="image" src="https://github.com/user-attachments/assets/7cba0bb7-b746-4c18-be93-00fe4aed68ea" />

* Country wide revenue analysis sample documents
<img width="479" height="358" alt="image" src="https://github.com/user-attachments/assets/f14ae7d6-79e7-4437-9c77-d40309f7ca1b" />

* Customer revenue analysis sample documents
<img width="416" height="362" alt="image" src="https://github.com/user-attachments/assets/9f120422-13e1-4eaf-9548-52595c925208" />

* Quaterly revenue data 
<img width="373" height="279" alt="image" src="https://github.com/user-attachments/assets/91371aad-e53e-4d0f-a522-3a582150802b" />

* Region revenue data 
<img width="363" height="363" alt="image" src="https://github.com/user-attachments/assets/ddde1ab2-d63e-4138-bda1-6c7ab4ceb691" />

* Revenue bridge analysis
<img width="339" height="322" alt="image" src="https://github.com/user-attachments/assets/6c340187-5b88-481d-a203-6776c587457f" />

* With these collections, I have made **mongoose models** which can be seen models folder, and the api endpoints have a seperate folder called `routes`, business logic is segregated into `controllers` folder and `config` folder has the code for making the connectivity with the mongoDb. 


## 📈 Analysis Focus Frontend

This dashboard provides insights into:

* **Financial growth** between **Quarter 3 and Quarter 4**
* **Percentage of variance** for each customer
* **Aggregate trends** at **regional and country** levels
* **Top-performing** and **underperforming** segments

The UI is written in 4 segments

1) This is the main home page which redirects to the needed segment

<img width="880" height="191" alt="image" src="https://github.com/user-attachments/assets/480a2110-809c-4c99-ab83-d1fd3f1de9d0" />

2) The first segment below image describes about the country wise analytics , I have used this API `http://localhost:8081/api/top-countries-by-revenue?n=10`, the API is implemented in a scalable manner to provide the data for only the required top n fields.

<img width="1356" height="552" alt="image" src="https://github.com/user-attachments/assets/71e75f76-ec7a-4f50-93e7-8af102d49360" />

3) The second segment is to show the tabulated customer analysis, with name total variance and the percentage with Q3 revenue and Q4 revenue. The table is paginated and easier to understand for the user. We have used this api `http://localhost:8081/api/get-customer-growth-analysis` with query params which could give the **positive variance** and **Minimum Q4 growth**.

<img width="1282" height="652" alt="image" src="https://github.com/user-attachments/assets/ee89e6bb-bf4e-442e-8ceb-061bc50bdaa9" />

So when we click the postive variance the API call happens and provide us with the corresponding data, the api is implemented in a scalable manner so that the backend does the filtering and everything.

-> So when we click the positive variance data is getting changed as you can see only `226` records are coming up. Below Image Ref
<img width="1222" height="650" alt="image" src="https://github.com/user-attachments/assets/83e7fb5c-7d05-4f33-a5b9-3f0b99c70d23" />

-> So now if we change the minimum Q4 value with positive variance it is again gonna change and provide the required table only **27** matching records here.
 <img width="1098" height="598" alt="image" src="https://github.com/user-attachments/assets/e739f6eb-cc7f-4221-bf60-9e855fe6ff64" />

4) The customer metrics segment provides the **total Q3 revenue, total Q4 revenue and total variance**. and also it provide the top 10 customers by variance too.

<img width="1361" height="541" alt="image" src="https://github.com/user-attachments/assets/16e00296-f7ae-4479-8dd2-1163123d4ff5" />

5) The last one here it provides the chat feature to get some insights on the data that is sent by the api.

---



## 🛠️ Tech Stack

* **Frontend:** React, Chart.js, Material UI (MUI), Axios
* **Backend:** Node.js, Express.js, MongoDB
* **Data Visualization:** Chart.js (Bar & Pie charts)

---

## ✍️ Author

This project was built by **Sushmitha Kandula** as part of the **Zenalyst Technical Assessment**.
Feel free to reach out or explore more of my work!

---
