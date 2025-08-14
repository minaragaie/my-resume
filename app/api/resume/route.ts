import { type NextRequest, NextResponse } from "next/server"

const defaultResumeData = {
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
  experience: [
    {
      title: "Senior Full-Stack Developer",
      company: "Tech Solutions Inc.",
      duration: "2020 - Present",
      description: "Led development of modern web applications using React, Node.js, and cloud technologies.",
    },
    {
      title: "Frontend Developer",
      company: "Digital Agency",
      duration: "2018 - 2020",
      description: "Developed responsive websites and web applications with focus on user experience.",
    },
  ],
  skills: {
    languages: ["JavaScript", "TypeScript", "HTML5", "CSS3"],
    frameworks: ["Angular", "React", "Node.js", "Next.js"],
    databases: ["PostgreSQL", "MySQL", "MongoDB"],
    versionControl: ["Git", "GitHub"],
    technologies: ["WordPress", "PWA", "Docker"],
    methodologies: ["Agile", "Scrum"],
    standards: ["WCAG 2.1", "ARIA"],
  },
  education: [
    {
      degree: "Bachelor of Computer Science",
      institution: "College of Computing & Information Technology",
      year: "2015",
    },
  ],
  certifications: ["AWS Certified Developer", "Google Analytics Certified"],
  additionalInfo: "Passionate about creating accessible and performant web applications.",
}

export async function GET() {
  try {
    return NextResponse.json(defaultResumeData)
  } catch (error) {
    console.error("Error returning resume data:", error)
    return NextResponse.json({ error: "Failed to load resume data" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const resumeData = await request.json()

    // Validate that we have the required structure
    if (!resumeData.personalInfo || !resumeData.experience || !resumeData.skills) {
      return NextResponse.json({ error: "Invalid resume data structure" }, { status: 400 })
    }

    return NextResponse.json({ success: true, message: "Resume data received successfully" })
  } catch (error) {
    console.error("Error processing resume data:", error)
    return NextResponse.json({ error: "Failed to process resume data" }, { status: 500 })
  }
}
