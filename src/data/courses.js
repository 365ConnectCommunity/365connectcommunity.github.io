export const courses = [
    {
        id: 'power-platform-basics',
        title: 'Ultimate Power Platform Masterclass: From Zero to Hero',
        description: 'The definitive guide for non-coders. Master Power Apps, Automate, Dataverse, and Copilot. Start your tech career here.',
        duration: '8 Weeks',
        level: 'Beginner (Non-IT Friendly)',
        image: '/assets/images/power-platform-course.jpg', // Ensure this image exists, or uses a placeholder
        modules: [
            {
                id: 'm1',
                title: 'Module 1: The Digital Revolution & Low-Code',
                lessons: [
                    {
                        id: 'l1-1',
                        title: 'Welcome: You Don\'t Need to Be a Coder',
                        content: `**Welcome to your new career path!**
If you think "app development" requires a computer science degree and staring at green text on a black screen, think again.

**What is Low-Code?**
Imagine building a LEGO set. You don't manufacture the plastic bricks; you just snap them together to build a castle.
* **Traditional Coding:** Manufacturing the bricks (C#, Java, Python).
* **Low-Code:** Snapping the bricks together (Power Platform).

Microsoft Power Platform allows **you** (yes, you!) to build professional apps, automate boring emails, and analyze data just by dragging and dropping.

**Who is this for?**
* **The "Accidental Developer":** You used Excel so much you broke it.
* **The Career Switcher:** You want a high-paying tech job without 4 years of college.
* **The Business Pro:** You know your business better than IT does.

[Watch: What is Low Code?](https://www.youtube.com/watch?v=48K6vH5i_O4)`,
                        type: 'text'
                    },
                    {
                        id: 'l1-2',
                        title: 'The "Power" Family Explained',
                        content: `The Power Platform isn't one thing; it's a team of superheroes. Here is your roster:

1.  **Power Apps (The Builder):**
    *   *Analogy:* Like PowerPoint, but for apps.
    *   *Usage:* Build a "Leave Request" app for your phone.

2.  **Power Automate (The Robot):**
    *   *Analogy:* A digital assistant that never sleeps.
    *   *Usage:* "When I get an email from my Boss, text me immediately."

3.  **Power BI (The Vizualizer):**
    *   *Analogy:* Excel charts on steroids.
    *   *Usage:* Show a live dashboard of sales this month.

4.  **Power Pages (The Website):**
    *   *Analogy:* Wix or Squarespace, but connected to your business data.
    *   *Usage:* A portal for customers to submit support tickets.

5.  **Copilot Studio (The Brain):**
    *   *Analogy:* A smart chatbot (like ChatGPT) for your company.
    *   *Usage:* An HR bot that answers "How many holidays do I have left?"

**Key Term:**
*   **SaaS (Software as a Service):** You rent the software over the internet (like Netflix). Power Platform is SaaS.`,
                        type: 'text'
                    }
                ]
            },
            {
                id: 'm2',
                title: 'Module 2: Data - The Lifeblood of Apps',
                lessons: [
                    {
                        id: 'l2-1',
                        title: 'Why Excel is NOT a Database',
                        content: `We all love Excel. But running a business on spreadsheets is dangerous.
*   **The Problem:** What if two people edit the file at once? What if you accidentally delete a row? Security?
*   **The Solution:** A Relational Database.

**Enter: Microsoft Dataverse**
Dataverse is a smart, secure database in the cloud. It doesn't just store text; it understands relationships.
*   *Example:* You have a "Customers" table and an "Orders" table. Dataverse knows that "Order #5" belongs to "John Doe".

**Why use Dataverse?**
1.  **Security:** You can say "Sales people can see data, but only Managers can delete it."
2.  **Logic:** You can set rules like "Price cannot be negative."
3.  **Capacity:** It holds millions of records easily.

[Detailed: What is Dataverse?](https://learn.microsoft.com/en-us/power-apps/maker/data-platform/data-platform-intro)`,
                        type: 'text'
                    },
                    {
                        id: 'l2-2',
                        title: 'Tables, Columns, and Rows',
                        content: `Let's learn the lingo.

1.  **Table (Entity):**
    *   Think of this as a *Sheet* or *Tab* in Excel.
    *   *Example:* "Contacts", "Products".

2.  **Column (Field):**
    *   The specific data you want to capture.
    *   *Types:* Text, Number, Date, Choice (Dropdown), Yes/No.
    *   *Pro Tip:* Always choose the right data type! Don't store dates as text.

3.  **Row (Record):**
    *   One single entry. All the info for *one* customer.

**Exercise:**
Go to [make.powerapps.com](https://make.powerapps.com) > Tables > New Table.
Create a table called "Pet Inventory".
Add columns: "Pet Name" (Text), "Age" (Number), "Type" (Choice: Dog, Cat, Bird).`,
                        type: 'text'
                    }
                ]
            },
            {
                id: 'm3',
                title: 'Module 3: Building Your First App (Canvas)',
                lessons: [
                    {
                        id: 'l3-1',
                        title: 'The Canvas Studio Tour',
                        content: `Welcome to the **Power Apps Studio**. It looks a lot like PowerPoint and Excel had a baby.

**The Interface:**
*   **Left Bar (Tree View):** This is your map. It lists every Screen, Button, and Label in your app.
*   **Center (Canvas):** This is your phone/tablet screen. Drag controls here.
*   **Right Bar (Properties):** Change colors, fonts, sizes, and borders here.
*   **Top Bar (Formula Bar):** The magic happens here. This is where you write logic.

**Controls:**
*   **Label:** Reads text (Read-only).
*   **Text Input:** User types here.
*   **Button:** User clicks this to do something.
*   **Gallery:** Shows a list of items.
*   **Form:** View or Edit a full record.

[Visual Guide to Studio](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/get-started-test-drive)`,
                        type: 'text'
                    },
                    {
                        id: 'l3-2',
                        title: 'Hello World & Variables',
                        content: `Let's make an app that welcomes you.

**Step 1:** Insert a **Text Input**.
*   Name it \`txtUser\`.
*   Remove the "Default" text.
*   Set "HintText" to "Enter your name".

**Step 2:** Insert a **Label**.
*   Set the **Text** property to:
    \`"Hello, " & txtUser.Text & "! Welcome to 365Connect."\`

**What just happened?**
*   **&**: This joins strings together (Concatenation).
*   **txtUser.Text**: This reads live what the user types.

**Variables (The Memory):**
Sometimes you want the app to "remember" something.
*   \`Set(varColor, Red)\` -> Creates a global variable named \`varColor\`.
*   Set a button's \`Fill\` property to \`varColor\`.
*   Now you can change the whole app's color with one click!`,
                        type: 'text'
                    },
                    {
                        id: 'l3-3',
                        title: 'Navigation function',
                        content: `Apps have multiple screens.
**Step 1:** Click "New Screen" > "Blank".
**Step 2:** On Screen1, add a button "Go to Screen 2".
**Step 3:** OnSelect property: \`Navigate(Screen2, ScreenTransition.Cover)\`

**Transitions:**
*   Cover
*   Fade
*   UnCover
*   None

**Pro Tip:** Always name your screens meaningfully (e.g., \`scrHome\`, \`scrDetails\`) instead of Screen1, Screen2.`,
                        type: 'text'
                    }
                ]
            },
            {
                id: 'm4',
                title: 'Module 4: Automating Your Life (Power Automate)',
                lessons: [
                    {
                        id: 'l4-1',
                        title: 'Triggers and Actions',
                        content: `Power Automate is built on a simple concept: **When X happens, Do Y.**

**1. The Trigger (The "When"):**
*   "When an email arrives"
*   "When a new tweet is posted"
*   "Every Monday at 9 AM" (Scheduled)
*   "When I click a button" (Instant)

**2. The Action (The "Do"):**
*   "Send an email"
*   "Create a file in OneDrive"
*   "Post to Teams"
*   "Add a row to Excel"

**Exercise:**
Create a flow that saves your email attachments to OneDrive automatically. Never lose a file again!`,
                        type: 'text'
                    },
                    {
                        id: 'l4-2',
                        title: 'Approvals (The Killer Feature)',
                        content: `The #1 reason companies use Power Automate is **Approvals**.

**Scenario:** You request a vacation.
*   **Old Way:** Email boss. Boss forgets. You email again. Boss replies "Ok". You forward to HR. HR loses email.
*   **New Way:**
    1.  You fill a Power App form.
    2.  Flow triggers "Start an Approval".
    3.  Boss gets a notification on Phone/Teams: "Approve or Reject?".
    4.  Boss clicks "Approve".
    5.  Flow automatically emails HR and updates your calendar.

This saves HOURS of chasing people.`,
                        type: 'text'
                    }
                ]
            },
            {
                id: 'm5',
                title: 'Module 5: Real-World Projects',
                lessons: [
                    {
                        id: 'l5-1',
                        title: 'Project 1: The Expense Tracker',
                        content: `**Scenario:**
Employees need to upload receipts and get manager approval.

**The Solution:**
1.  **Data:** Create a Dataverse table 'Expenses' (Columns: Amount, Date, Category, Receipt Image status).
2.  **App:** Create a Canvas App.
    *   **Screen 1:** Gallery showing my past expenses.
    *   **Screen 2:** Form to add new expense. Use 'Add Picture' control for receipt.
3.  **Automation:**
    *   Trigger: When a row is added to 'Expenses'.
    *   Action: Start an Approval with the user's manager.
    *   Condition: If Approved -> Update Status to 'Paid'. If Rejected -> Email user.

**Key Learning:**
This combines all three pillars: Apps (UI), Data (Storage), and Automate (Logic).`,
                        type: 'text'
                    },
                    {
                        id: 'l5-2',
                        title: 'Project 2: Event Registration',
                        content: `**Scenario:**
We are hosting a workshop and need people to sign up.

**The Solution:**
1.  **Power Page:** Create a public-facing website.
    *   Add a simple form connected to Dataverse table 'Registrations'.
2.  **Power Automate:**
    *   Trigger: When new row in 'Registrations'.
    *   Action: Send an email "Ticket Confirmation" with a QR code.
3.  **Power BI:**
    *   Create a dashboard showing "Total Registrations by Country".

**Pro Tip:**
Use **Power Pages** for external users (people outside your company). Use **Canvas Apps** for internal employees.`,
                        type: 'text'
                    }
                ]
            },
            {
                id: 'm6',
                title: 'Module 6: Career & Certification',
                lessons: [
                    {
                        id: 'l6-1',
                        title: 'The PL-900 Exam',
                        content: `**Microsoft Certified: Power Platform Fundamentals**
This is the "Gold Standard" entry-level exam.

**What is tested?**
*   Describe business value of Power Platform (20-25%)
*   Identify Core Components (10-15%)
*   Demonstrate capabilities of Power BI (10-15%)
*   Demonstrate capabilities of Power Apps (20-25%)
*   Demonstrate capabilities of Power Automate (10-15%)

**How to study?**
1.  Take this course!
2.  Use clear *Microsoft Learn* paths.
3.  Practice creating apps (Hands-on is better than reading).

[Official Exam Page](https://learn.microsoft.com/en-us/credentials/certifications/exams/pl-900/)`,
                        type: 'text'
                    },
                    {
                        id: 'l6-2',
                        title: 'Next Steps: PL-100, PL-200, PL-400',
                        content: `After PL-900, where do you go?

1.  **PL-100 (App Maker):** "I build apps for my team." Focuses heavily on Canvas Apps.
2.  **PL-200 (Functional Consultant):** "I implement solutions for clients." Focuses on Dataverse, Model-Driven Apps, and Solution Architecture.
3.  **PL-400 (Developer):** "I write code." Focuses on JavaScript, C# Plugins, and Azure integration.
4.  **PL-600 (Solution Architect):** "I design the whole system." Top tier.

**Career Advice:**
*   Build a portfolio. Screenshots of apps you built matter more than a CV.
*   Join the *365Connect Community* (You are already here!).
*   Share your learning on LinkedIn.`,
                        type: 'text'
                    }
                ]
            }
        ]
    }
];
