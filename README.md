# 📊 React Spreadsheet Table UI

This project is a dynamic and responsive spreadsheet-style data table built with **React**, **TypeScript**, and **@tanstack/react-table**. It mimics the editable UI of a spreadsheet, allowing users to view, edit, and interact with structured data across multiple grouped columns.

## 🚀 Features

- ⚙️ Built with `@tanstack/react-table`
- 📝 Inline editable cells
- 📁 Grouped headers with icons
- 🎯 Dynamic row rendering
- 🖥️ Scrollable UI within screen bounds
- 🌐 Clickable URLs (press Enter to open)
- 🔍 Custom style per priority/status
- ➕ Add new rows easily

## 🧱 Tech Stack

- **React + TypeScript**
- **Tailwind CSS**
- **@tanstack/react-table**
- **Lucide React Icons**
- **Custom SVG assets**

## 📂 Folder Structure

├── components/
│ ├── Spreadsheet.tsx # Main component
│ ├── ui/
│ │ ├── badge.tsx # Custom badge component
│ │ ├── breadcrumb.tsx # Ellipsis component
├── assets/ # All icons/images used
├── lib/utils.ts # Utility functions (like cn)


## 🖼️ Preview

| Feature | Screenshot |
|--------|------------|
| Editable Cells | ✅ |
| Grouped Headers | ✅ |
| Scrollable Table | ✅ |
| Dynamic Rows | ✅ |

## ✨ Usage

1. Clone the repository  
   ```bash
   git clone https://github.com/your-username/spreadsheet-table.git
   
Install dependencies
npm install

Start development server
npm run dev