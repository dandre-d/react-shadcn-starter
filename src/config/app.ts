interface AppConfig {
    name: string,
    github: {
        title: string,
        url: string
    },
    author: {
        name: string,
        url: string
    },
}

export const appConfig: AppConfig = {
    name: "Keyrus Lunch",
    github: {
        title: "Lunch Order App for MOKEYS",
        url: "",
    },
    author: {
        name: "Dandré",
        url: "https://www.linkedin.com/in/dan-diedericks/",
    }
}