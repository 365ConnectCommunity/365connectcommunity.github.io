import { BookOpen, Award, CheckCircle, Clock, BarChart } from 'lucide-react';

export const courses = [
    {
        id: 'power-platform-basics',
        title: 'Ultimate Power Platform Masterclass: Solution Architect Edition',
        description: 'The correct way to learn Power Platform. Master Canvas Apps, Dataverse, and Power Automate with a strict focus on Solutions, ALM, and Best Practices. No messy default environments!',
        duration: '15 Hours',
        level: 'Zero to Architect',
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
        modules: [
            {
                id: 'm1',
                title: 'Module 1: The Golden Rules (Start Here)',
                lessons: [
                    {
                        id: 'l1-1',
                        title: 'Why Most Tutorials Are Wrong',
                        content: `**The Problem:**
Most tutorials tell you to go to \`make.powerapps.com\` and clicking "Create App".
🛑 **STOP!** This is the wrong way.

**The Solution-First Approach:**
In the real world (and in this course), we **ALWAYS** build inside a **Solution**.

**Why?**
1.  **Portability:** You can't verify or deploy an App easily if it's not in a Solution.
2.  **Dependencies:** Solutions track what your app uses (Tables, Flows, Variables).
3.  **ALM (Application Lifecycle Management):** Moving from Dev -> Test -> Prod is impossible without Solutions.

**Your Goal:**
By the end of this module, you will never create an "Orphaned" app again.`,
                        type: 'text'
                    },
                    {
                        id: 'l1-2',
                        title: 'Environments & Publishers',
                        content: `Before we build, we setup our "Virtual Office".

**1. Environments:**
Think of an Environment as a separate "room" in your office.
*   **Personal Productivity (Default):** The messy breakroom. Don't build critical apps here.
*   **Developer (Dev):** Your private workshop. **Build here.**
*   **Production (Prod):** The showroom. Validated working apps.

**2. Publishers:**
Who built this? You did.
*   The "Publisher" defines the "prefix" of your database columns.
*   *Bad:* \`new_firstname\` (Generic, confusing)
*   *Good:* \`dev_firstname\` (Specific to your publisher)

**Exercise:**
1.  Go to the Power Platform Admin Center.
2.  Check if you have a "Developer" environment. If not, create one (it's free!).`,
                        type: 'text'
                    },
                    {
                        id: 'l1-3',
                        title: 'Creating Your First Solution',
                        content: `**Step-by-Step Exercise:**

1.  Go to **make.powerapps.com**.
2.  **Switch Environment** (Top Right) to your "Developer" environment.
3.  Click **Solutions** on the left sidebar.
4.  Click **New Solution**.
    *   **Display Name:** "Power Platform Bootcamp"
    *   **Name:** "PowerPlatformBootcamp" (Auto-filled)
    *   **Publisher:** Click "+ New Publisher".
        *   **Display Name:** "Shaheer Dev"
        *   **Name:** "shaheerdev"
        *   **Prefix:** \`sd\` (This is important!)
        *   *Save and Select this publisher.*
    *   **Version:** 1.0.0.0
5.  Click **Create**.

**Congratulations!** 
You have now created a container for all your future work. All your tables will now start with \`sd_\` (e.g., \`sd_ClientName\`).`,
                        type: 'text'
                    }
                ]
            },
            {
                id: 'm2',
                title: 'Module 2: Dataverse (The Backbone)',
                lessons: [
                    {
                        id: 'l2-1',
                        title: 'Why Dataverse over SharePoint?',
                        content: `Many beginners start with SharePoint lists. Here is why you should minimize that.

**SharePoint is for Documents.**
**Dataverse is for Data.**

**Dataverse Benefits:**
1.  **Relational:** Real relationships (1:N, N:N) like SQL.
2.  **Security:** Row-level security (Manager sees all, Employee sees own).
3.  **Logic:** Business Rules and Logic run at the *Database* level (Backend), not just the App level (Frontend).
4.  **Solutions:** Dataverse tables live inside your Solution perfectly.`,
                        type: 'text'
                    },
                    {
                        id: 'l2-2',
                        title: 'Creating Tables in a Solution',
                        content: `**Exercise: The "Device Quest" App**
We will build an app to track IT Equipment.

1.  Open your **"Power Platform Bootcamp"** Solution.
2.  Click **New > Table > Table (Advanced)**.
    *   **Display Name:** "Device Request"
    *   **Plural Name:** "Device Requests"
    *   *Notice the Name:* It will be \`sd_devicerequest\`. (See the prefix?)
    *   Enable **"Attachments"** and **"Audit changes"**.
3.  Click **Save**.

**Adding Columns:**
1.  **Price:** Data Type = Currency.
2.  **Device Type:** Data Type = Choice (Laptop, Monitor, Phone).
3.  **Requested Date:** Data Type = Date Only.
4.  **Approver:** Data Type = Lookup (User).
    *   *Note:* Lookups create a relationship between your table and the User table!

**Key Takeaway:**
We are building the *Data Model* first. Good architects prioritize data structure over UI.`,
                        type: 'text'
                    }
                ]
            },
            {
                id: 'm3',
                title: 'Module 3: Canvas Apps (Solution Aware)',
                lessons: [
                    {
                        id: 'l3-1',
                        title: 'Creating an App Inside a Solution',
                        content: `**The Wrong Way:** Home > Create > Blank App.
**The Right Way:** Solution > New > App > Canvas App.

**Exercise:**
1.  Inside your **"Power Platform Bootcamp"** solution, click **New > App > Canvas App**.
2.  **Name:** "Device Ordering App".
3.  **Format:** Tablet.
4.  Click **Create**.

**Connecting Data:**
1.  In the Studio, click the **Data** icon (Cylinder).
2.  Click **Add Data**.
3.  Search for "Device Requests" (The table you created in Module 2).
4.  Add it.

*Notice:* The app automatically knows about your table because they are in the same environment and solution context.`,
                        type: 'text'
                    },
                    {
                        id: 'l3-2',
                        title: 'Modern Controls & Responsiveness',
                        content: `**Modern Controls:**
Microsoft is updating the UI. Enable "Modern Controls" in Settings.
Use **Text Input (Modern)** and **Button (Modern)** for a sleeker look.

**Containers (The Layout System):**
Do not drag and drop randomly! Use **Containers**.
1.  **Horizontal Container:** Stacks items left-to-right.
2.  **Vertical Container:** Stacks items top-to-bottom.

**Exercise:**
1.  Add a **Vertical Container** to the screen. Set Width/Height to \`Parent.Width\` / \`Parent.Height\`.
2.  Inside it, add a **Label** ("Header").
3.  Add a **Gallery** connected to \`'Device Requests'\`.
4.  Set the Gallery to "Flexible Height".`,
                        type: 'text'
                    }
                ]
            },
            {
                id: 'm4',
                title: 'Module 4: Power Automate (Logic)',
                lessons: [
                    {
                        id: 'l4-1',
                        title: 'Cloud Flows in Solutions',
                        content: `**Exercise:** Send an email when a request is created.

1.  **Inside your Solution**, click **New > Automation > Cloud Flow > Automated**.
2.  **Trigger:** "When a row is added, modified or deleted" (Dataverse).
    *   *Do NOT use the generic "SharePoint" triggers if possible.*
3.  **Change Type:** Added.
4.  **Table:** Device Requests.
5.  **Scope:** Organization (Runs for everyone).

**Connection References (Crucial):**
When you add an "Outlook - Send Email" action, the Solution creates a **Connection Reference**.
*   This is a "Placeholder".
*   In Dev, it points to *your* email.
*   In Prod, it can point to a *Service Account*.
*   **Benefit:** You don't have to edit the code when moving to Prod!`,
                        type: 'text'
                    },
                    {
                        id: 'l4-2',
                        title: 'Environment Variables',
                        content: `**Scenario:**
You want to send an email to the "IT Manager".
In Dev, that's \`you@demo.com\`.
In Prod, that's \`admin@company.com\`.

**Don't hardcode the email!**
Use **Environment Variables**.

1.  In your Solution, click **New > More > Environment Variable**.
2.  **Name:** \`sd_ITManagerEmail\`.
3.  **Default Value:** \`you@demo.com\`.
4.  **Current Value:** (Leave empty).

**In the Flow:**
Use the dynamic value \`EnvironmentVariable(sd_ITManagerEmail)\`.
When you import to Prod, it will ask you "What is the IT Manager Email for Prod?".`,
                        type: 'text'
                    }
                ]
            },
            {
                id: 'm5',
                title: 'Module 5: Deployment (ALM)',
                lessons: [
                    {
                        id: 'l5-1',
                        title: 'Exporting Your Solution',
                        content: `You built it. Now ship it.

**1. Publish All Customizations:**
Ensures every tiny change is saved. (Solution > Publish All).

**2. Run Solution Checker:**
Microsoft's AI scans your solution for performance bugs. Fix them!

**3. Export:**
*   **Managed:** For Production. (Sealed).
*   **Unmanaged:** For backup or other Dev environments.

**Exercise:**
Export your "Power Platform Bootcamp" solution as **Managed**.
You will get a zip file: \`PowerPlatformBootcamp_1_0_0_0_managed.zip\`.`,
                        type: 'text'
                    },
                    {
                        id: 'l5-2',
                        title: 'Importing to Production',
                        content: `**Exercise (Simulation):**

1.  Switch to your "Default" environment (or a Test environment).
2.  Go to **Solutions > Import Solution**.
3.  Upload your zip file.
4.  **Connection References:** usage will ask "Which Outlook account should I use?". Select one.
5.  **Environment Variables:** It will ask "What is the IT Manager Email?". Enter the real one.

**Magic:**
Your app, flow, and tables are deployed instantly. No rewriting code!`,
                        type: 'text'
                    }
                ]
            },
            {
                id: 'm6',
                title: 'Module 6: Advanced Power Fx',
                lessons: [
                    {
                        id: 'l6-1',
                        title: 'Patch & ForAll',
                        content: `**Patch:**
\`Patch(Table, Record, Update)\`
Precise saving.
Example: \`Patch('Device Requests', Defaults('Device Requests'), {Title: "MacBook", Price: 2000})\`

**ForAll:**
Looping through data.
Example: "Create a request for every item in my cart."
\`ForAll(colCart, Patch('Device Requests', ...))\``,
                        type: 'text'
                    },
                    {
                        id: 'l6-2',
                        title: 'Filter vs Search vs LookUp',
                        content: `**Filter:** Returns a TABLE (Multiple rows).
\`Filter('Device Requests', Price > 1000)\`

**LookUp:** Returns a RECORD (Single row).
\`LookUp('Device Requests', ID = 123)\`

**Search:** Finds text anywhere.
\`Search('Device Requests', "Laptop", "Title", "Description")\`

**Delegation Warning:**
Can Dataverse do this query? Or does the app have to download all data?
*   Dataverse supports Filter/Search well.
*   SharePoint is bad at Search.
*   This is why we use Dataverse!`,
                        type: 'text'
                    }
                ]
            },
            {
                id: 'm7',
                title: 'Module 7: Real World Projects',
                lessons: [
                    {
                        id: 'l7-1',
                        title: 'Project 1: Expense Tracker',
                        content: `**Goal:** Snap receipts and auto-extract info using AI Builder.

**Architecture:**
1.  **Solution:** "Expense Solution"
2.  **Table:** \`sd_Expense\` (Image Column)
3.  **AI Model:** Receipt Processing (Prebuilt).
4.  **Flow:** When Image Uploaded -> Extract Data -> Update Row.`,
                        type: 'text/project'
                    },
                    {
                        id: 'l7-2',
                        title: 'Project 2: Onboarding Portal',
                        content: `**Goal:** A portal for new hires to request access.
**Tech:** Power Pages (External facing) + Dataverse.
*   We won't build this fully today, but know that **Power Pages** sits on top of the SAME Dataverse tables you built in the Solution.`,
                        type: 'text/project'
                    }
                ]
            },
            {
                id: 'm8',
                title: 'Module 8: Certification Path',
                lessons: [
                    {
                        id: 'l8-1',
                        title: 'PL-900 to PL-600',
                        content: `**PL-900 (Fundamentals):** You know this now.
**PL-100 (App Maker):** Retired soon, ignore.
**PL-200 (Functional Consultant):** The "Dataverse & Solutions" exam. **Take this next.**
**PL-400 (Developer):** Coding (C#, TypeScript, PCF Controls).
**PL-600 (Architect):** Governance, Security, ALM.

**Next Step:**
Book your PL-900 exam. You are ready.`,
                        type: 'text'
                    }
                ]
            }
        ]
    }
];
