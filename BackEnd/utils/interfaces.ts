

export interface iStudent{
    firstName: string
    lastName: string
    email: string
    role: string
    enrollmentStatus: string
    // subjects: Array<{}>
    department: string
    instructors: Array<{}>
    grade: Array<{}>
    term: string
}