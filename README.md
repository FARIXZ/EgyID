# EgyID 🇪🇬

An open-source project focused on building clean, well-designed
libraries for **Egyptian-specific data and real-world use cases**.

Available for both **.NET** and **Node.js/TypeScript**.

The project aims to provide production-aware, beginner-friendly
domain models instead of ad-hoc or copy-paste implementations.

---

## 🎯 Project Goals

EgyID exists to:

- Provide **Egypt-focused libraries** for multiple platforms
- Encourage **clean domain modeling**
- Help **beginners learn real open-source practices**
- Avoid fragile, duplicated implementations
- Grow gradually through real, well-defined use cases

---

## 📦 Installation

📦 npm:

```bash
npm install egyid
```

---

## ✨ Features (Both Platforms)

- ✅ Egyptian National ID parsing and validation
- ✅ Checksum validation for data integrity
- ✅ Birth date extraction and age calculation
- ✅ Gender detection (with Arabic support)
- ✅ Governorate resolution (bilingual: Arabic & English)
- ✅ Region classification (Greater Cairo, Delta, Upper Egypt, etc.)
- ✅ Multiple formatting options (dashes, spaces, masked, detailed)
- ✅ ID card validity estimation (issue date, expiry)
- ✅ No external dependencies
- ✅ Full TypeScript support (Node.js)

---

## 🚀 Quick Example

### Node.js / TypeScript

```typescript
import { EgyptianNationalId, isValidEgyptianNationalId } from 'egyid';

const id = new EgyptianNationalId('30101011234565');

console.log(id.birthDate); // 2001-01-01
console.log(id.governorateNameAr); // القاهرة
console.log(id.genderAr); // ذكر
console.log(id.age); // 24
console.log(id.formatWithDashes()); // 3-010101-01-23456

// Helper functions
if (isValidEgyptianNationalId('30101011234565')) {
  const nationalId = EgyptianNationalId.tryCreate('30101011234565');
  console.log(`${nationalId?.governorateNameAr} - ${nationalId?.age} سنة`);
}
```

---

## 🧠 Philosophy

- Domain first
- Explicit validation
- Fail fast or fail safely
- Beginner-friendly but production-aware
- Bilingual support (Arabic & English)
- Clean, immutable objects
- Identical behavior across platforms

---

## 🧪 Testing

Each library includes:

- Dedicated test suite
- Clear and readable unit tests
- Realistic test cases that reflect real usage
- Comprehensive edge case coverage

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏🏻 Credits

Made by [Abdulrhman Hossam](https://github.com/abdulrhmanhossam/)
and Ported to **Node.js/TypeScript** by [FARIXZ](https://github.com/farixz/)

---

Made with ❤️ for the Egyptian developer community
