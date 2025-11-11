# Financial Advisor Client Management System – Data Model Implementation

This project implements the **data model (ERD)** for a Financial Advisor Client Management System using **Spring Boot**, **Spring Data JPA**, and a relational database.

It forms the backend data layer for managing Financial Advisors, their Clients, Portfolios, and Securities.

---

## 🧠 Overview

Each financial advisor manages multiple clients, and each client has a single portfolio containing zero or more securities.  
This system enables full CRUD (Create, Read, Update, Delete) operations for these entities while maintaining referential integrity and scalability.

---

## 🧩 Tech Stack

- **Spring Boot 3.x**
- **Spring Data JPA (Hibernate)**
- **H2 / MySQL Database**
- **Java 17+**
- **Maven Build Tool**
- (Frontend planned: **React.js Dashboard**)

---

## 🏗️ Entity Relationship Summary

- **FinancialAdvisor** → one-to-many → **Client**  
- **Client** → one-to-one → **Portfolio**  
- **Portfolio** → many-to-many (via junction table) → **Security**

Entities implemented:
- `FinancialAdvisor`
- `Client`
- `Portfolio`
- `Security`
- `PortfolioSecurity` (junction entity)

---

## ⚙️ Getting Started

### 1️⃣ Clone or Fork the Repo

```bash
git clone https://github.com/<your-username>/wells-fargo-task-2.git
cd wells-fargo-task-2
```

### 2️⃣ Open in IntelliJ IDEA

Import the project as a **Maven Project**.

### 3️⃣ Run the Spring Boot App

```bash
mvn spring-boot:run
```

Spring will auto-create database tables based on the JPA annotations.

---

## 🗃️ Optional: Insert Sample Data

Edit or create `src/main/resources/data.sql`:

```sql
INSERT INTO FinancialAdvisor (advisorId, name, email, phone) VALUES (1, 'Amit Patel', 'amit@example.com', '9999999999');
INSERT INTO Client (clientId, advisor_id, name, contactInfo) VALUES (1, 1, 'Ravi Kumar', 'ravi@example.com');
INSERT INTO Portfolio (portfolioId, client_id, portfolioName, creationDate) VALUES (1, 1, 'Ravi Portfolio', '2025-11-01');
INSERT INTO Security (securityId, name, category, purchaseDate, purchasePrice, quantity) VALUES (1, 'ABC Corp', 'Equity', '2025-01-15', 100.0, 10);
INSERT INTO PortfolioSecurity (id, portfolio_id, security_id, quantityInPortfolio) VALUES (1, 1, 1, 10);
```

---

## 🧪 Verification

When the app runs, Spring JPA will:
- Generate schema automatically
- Map all entity relationships
- Log SQL DDL statements in console

Check H2 Console (if enabled):
```
http://localhost:8080/h2-console
```

---

## 🧑‍💻 Author

**Shivam Kumar**  
📧 Email: shivamkumarhub@gmail.com  
📱 Phone: 6281382297  

---

## 🔗 References

1. [Spring Data JPA Guide](https://spring.io/guides/gs/accessing-data-jpa)  
2. [Starter Repository](https://github.com/vagabond-systems/wells-fargo-task-2)  
3. [Spring Boot 3.x JPA Documentation](https://docs.spring.io/spring-boot/docs/3.0.4/reference/htmlsingle/#data.sql.jpa-and-spring-data)
