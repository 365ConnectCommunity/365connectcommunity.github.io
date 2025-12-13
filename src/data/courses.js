export const courses = [
    {
        id: 'power-platform-basics',
        title: 'Getting Started with Power Platform & Canvas Apps',
        description: 'A comprehensive, hands-on masterclass for beginners. Learn Power Apps, Automate, Dataverse, and more. Based on PL-900 Fundamentals.',
        duration: '6 Weeks',
        level: 'Beginner',
        image: '/assets/images/power-platform-course.jpg',
        modules: [
            {
                id: 'm1',
                title: 'Module 1: Introduction to Power Platform',
                lessons: [
                    {
                        id: 'l1-1',
                        title: 'What is the Power Platform?',
                        content: `**Microsoft Power Platform** is a suite of low-code tools that empowers you to analyze data, build solutions, automate processes, and create virtual agents. It's designed to democratize app development, allowing "Citizen Developers" to solve business problems without writing traditional code.

The "Power" family includes:
* **Power Apps**: Build custom applications for web and mobile.
* **Power Automate**: Automate workflows between apps and services.
* **Power BI**: Visualize data with interactive dashboards.
* **Power Pages**: Create secure, external-facing business websites.
* **Copilot Studio (Virtual Agents)**: Build intelligent AI chatbots.

**Why learn this?**
Organizations worldwide are digitizing proceses. Power Platform skills are in high demand for roles like App Maker, Functional Consultant, and Solution Architect.

[Explore the Official Overview](https://learn.microsoft.com/en-us/power-platform/guidance/adoption/methodology)`,
                        type: 'text'
                    },
                    {
                        id: 'l1-2',
                        title: 'Dataverse & Connectors',
                        content: `The heart of the Power Platform is data connectivity.

**Connectors**
Connectors act as bridges between your app and external services. There are over **1,000+ connectors** available (e.g., SharePoint, SQL Server, Salesforce, Twitter/X, Outlook).
* **Standard Connectors**: Included in standard licenses (SharePoint, Excel).
* **Premium Connectors**: Require paid licenses (SQL, Dataverse).

**Microsoft Dataverse**
Dataverse is a cloud-based smart database secureley storing data used by business applications. It's more than just tables; it includes security, logic, and validation built-in.
* Standardized schema (Common Data Model).
* Role-based security.
* Integrated with Dynamics 365.

[Learn about Connectors](https://learn.microsoft.com/en-us/connectors/)
[What is Dataverse?](https://learn.microsoft.com/en-us/power-apps/maker/data-platform/data-platform-intro)`,
                        type: 'text'
                    }
                ]
            },
            {
                id: 'm2',
                title: 'Module 2: Building Canvas Apps',
                lessons: [
                    {
                        id: 'l2-1',
                        title: 'Canvas Apps vs Model-Driven Apps',
                        content: `**Canvas Apps**
* **Design-first approach**: You start with a blank canvas and design the UI pixel-by-pixel.
* **Flexibility**: Connect to 200+ data sources.
* **Best for**: Task-based mobile apps (e.g., Inspection app, Leave Request).

**Model-Driven Apps**
* **Data-first approach**: You define the data model (in Dataverse), and the UI is generated automatically.
* **Structure**: Component-focused (Views, Forms, Dashboards).
* **Best for**: Complex back-office processes (e.g., Customer Relationship Management).

In this course, we focus on **Canvas Apps**.`,
                        type: 'text'
                    },
                    {
                        id: 'l2-2',
                        title: 'The Power Apps Studio',
                        content: `To build an app, go to [make.powerapps.com](https://make.powerapps.com).

**Key Areas:**
1. **Tree View** (Left): Shows your screens and controls hierarchy.
2. **Canvas** (Center): Your visual workspace.
3. **Properties** (Right): Configure color, size, text, and settings.
4. **Formula Bar** (Top): Write Power Fx logic (similar to Excel).

**Exercise:**
1. Create a "Blank Canvas App".
2. Add a **Text Input** control.
3. Add a **Label**.
4. Set the Label's \`Text\` property to: \`"Hello, " & TextInput1.Text\`
5. Type in the input and watch the label update instantly!`,
                        type: 'text'
                    },
                    {
                        id: 'l2-3',
                        title: 'Mastering Power Fx',
                        content: `**Power Fx** is the low-code language used in Canvas Apps. It is declarative and works like Excel formulas-recalculating instantly.

**Essential Formulas:**
* \`Navigate(Screen2, Fade)\`: Go to another screen.
* \`Back()\`: Return to previous screen.
* \`Set(varUser, User().FullName)\`: creating a global variable.
* \`UpdateContext({ locShowPopup: true })\`: creating a local screen variable.
* \`Notify("Success!", Success)\`: Show a banner message.
* \`Filter(Employees, Department = "IT")\`: Query data.

[Power Fx Reference Guide](https://learn.microsoft.com/en-us/power-platform/power-fx/overview)`,
                        type: 'text'
                    }
                ]
            },
            {
                id: 'm3',
                title: 'Module 3: UI & UX Design',
                lessons: [
                    {
                        id: 'l3-1',
                        title: 'Screens and Navigation',
                        content: `A good app needs easy navigation.
* Use a **Home Screen** as a landing page.
* Use **Components** for reusable headers/footers.

**Creating a Menu:**
1. Add a **Container** to the left side.
2. Add buttons inside for "Home", "Tasks", "Profile".
3. On the specific button \`OnSelect\`, use \`Navigate()\`.`,
                        type: 'text'
                    },
                    {
                        id: 'l3-2',
                        title: 'Galleries and Collections',
                        content: `**Galleries** are the primary way to list data.
* **Vertical Gallery**: Standard list.
* **Horizontal Gallery**: Product carousels.

**Collections** allow you to store data temporarily in the app memory.
* Create: \`ClearCollect(colCart, {Item: "Apple", Price: 1.00})\`
* Use collection as the \`Items\` source of a gallery.

[Working with Galleries](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/add-gallery)`,
                        type: 'text'
                    }
                ]
            },
            {
                id: 'm4',
                title: 'Module 4: Power Automate & Integration',
                lessons: [
                    {
                        id: 'l4-1',
                        title: 'Introduction to Cloud Flows',
                        content: `**Power Automate** lets you create workflows.
A flow consists of:
1. **Trigger**: What starts the flow? (e.g., "When a button is clicked", "When an email arrives").
2. **Actions**: What happens next? (e.g., "Send an email", "Update a row").

**Types of Flows:**
* **Instant**: Triggered manually (e.g. from a Power App button).
* **Automated**: Triggered by an event (e.g. new SharePoint item).
* **Scheduled**: Runs on a timer (e.g. every morning at 8 AM).`,
                        type: 'text'
                    },
                    {
                        id: 'l4-2',
                        title: 'Connecting Apps to Flows',
                        content: `You can trigger a flow directly from your Canvas App.
1. In Power Apps, go to the "Power Automate" pane.
2. "Add Flow".
3. On a button's \`OnSelect\` property, write: \`'MyFlowName'.Run(User().Email)\`

This is powerful for heavy logic like sending complex emails, generating PDFs, or calling APIs.

[Get Started with Power Automate](https://learn.microsoft.com/en-us/power-automate/getting-started)`,
                        type: 'text'
                    }
                ]
            }
        ]
    }
];
