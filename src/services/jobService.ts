/**
 * Service to fetch and parse job openings from a Google Spreadsheet CSV
 */

export interface JobOpening {
  id: string;
  position: string;
  experience: string;
  salary: string;
  location: string;
  owner?: string;
  techStack: string;
  description: string;
}

const DEFAULT_SPREADSHEET_ID = "1MN2-KUvx16yKtCWGWVHjqFu6ejHdLgl925cd1F4ss8g";
const DEFAULT_GID = "1796468726";

/**
 * Parses a CSV string into an array of JobOpening objects
 * Manages basic CSV parsing with support for quoted values
 */
function parseCSV(csvText: string): JobOpening[] {
  const lines: string[] = [];
  let currentLine: string[] = [];
  let currentCell = "";
  let insideQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (insideQuotes) {
      if (char === '"' && nextChar === '"') {
        currentCell += '"';
        i++; // skip next quote
      } else if (char === '"') {
        insideQuotes = false;
      } else {
        currentCell += char;
      }
    } else {
      if (char === '"') {
        insideQuotes = true;
      } else if (char === ",") {
        currentLine.push(currentCell.trim());
        currentCell = "";
      } else if (char === "\n" || char === "\r") {
        currentLine.push(currentCell.trim());
        if (currentLine.some(cell => cell !== "")) {
          lines.push(JSON.stringify(currentLine));
        }
        currentLine = [];
        currentCell = "";
        if (char === "\r" && nextChar === "\n") i++; // skip \n
      } else {
        currentCell += char;
      }
    }
  }
  
  // Last line if not followed by newline
  if (currentCell || currentLine.length > 0) {
    currentLine.push(currentCell.trim());
    lines.push(JSON.stringify(currentLine));
  }

  // Convert stringified arrays back to arrays and map to JobOpening
  // Skip header (0)
  return lines.slice(1).map(lineStr => {
    const cells = JSON.parse(lineStr) as string[];
    return {
      id: cells[0] || Math.random().toString(36).substr(2, 9),
      position: cells[1] || "Untitled Role",
      experience: cells[2] || "N/A",
      salary: cells[3] || "Competitive",
      location: cells[4] || "Remote / On-site",
      owner: cells[5],
      techStack: cells[6] || "",
      description: cells[7] || "Contact us for more details about this role.",
    };
  }).filter(job => job.position !== "Untitled Role" && job.position !== "");
}

export const fetchJobs = async (spreadsheetId = DEFAULT_SPREADSHEET_ID, gid = DEFAULT_GID): Promise<JobOpening[]> => {
  try {
    // Note: This URL works IF the spreadsheet is Shared as "Anyone with link can view"
    // or Published to Web as CSV.
    const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=csv&gid=${gid}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error("Failed to fetch jobs. Please ensure the spreadsheet is shared publically.");
    }

    const csvText = await response.text();
    return parseCSV(csvText);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    // Return empty array on failure; UI will handle this
    throw error;
  }
};
