# Contributing to Egypt.NET 🇪🇬

First of all, thank you for your interest in contributing 🙌
This project is beginner-friendly and aims to grow through clear,
well-structured contributions.

---

## 🧠 Before You Start

Please keep in mind:

- This project focuses on **clean domain modeling**
- Clarity is more important than cleverness
- Every feature should be understandable by beginners
- Tests are highly encouraged

---

## 🧩 How to Contribute

### 1️⃣ Fork the Repository
Create your own fork on GitHub.

### 2️⃣ Create a Feature Branch
Do **not** work directly on `main`.

```bash
git checkout -b feature/your-feature-name
```

### 3️⃣ Make Your Changes

You can contribute by:
- Adding new features
- Fixing bugs
- Improving documentation
- Writing or improving tests
- Refactoring for clarity
- Please keep changes focused and small.

### 4️⃣ Write or Update Tests

If your change affects logic:
- Add or update unit tests
- Tests should be readable and realistic
- Prefer clarity over edge-case overload

### 5️⃣ Commit with a Clear Message

Good examples:
``` bash
git commit -m "Add validation for invalid governorate codes"
git commit -m "Improve National ID birth date parsing"
```

Bad examples:
``` bash
git commit -m "fix"
git commit -m "update stuff"
```

### 6️⃣ Open a Pull Request

When opening a PR:
- Describe what you changed
- Explain why you changed it
- Mention if the change is breaking or not

---

## 🧪 Testing Guidelines

- All tests are written using xUnit
- Tests live in the corresponding `*.Tests` project
- Prefer simple and readable test names

---

## 🧱 Project Structure

`Egypt.Net.Core` → Main library

`Egypt.Net.Core.Tests` → Unit tests

`Exceptions` → Domain-specific exceptions

`README.md` → Module documentation

---

## 🧭 Versioning

This project follows Semantic Versioning:
`0.x.x` → API may change
`1.0.0` → Stable API

Please mention if your change affects public APIs.

---

## 🤝 Code of Conduct

Be respectful.
Be constructive.
Be patient.

This is a learning-focused project ❤️
