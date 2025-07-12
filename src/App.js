"use client";

import { useState } from "react";
// Lucide icons are not used as per new mockup, direct SVG paths are embedded
// import { ChevronDown, BookOpen, User } from 'lucide-react'

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const chapters = [
  "Real Numbers",
  "Polynomials",
  "Pair of Linear Equations in Two Variables",
  "Quadratic Equations",
  "Arithmetic Progressions",
  "Triangles",
  "Coordinate Geometry",
  "Introduction to Trigonometry",
  "Some Applications of Trigonometry",
  "Circles",
  "Areas Related to Circles",
  "Surface Areas and Volumes",
  "Statistics",
  "Probability",
];

const languages = ["English", "Hinglish"];

function App() {
  const [formData, setFormData] = useState({
    subject: "Mathematics",
    chapter: "Surface Areas and Volumes",
    language: "Hinglish",
    class_name: "Class 10",
  });

  const [summaryData, setSummaryData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState({
    chapter: false,
    language: false,
  });

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/generate-summary`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setSummaryData(data);
        setShowForm(false);
      } else {
        console.error("Failed to generate summary");
        // Optionally, handle error display to user
      }
    } catch (error) {
      console.error("Error:", error);
      // Optionally, handle error display to user
    } finally {
      setLoading(false);
    }
  };

  const toggleDropdown = (field) => {
    setDropdownOpen((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const selectOption = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setDropdownOpen((prev) => ({
      ...prev,
      [field]: false,
    }));
  };

  // Close dropdowns when clicking outside
  const handleOutsideClick = (event) => {
    if (dropdownOpen.chapter || dropdownOpen.language) {
      // Check if click is outside any dropdown
      const chapterDropdown = document.getElementById("chapter-dropdown");
      const languageDropdown = document.getElementById("language-dropdown");
      const chapterButton = document.getElementById("chapter-button");
      const languageButton = document.getElementById("language-button");

      if (
        (chapterDropdown &&
          !chapterDropdown.contains(event.target) &&
          chapterButton &&
          !chapterButton.contains(event.target)) ||
        (languageDropdown &&
          !languageDropdown.contains(event.target) &&
          languageButton &&
          !languageButton.contains(event.target))
      ) {
        setDropdownOpen({ chapter: false, language: false });
      }
    }
  };

  // Attach click listener to document body
  useState(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [dropdownOpen]);

  if (!showForm && summaryData) {
    const { summary_data, chapter_name } = summaryData;
    const { story_summary, bullet_points, important_formulas } =
      summary_data || {};

    return (
      <div className="min-h-screen text-white">
        {/* Top Bar */}
        <div className="bg-dark-topbar flex justify-between items-center px-6 py-4">
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-lime-green"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 2H15C16.1 2 17 2.9 17 4H19C20.1 4 21 4.9 21 6V20C21 21.1 20.1 22 19 22H5C3.9 22 3 21.1 3 20V6C3 4.9 3.9 4 5 4H7C7 2.9 7.9 2 9 2ZM9 4V6H15V4H9Z"
              />
            </svg>

            <span className="text-lime-green font-semibold text-sm">
              Summary
            </span>
          </div>
          <img src="/man.png" alt="avatar" className="h-8 w-8 rounded-full" />
        </div>

        {/* Content Area */}
        <div className="max-w-4xl mx-auto px-6 py-10">
          <h2 className="text-lime-green text-xl font-semibold mb-4">
            {chapter_name}
          </h2>
          <div className="space-y-2 text-sm leading-relaxed text-white">
            {story_summary && (
              <ul className="list-disc list-inside space-y-2">
                {story_summary.split("\n").map((line, index) => {
                  if (line.trim() === "") return null; // Skip empty lines
                  return <li key={index}>{line.replace(/^[•-]\s*/, "")}</li>;
                })}
              </ul>
            )}
          </div>

          {bullet_points && bullet_points.length > 0 && (
            <>
              <h3 className="text-lime-green text-base font-semibold mt-8 mb-2">
                Key Points
              </h3>
              <ul className="list-disc list-inside text-sm leading-relaxed space-y-2 text-white">
                {bullet_points.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </>
          )}

          {important_formulas && important_formulas.length > 0 && (
            <>
              <h3 className="text-lime-green text-base font-semibold mt-8 mb-2">
                Important Formulas
              </h3>
              <ul className="list-disc list-inside text-sm leading-relaxed space-y-3 text-white">
                {important_formulas.map((item, index) => (
                  <li key={index}>
                    <strong>{item.formula_name}</strong>
                    {item.formula && (
                      <>
                        <br />
                        <span className="">{item.formula}</span>
                      </>
                    )}
                    {item.description && (
                      <>
                        <br />
                        Description: {item.description}
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white">
      {/* Top Bar */}
      <div className="bg-dark-topbar flex justify-between items-center px-6 py-4">
        <div className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-lime-green"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 2H15C16.1 2 17 2.9 17 4H19C20.1 4 21 4.9 21 6V20C21 21.1 20.1 22 19 22H5C3.9 22 3 21.1 3 20V6C3 4.9 3.9 4 5 4H7C7 2.9 7.9 2 9 2ZM9 4V6H15V4H9Z"
            />
          </svg>

          <span className="text-lime-green font-semibold text-sm">Summary</span>
        </div>
        <img src="/man.png" alt="avatar" className="h-8 w-8 rounded-full" />
      </div>

      {/* Centered Form */}
      <div className="flex justify-center items-center py-16 px-4">
        <div className="space-y-6 w-full max-w-xl">
          {/* Subject */}
          <div className="flex justify-between items-center bg-dark-panel p-4 rounded-xl border border-dark-border">
            <span className="text-white font-medium text-lg">Subject</span>
            <div className="bg-black-inner text-white px-4 py-2 rounded-md text-sm font-semibold">
              Mathematics
            </div>
          </div>

          {/* Chapter */}
          <div className="space-y-2 relative">
            <div className="flex justify-between items-center bg-dark-panel p-4 rounded-xl border border-dark-border">
              <span className="text-white font-medium text-lg">Chapter</span>
              <div className="relative">
                <button
                  id="chapter-button"
                  onClick={() => toggleDropdown("chapter")}
                  className="flex items-center space-x-2 bg-black-inner text-white px-4 py-2 rounded-md text-sm font-semibold cursor-pointer"
                >
                  <span>{formData.chapter}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 text-lime-green transition-transform ${
                      dropdownOpen.chapter ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {dropdownOpen.chapter && (
                  <div
                    id="chapter-dropdown"
                    className="absolute top-full right-0 mt-2 bg-black-inner border border-dark-border rounded-md shadow-lg z-10 max-h-60 overflow-y-auto w-full min-w-[200px]"
                  >
                    {chapters.map((chapter) => (
                      <button
                        key={chapter}
                        onClick={() => selectOption("chapter", chapter)}
                        className="w-full text-right px-4 py-2 hover:bg-dark-border text-white transition-colors text-sm"
                      >
                        {chapter}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Language */}
          <div className="space-y-2 relative">
            <div className="flex justify-between items-center bg-dark-panel p-4 rounded-xl border border-dark-border">
              <span className="text-white font-medium text-lg">Language</span>
              <div className="relative">
                <button
                  id="language-button"
                  onClick={() => toggleDropdown("language")}
                  className="flex items-center space-x-2 bg-black-inner text-white px-4 py-2 rounded-md text-sm font-semibold cursor-pointer"
                >
                  <span>{formData.language}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 text-lime-green transition-transform ${
                      dropdownOpen.language ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {dropdownOpen.language && (
                  <div
                    id="language-dropdown"
                    className="absolute top-full right-0 mt-2 bg-black-inner border border-dark-border rounded-md shadow-lg z-10 w-full min-w-[150px]"
                  >
                    {languages.map((language) => (
                      <button
                        key={language}
                        onClick={() => selectOption("language", language)}
                        className="w-full text-right px-4 py-2 hover:bg-dark-border text-white transition-colors text-sm"
                      >
                        {language}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <div className="flex justify-center pt-4">
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="bg-lime-green text-black font-semibold text-lg px-6 py-2 rounded-full hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Generating..." : "Generate"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
