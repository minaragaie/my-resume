import { type NextRequest, NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

const RESUME_FILE_PATH = path.join(process.cwd(), "data", "resume.json")

export async function GET() {
  try {
    // Check if file exists, if not create it with default data
    try {
      await fs.access(RESUME_FILE_PATH)
    } catch {
      // File doesn't exist, create directory and default file
      const dataDir = path.dirname(RESUME_FILE_PATH)
      await fs.mkdir(dataDir, { recursive: true })

      // Create default resume data
      const defaultData = {
        personalInfo: {
          name: "MINA YOUANESS",
          linkedin: "https://www.linkedin.com/in/mina-youaness-ba833713/",
          location: "Voorhees, NJ",
          phone: "609.839.3558",
          email: "minaragaie@hotmail.com",
          profileImage: "/images/profile.jpg",
        },
        highlights:
          "A highly innovative and passionate Full-Stack front-end web development technologist, with over 10 years of experience in developing and designing creative and interactive user-centric websites and portals.",
        experience: [],
        skills: {
          languages: ["JavaScript", "TypeScript", "HTML5", "CSS3"],
          frameworks: ["Angular", "React", "Node.js"],
          databases: ["PostgreSQL", "MySQL"],
          versionControl: ["Git"],
          technologies: ["WordPress", "PWA"],
          methodologies: ["Agile", "Scrum"],
          standards: ["WCAG 2.1", "ARIA"],
        },
        education: [
          {
            degree: "Bachelor of Computer Science",
            institution: "College of Computing & Information Technology",
            year: "",
          },
        ],
        certifications: [],
        additionalInfo: "",
      }

      await fs.writeFile(RESUME_FILE_PATH, JSON.stringify(defaultData, null, 2))
    }

    const fileContents = await fs.readFile(RESUME_FILE_PATH, "utf8")
    const resumeData = JSON.parse(fileContents)

    return NextResponse.json(resumeData)
  } catch (error) {
    console.error("Error reading resume data:", error)
    return NextResponse.json({ error: "Failed to read resume data" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const resumeData = await request.json()

    // Validate that we have the required structure
    if (!resumeData.personalInfo || !resumeData.experience || !resumeData.skills) {
      return NextResponse.json({ error: "Invalid resume data structure" }, { status: 400 })
    }

    // Ensure data directory exists
    const dataDir = path.dirname(RESUME_FILE_PATH)
    await fs.mkdir(dataDir, { recursive: true })

    // Write the updated data to file
    await fs.writeFile(RESUME_FILE_PATH, JSON.stringify(resumeData, null, 2))

    return NextResponse.json({ success: true, message: "Resume data saved successfully" })
  } catch (error) {
    console.error("Error saving resume data:", error)
    return NextResponse.json({ error: "Failed to save resume data" }, { status: 500 })
  }
}
