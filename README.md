# Personal Website - Jakub Švihel

This repository contains the source code for my personal website, built with **Next.js**, **React**, and **Tailwind CSS**. The website showcases my professional profile, projects, skills, and contact information.

You can visit the live version of my personal page here:   **[JakSviT](https://jak-svit-bbb6b.web.app/personalpage.html)**

---

## Features

- **Bilingual Support (Czech & English):** Easily switch between languages.
- **Responsive Design:** Optimized for all devices.
- **Dynamic Data:** Uses JSON files to fetch and display general information and project data.
- **Interactive Components:** Custom reusable components for tabs, grids, lists, and buttons.
- **Optimized Performance:** Lazy loading and optimized images with `next/image`.

---

## Components

### **Key Custom Components**
- **`JTab`**: Interactive tabs for organizing content.
- **`JGrid`**: Flexible grid layout for presenting structured data.
- **`JList`**: List view for detailed project information.
- **`JButton`**: Custom buttons for various actions.

### **Dynamic Content**
The website fetches data dynamically from JSON files located in the `/data` directory:
- `personalPageGeneralDataCZ.json` / `personalPageGeneralDataEN.json`
- `personalPageProjectsDataCZ.json` / `personalPageProjectsDataEN.json`

---

## Sections

1. **About Me**  
   An introduction highlighting my interests, including IT, Japan, fitness, and investing.

2. **Employment**  
   Professional experience displayed dynamically using `JGrid`.

3. **Skills**  
   A curated list of my technical and soft skills.

4. **Education**  
   Academic background with institutions and achievements.

5. **Certificates**  
   Certifications relevant to my professional growth.

6. **Projects**
   - **Commercial Sphere:** Professional projects like `Unit Explorer` and `Project Server`.
   - **Academic Sphere:** Highlights of my bachelor’s and diploma theses, including video and document links.

7. **Contact Information**  
   Links to email, phone, LinkedIn, and GitHub.
