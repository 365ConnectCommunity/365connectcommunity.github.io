export const courses = [
    {
        id: 'power-platform-basics',
        title: 'Getting Started with Power Platform & Canvas Apps',
        description: 'Master the basics of Microsoft Power Platform and build your first custom Canvas App in this comprehensive beginner-friendly course.',
        duration: '4 Weeks',
        level: 'Beginner',
        image: '/assets/images/power-platform-course.jpg', // Placeholder
        modules: [
            {
                id: 'm1',
                title: 'Module 1: Introduction to Power Platform',
                lessons: [
                    {
                        id: 'l1-1',
                        title: 'Overview of Microsoft Power Platform',
                        content: `Microsoft Power Platform is a low-code platform that spans Office 365, Azure, Dynamics 365, and standalone applications. It enables organizations to analyze data, build solutions, automate processes, and create virtual agents.
                        
                        The key components are:
                        1. **Power Apps**: Build custom apps in hours—not months—that connect to your existing data and systems.
                        2. **Power Automate**: Construct automated workflows throughout your organization.
                        3. **Power BI**: Unify data from many sources to create interactive, immersive dashboards and reports.
                        4. **Power Virtual Agents**: Create chatbots to engage conversationally with your customers and employees.`,
                        type: 'text'
                    },
                    {
                        id: 'l1-2',
                        title: 'What are Canvas Apps?',
                        content: `Canvas apps allow you to design the interface by dragging and dropping elements onto a canvas, just like designing a slide in PowerPoint. You have complete control over the app layout and can connect to 200+ data sources.
                        
                        **Why Canvas Apps?**
                        * Pixel-perfect control over UI.
                        * Combine data from multiple sources.
                        * Excel-like formulas (Power Fx) for logic.`,
                        type: 'text'
                    },
                    {
                        id: 'l1-3',
                        title: 'Setting up your Developer Environment',
                        content: `To start building, you need a Power Apps environment.
                        
                        1. Join the **Microsoft 365 Developer Program** to get a free developer tenant.
                        2. Or sign up for the **Power Apps Community Plan** for a free individual environment.
                        
                        Go to [make.powerapps.com](https://make.powerapps.com) to access the studio.`,
                        type: 'text'
                    }
                ]
            },
            {
                id: 'm2',
                title: 'Module 2: Building Your First App',
                lessons: [
                    {
                        id: 'l2-1',
                        title: 'The Power Apps Studio Interface',
                        content: `The Studio represents your workspace.
                        * **Tree View**: Shows the hierarchy of screens and controls.
                        * **Canvas**: The visual design area.
                        * **Properties Pane**: Configure settings for selected controls.
                        * **Formula Bar**: Write Power Fx logic.`,
                        type: 'text'
                    },
                    {
                        id: 'l2-2',
                        title: 'Screens and Controls',
                        content: `Apps are made of Screens. Screens contain Controls.
                        
                        **Common Controls:**
                        * **Label**: Display text.
                        * **Button**: Trigger actions.
                        * **Text Input**: Get user input.
                        * **Gallery**:  Display lists of data.
                        
                        *Exercise: Drag a Button onto the screen and change its Text property to "Hello World".*`,
                        type: 'text'
                    },
                    {
                        id: 'l2-3',
                        title: 'Power Fx Basics',
                        content: `Power Fx is the low-code language for Power Platform, based on Excel formulas.
                        
                        **Examples:**
                        * Navigate to another screen: \`Navigate(Screen2, ScreenTransition.Fade)\`
                        * Set a variable: \`Set(varUser, User().FullName)\`
                        * Notify user: \`Notify("Saved successfully", NotificationType.Success)\``,
                        type: 'text'
                    }
                ]
            },
            {
                id: 'm3',
                title: 'Module 3: Working with Data',
                lessons: [
                    {
                        id: 'l3-1',
                        title: 'Connecting to Data Sources',
                        content: `Canvas apps connect to data via **Connectors**. 
                        Common connectors include:
                        * SharePoint Lists
                        * Dataverse
                        * Excel Online
                        * SQL Server
                        
                        Data sources allow your app to read and write information persistently.`,
                        type: 'text'
                    },
                    {
                        id: 'l3-2',
                        title: 'Using Galleries and Forms',
                        content: `**Galleries** are used to browse records.
                        **Forms** are used to view, edit, and create records.
                        
                        *Connecting a Gallery:* Set the \`Items\` property to your data source name.
                        *Connecting a Form:* Set the \`DataSource\` property and use \`SubmitForm(Form1)\` on a button to save changes.`,
                        type: 'text'
                    }
                ]
            }
        ]
    }
];
