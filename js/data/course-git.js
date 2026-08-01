/* ASHOVIX LABS — Complete Git & GitHub Course (original educational content) */
(function () {
  const C = {
    paths: [
      { id: "start", name: "Getting Started", level: "Beginner", blurb: "What Git is, install on every OS, first-time config, and your first repository.", color: "#f0b429" },
      { id: "basics", name: "Core Workflows", level: "Beginner", blurb: "Staging, commits, messages, .gitignore, and reading history.", color: "#6aa8ff" },
      { id: "branching", name: "Branching & Merging", level: "Intermediate", blurb: "Branches, merges, conflict resolution, and stash.", color: "#5dde8a" },
      { id: "remotes", name: "Remotes & GitHub", level: "Intermediate", blurb: "SSH/HTTPS, push/pull, clone, and pull requests.", color: "#ff8f70" },
      { id: "pro", name: "Undo & Pro Workflows", level: "Advanced", blurb: "Restore, reset, revert, rebase, tags, and team branching models.", color: "#e8a87c" }
    ],
    modules: [],
    lessons: {},
    labs: []
  };

  const L = (id, data) => { C.lessons[id] = { id, ...data }; };

  C.modules = [
    { id: "gm01", path: "start", title: "Start Here", lessonIds: ["g01", "g02", "g03", "g04"] },
    { id: "gm02", path: "basics", title: "Git Basics", lessonIds: ["g05", "g06", "g07", "g08"] },
    { id: "gm03", path: "branching", title: "Branching", lessonIds: ["g09", "g10", "g11", "g12"] },
    { id: "gm04", path: "remotes", title: "Remotes", lessonIds: ["g13", "g14", "g15", "g16"] },
    { id: "gm05", path: "pro", title: "Undo & Pro", lessonIds: ["g17", "g18", "g19", "g20", "g21", "g22"] }
  ];

  L("g01", {
    path: "start", module: "gm01", title: "What Is Git? Why Version Control?",
    level: "Beginner", duration: "20 min",
    objectives: ["Define version control", "Explain why Git beats manual copies", "Name the three areas of a Git repo"],
    content: `
<p><strong>Git</strong> is a distributed version control system (VCS). It records snapshots of your project over time so you can collaborate, experiment safely, and recover from mistakes.</p>
<h2>Why not just copy folders?</h2>
<ul>
  <li><strong>History</strong> — Git stores every committed snapshot with author, date, and message.</li>
  <li><strong>Branching</strong> — Work on features in isolation without breaking main.</li>
  <li><strong>Collaboration</strong> — Many people merge changes without emailing zip files.</li>
  <li><strong>Accountability</strong> — See who changed what and when.</li>
</ul>
<h2>Distributed vs centralized</h2>
<p>Git is <em>distributed</em>: every clone is a full copy of history. You commit locally, then push to a remote like GitHub. SVN and older tools often required a central server for every operation.</p>
<h2>The three areas</h2>
<ol>
  <li><strong>Working tree</strong> — files on disk you edit right now.</li>
  <li><strong>Staging area (index)</strong> — what you prepare for the next commit.</li>
  <li><strong>Repository (.git)</strong> — committed snapshots stored permanently.</li>
</ol>
<div class="callout"><strong>ASHOVIX LABS rule:</strong> Git tracks <em>content</em>, not just filenames. Two files with the same content may share storage efficiently.</div>
<h2>Verify</h2>
<ul class="verify-list">
  <li>☐ You can explain version control in one sentence.</li>
  <li>☐ You can name working tree, staging, and repository.</li>
  <li>☐ You understand why teams use Git instead of <code>project_final_v3_REAL.zip</code>.</li>
</ul>
`,
    quiz: { q: "Git is best described as:", options: ["A spreadsheet program", "A distributed version control system", "A cloud backup for photos only", "A Linux kernel replacement"], answer: 1 }
  });

  L("g02", {
    path: "start", module: "gm01", title: "Install Git — Windows, Linux & macOS",
    level: "Beginner", duration: "35 min",
    objectives: ["Install Git for Windows with correct options", "Install on Linux and macOS", "Verify with git --version"],
    content: `
<p>Install Git before anything else. These steps are complete — follow every click on Windows.</p>
<h2>Windows — Git for Windows (official installer)</h2>
<ol>
  <li>Open <a href="https://git-scm.com/download/win" target="_blank" rel="noopener">https://git-scm.com/download/win</a>.</li>
  <li>Download the latest <strong>64-bit Git for Windows</strong> setup exe.</li>
  <li>Double-click the installer. Click <strong>Yes</strong> if UAC prompts.</li>
  <li><strong>GNU General Public License</strong> → <strong>Next</strong>.</li>
  <li><strong>Select Destination Location</strong> — default <code>C:\\Program Files\\Git</code> → <strong>Next</strong>.</li>
  <li><strong>Select Components</strong> — keep these checked:
    <ul>
      <li>Windows Explorer integration (context menus)</li>
      <li>Git Bash Here / Git GUI Here</li>
      <li>Git LFS (Large File Support)</li>
      <li>Associate .git* configuration files with default text editor</li>
      <li>Associate .sh files to be run with Bash</li>
    </ul>
    Optional: "Check daily for Git for Windows updates" if you want → <strong>Next</strong>.
  </li>
  <li><strong>Select Start Menu Folder</strong> → <strong>Next</strong>.</li>
  <li><strong>Default editor</strong> — VS Code if installed, else Vim → <strong>Next</strong>.</li>
  <li><strong>Initial branch</strong> — <strong>Override: main</strong> → <strong>Next</strong>.</li>
  <li><strong>PATH</strong> — <strong>Git from the command line and also from 3rd-party software</strong> → <strong>Next</strong>.</li>
  <li><strong>HTTPS</strong> — <strong>Use the OpenSSL library</strong> → <strong>Next</strong>.</li>
  <li><strong>Line endings</strong> — <strong>Checkout Windows-style, commit Unix-style</strong> → <strong>Next</strong>.</li>
  <li><strong>Terminal</strong> — <strong>MinTTY</strong> → <strong>Next</strong>.</li>
  <li><strong>git pull</strong> — <strong>Fast-forward or merge</strong> → <strong>Next</strong>.</li>
  <li><strong>Credential helper</strong> — <strong>Git Credential Manager</strong> → <strong>Next</strong>.</li>
  <li><strong>Extra options</strong> — file system caching on → <strong>Next</strong>.</li>
  <li><strong>Experimental</strong> — leave unchecked → <strong>Install</strong> → <strong>Finish</strong>.</li>
</ol>
<h3>Verify on Windows</h3>
<pre><code>git --version</code></pre>
<p>Expected:</p>
<pre><code>git version 2.47.0.windows.1</code></pre>
<h2>Linux — Debian/Ubuntu (apt) step by step</h2>
<ol>
  <li>Update package index:</li>
</ol>
<pre><code>sudo apt update</code></pre>
<p>Expected ends with: <code>Reading package lists... Done</code></p>
<ol start="2">
  <li>Install Git:</li>
</ol>
<pre><code>sudo apt install git -y</code></pre>
<p>Expected includes: <code>Setting up git ...</code></p>
<ol start="3">
  <li>Verify:</li>
</ol>
<pre><code>git --version</code></pre>
<p>Expected:</p>
<pre><code>git version 2.43.0</code></pre>
<h2>Linux — RHEL/CentOS (yum) and Fedora (dnf)</h2>
<ol>
  <li>RHEL/CentOS 7:</li>
</ol>
<pre><code>sudo yum install git -y
git --version</code></pre>
<ol start="2">
  <li>Fedora / RHEL 8+:</li>
</ol>
<pre><code>sudo dnf install git -y
git --version</code></pre>
<h2>macOS step by step</h2>
<ol>
  <li>Install Xcode Command Line Tools (includes Git):</li>
</ol>
<pre><code>xcode-select --install</code></pre>
<p>Click <strong>Install</strong> in the dialog, wait for completion.</p>
<ol start="2">
  <li>Verify built-in Git:</li>
</ol>
<pre><code>git --version</code></pre>
<p>Expected:</p>
<pre><code>git version 2.39.3 (Apple Git-145)</code></pre>
<ol start="3">
  <li>Optional — newer Git via Homebrew:</li>
</ol>
<pre><code>brew install git
git --version</code></pre>
<ul class="verify-list">
  <li>☐ <code>git --version</code> prints a version string (not "command not found").</li>
  <li>☐ On Windows, Git Bash opens without errors.</li>
  <li>☐ You know which terminal you will use daily.</li>
</ul>
`,
    quiz: { q: "Recommended Windows PATH option?", options: ["Git Bash only", "Git from command line and 3rd-party software", "Disable PATH", "WSL only"], answer: 1 }
  });

  L("g03", {
    path: "start", module: "gm01", title: "First-Time Git Configuration",
    level: "Beginner", duration: "25 min",
    objectives: ["Set user.name and user.email", "Set default branch to main", "Understand core.autocrlf"],
    content: `
<p>Git attaches your identity to every commit. Configure once per machine before your first commit.</p>
<h2>Step-by-step: global identity</h2>
<ol>
  <li>Open your terminal (Git Bash on Windows, Terminal on Mac/Linux).</li>
  <li>Set your display name:</li>
</ol>
<pre><code>git config --global user.name "Alex Rivera"</code></pre>
<ol start="3">
  <li>Set email (must match GitHub if you use it):</li>
</ol>
<pre><code>git config --global user.email "alex@example.com"</code></pre>
<ol start="4">
  <li>Set default branch for new repos:</li>
</ol>
<pre><code>git config --global init.defaultBranch main</code></pre>
<ol start="5">
  <li>Set editor (VS Code example):</li>
</ol>
<pre><code>git config --global core.editor "code --wait"</code></pre>
<h2>Line endings — core.autocrlf explained</h2>
<p>Windows uses CRLF (<code>\\r\\n</code>); Linux/macOS use LF (<code>\\n</code>). Wrong settings cause noisy diffs.</p>
<ol>
  <li><strong>Windows</strong> — checkout CRLF, commit LF:</li>
</ol>
<pre><code>git config --global core.autocrlf true</code></pre>
<ol start="2">
  <li><strong>macOS/Linux</strong> — commit LF only, no checkout conversion:</li>
</ol>
<pre><code>git config --global core.autocrlf input</code></pre>
<h2>Verify settings</h2>
<ol>
  <li>List all global config:</li>
</ol>
<pre><code>git config --global --list</code></pre>
<p>Expected (your values):</p>
<pre><code>user.name=Alex Rivera
user.email=alex@example.com
init.defaultbranch=main
core.autocrlf=true
core.editor=code --wait</code></pre>
<ol start="2">
  <li>Read single value:</li>
</ol>
<pre><code>git config --global user.name</code></pre>
<p>Expected:</p>
<pre><code>Alex Rivera</code></pre>
<div class="callout warning"><strong>Important:</strong> Use the same email on GitHub (Settings → Emails) so commits link to your profile.</div>
<ul class="verify-list">
  <li>☐ <code>user.name</code> and <code>user.email</code> are set.</li>
  <li>☐ <code>init.defaultBranch</code> is <code>main</code>.</li>
  <li>☐ <code>core.autocrlf</code> matches your OS.</li>
</ul>
`,
    quiz: { q: "Which sets default branch for new repos?", options: ["user.branch", "init.defaultBranch", "core.main", "remote.origin.main"], answer: 1 }
  });

  L("g04", {
    path: "start", module: "gm01", title: "Create a Repo — init, status & .git Anatomy",
    level: "Beginner", duration: "30 min",
    objectives: ["Create folder", "Run git init", "Read git status", "Understand .git"],
    content: `
<p>Your first repository starts with an empty folder and one command.</p>
<h2>Step-by-step: first repository</h2>
<ol>
  <li>Create a project folder and enter it:</li>
</ol>
<pre><code>mkdir hello-git
cd hello-git</code></pre>
<ol start="2">
  <li>Initialize Git (creates hidden <code>.git</code> directory):</li>
</ol>
<pre><code>git init</code></pre>
<p>Expected:</p>
<pre><code>Initialized empty Git repository in /home/alex/hello-git/.git/</code></pre>
<ol start="3">
  <li>Check status on a clean repo:</li>
</ol>
<pre><code>git status</code></pre>
<p>Expected:</p>
<pre><code>On branch main

No commits yet

nothing to commit (create/copy files and use "git add" to track)</code></pre>
<ol start="4">
  <li>Create README (Git Bash / Mac / Linux):</li>
</ol>
<pre><code>echo "# Hello Git" > README.md</code></pre>
<p>Windows PowerShell:</p>
<pre><code>Set-Content -Path README.md -Value "# Hello Git"</code></pre>
<ol start="5">
  <li>Status again — file is untracked:</li>
</ol>
<pre><code>git status</code></pre>
<p>Expected:</p>
<pre><code>On branch main

No commits yet

Untracked files:
  (use "git add &lt;file&gt;..." to include in what will be committed)
        README.md

nothing added to commit but untracked files present (use "git add" to track)</code></pre>
<h2>Anatomy of .git</h2>
<ul>
  <li><code>HEAD</code> — pointer to current branch/commit.</li>
  <li><code>config</code> — repo-specific settings.</li>
  <li><code>objects/</code> — blobs, trees, commits (compressed content).</li>
  <li><code>refs/heads/main</code> — branch tip.</li>
  <li><code>index</code> — staging area.</li>
</ul>
<div class="callout warning"><strong>Never</strong> delete <code>.git</code> unless you intend to destroy all history.</div>
<ul class="verify-list">
  <li>☐ <code>git init</code> succeeded; <code>.git</code> exists.</li>
  <li>☐ <code>git status</code> shows branch <code>main</code>.</li>
  <li>☐ README.md appears as untracked before <code>git add</code>.</li>
</ul>
`,
    quiz: { q: "What does git init create?", options: ["GitHub account", "Hidden .git directory", "Remote origin", "package.json"], answer: 1 }
  });

  L("g05", {
    path: "basics", module: "gm02", title: "Working Tree, Staging & Commit — Full Cycle",
    level: "Beginner", duration: "35 min",
    objectives: ["Stage with git add", "Create commits", "Complete the daily loop"],
    content: `
<p>This is the daily Git loop: edit → stage → commit. Complete every step — do not skip.</p>
<h2>Step-by-step: your first commit</h2>
<ol>
  <li>From <code>hello-git</code> with untracked README.md, stage it:</li>
</ol>
<pre><code>git add README.md</code></pre>
<ol start="2">
  <li>Confirm staged state:</li>
</ol>
<pre><code>git status</code></pre>
<p>Expected:</p>
<pre><code>On branch main

No commits yet

Changes to be committed:
  (use "git rm --cached &lt;file&gt;..." to unstage)
        new file:   README.md</code></pre>
<ol start="3">
  <li>Commit with a message:</li>
</ol>
<pre><code>git commit -m "Add README with project title"</code></pre>
<p>Expected:</p>
<pre><code>[main (root-commit) a1b2c3d] Add README with project title
 1 file changed, 1 insertion(+)
 create mode 100644 README.md</code></pre>
<ol start="4">
  <li>Clean status after commit:</li>
</ol>
<pre><code>git status</code></pre>
<p>Expected:</p>
<pre><code>On branch main
nothing to commit, working tree clean</code></pre>
<ol start="5">
  <li>Edit file and stage all changes:</li>
</ol>
<pre><code>echo "Learning Git step by step." >> README.md
git add .
git status</code></pre>
<p>Expected: <code>modified: README.md</code> under "Changes to be committed".</p>
<ol start="6">
  <li>Second commit:</li>
</ol>
<pre><code>git commit -m "Add learning note to README"
git log --oneline</code></pre>
<p>Expected:</p>
<pre><code>def5678 Add learning note to README
a1b2c3d Add README with project title</code></pre>
<h2>Three states recap</h2>
<ul>
  <li><strong>Modified</strong> — changed in working tree, not staged.</li>
  <li><strong>Staged</strong> — in index, ready for next commit.</li>
  <li><strong>Committed</strong> — safely stored in repository history.</li>
</ul>
<ul class="verify-list">
  <li>☐ You made at least two commits.</li>
  <li>☐ <code>git status</code> is clean after each commit.</li>
  <li>☐ You can explain modified vs staged vs committed.</li>
</ul>
`,
    quiz: { q: "Stage all changes in current directory?", options: ["git stage --all", "git add .", "git commit -a", "git push ."], answer: 1 }
  });

  L("g06", {
    path: "basics", module: "gm02", title: "Commit Messages & git commit --amend",
    level: "Beginner", duration: "25 min",
    objectives: ["Write clear messages", "Use imperative subject", "Amend safely"],
    content: `
<h2>Commit message best practices</h2>
<ul>
  <li><strong>Subject line</strong> — imperative mood, ~50 chars: "Add login form validation".</li>
  <li><strong>Body</strong> — explain <em>why</em>, not just what (wrap at 72 chars).</li>
  <li><strong>One logical change</strong> per commit — easier to review and revert.</li>
</ul>
<h2>Step-by-step: multi-line commit</h2>
<ol>
  <li>Stage a change:</li>
</ol>
<pre><code>git add README.md
git commit</code></pre>
<ol start="2">
  <li>In the editor, type:</li>
</ol>
<pre><code>Add installation section to README

Document Node.js 20+ requirement so new contributors
do not hit version errors on first run.</code></pre>
<ol start="3">
  <li>Save and close. View last commit:</li>
</ol>
<pre><code>git log -1 --pretty=format:"%s%n%n%b"</code></pre>
<h2>Amend the last commit (unpushed only)</h2>
<ol>
  <li>Fix typo in last message:</li>
</ol>
<pre><code>git commit --amend -m "Add installation section to README"</code></pre>
<ol start="2">
  <li>Add forgotten file to last commit:</li>
</ol>
<pre><code>git add forgotten.txt
git commit --amend --no-edit</code></pre>
<div class="callout warning"><strong>Never amend</strong> commits already pushed to a shared branch without team agreement — it rewrites history.</div>
<ul class="verify-list">
  <li>☐ Last commit has a clear subject line.</li>
  <li>☐ You tried <code>git commit --amend</code> on an unpushed commit.</li>
  <li>☐ You know when amend is unsafe (after push to shared branch).</li>
</ul>
`,
    quiz: { q: "When is amend unsafe?", options: ["Before any commits", "After push to shared branch", "On empty repo", "Changing email"], answer: 1 }
  });

  L("g07", {
    path: "basics", module: "gm02", title: ".gitignore — Patterns Step by Step",
    level: "Beginner", duration: "30 min",
    objectives: ["Create .gitignore", "Use glob patterns", "Exclude secrets and builds"],
    content: `
<p><code>.gitignore</code> tells Git which files to never track. Critical for <code>node_modules</code>, build output, and <code>.env</code>.</p>
<h2>Step-by-step</h2>
<ol>
  <li>Create <code>.gitignore</code> in repo root with this content:</li>
</ol>
<pre><code># Dependencies
node_modules/

# Build output
dist/
build/
*.o

# Environment secrets
.env
.env.local

# OS junk
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*</code></pre>
<ol start="2">
  <li>Create test files that should be ignored:</li>
</ol>
<pre><code>mkdir dist
echo "compiled" > dist/app.js
echo "SECRET=abc" > .env</code></pre>
<ol start="3">
  <li>Check status — ignored files should NOT appear:</li>
</ol>
<pre><code>git status</code></pre>
<p>Expected: <code>.gitignore</code> may show as untracked; <code>dist/</code> and <code>.env</code> should NOT appear.</p>
<ol start="4">
  <li>Stage and commit .gitignore:</li>
</ol>
<pre><code>git add .gitignore
git commit -m "Add .gitignore for Node build artifacts and secrets"</code></pre>
<h2>Pattern cheat sheet</h2>
<ul>
  <li><code>*.log</code> — all .log files in any folder.</li>
  <li><code>/tmp/</code> — only tmp at repo root.</li>
  <li><code>**/cache/</code> — cache folders anywhere.</li>
  <li><code>!important.log</code> — exception to a rule above.</li>
</ul>
<ul class="verify-list">
  <li>☐ <code>.env</code> and <code>dist/</code> are ignored.</li>
  <li>☐ <code>.gitignore</code> is committed.</li>
  <li>☐ You never committed a real API key.</li>
</ul>
`,
    quiz: { q: "File committed before .gitignore?", options: ["Auto untracked", "Still tracked until git rm --cached", "Deleted from disk", "Read-only"], answer: 1 }
  });

  L("g08", {
    path: "basics", module: "gm02", title: "git log, git diff & git show",
    level: "Beginner", duration: "30 min",
    objectives: ["Read history", "Compare changes", "Inspect one commit"],
    content: `
<h2>git log — history</h2>
<ol>
  <li>One-line log:</li>
</ol>
<pre><code>git log --oneline</code></pre>
<p>Expected:</p>
<pre><code>def5678 Add learning note to README
a1b2c3d Add README with project title</code></pre>
<ol start="2">
  <li>Graph with branches:</li>
</ol>
<pre><code>git log --oneline --graph --all --decorate</code></pre>
<h2>git diff — changes</h2>
<ol>
  <li>Unstaged changes (working tree vs index):</li>
</ol>
<pre><code>echo "more text" >> README.md
git diff</code></pre>
<p>Shows lines removed (-) and added (+).</p>
<ol start="2">
  <li>Staged changes (index vs last commit):</li>
</ol>
<pre><code>git add README.md
git diff --staged</code></pre>
<ol start="3">
  <li>Compare two commits:</li>
</ol>
<pre><code>git diff HEAD~1 HEAD</code></pre>
<h2>git show — one commit</h2>
<pre><code>git show HEAD
git show a1b2c3d --stat</code></pre>
<ul class="verify-list">
  <li>☐ <code>git log --oneline</code> lists commits newest first.</li>
  <li>☐ <code>git diff</code> shows unstaged edits.</li>
  <li>☐ <code>git show</code> displays commit message and patch.</li>
</ul>
`,
    quiz: { q: "Show staged changes?", options: ["git diff", "git diff --staged", "git log -p --staged", "git status --diff"], answer: 1 }
  });

  L("g09", {
    path: "branching", module: "gm03", title: "Create, Switch & List Branches",
    level: "Intermediate", duration: "30 min",
    objectives: ["Create branches", "Switch with checkout or switch", "List local and remote branches"],
    content: `
<h2>Step-by-step: feature branch</h2>
<ol>
  <li>Confirm you are on <code>main</code>:</li>
</ol>
<pre><code>git branch</code></pre>
<p>Expected (asterisk shows current branch):</p>
<pre><code>* main</code></pre>
<ol start="2">
  <li>Create and switch to a feature branch (modern syntax):</li>
</ol>
<pre><code>git switch -c feature/login</code></pre>
<p>Expected:</p>
<pre><code>Switched to a new branch 'feature/login'</code></pre>
<ol start="3">
  <li>Make a commit on the branch:</li>
</ol>
<pre><code>echo "login form" > login.txt
git add login.txt
git commit -m "Add login form scaffold"</code></pre>
<ol start="4">
  <li>List branches:</li>
</ol>
<pre><code>git branch -v</code></pre>
<p>Expected:</p>
<pre><code>  main
* feature/login  b2c3d4e Add login form scaffold</code></pre>
<ol start="5">
  <li>Switch back to main:</li>
</ol>
<pre><code>git switch main</code></pre>
<p>Expected: <code>login.txt</code> disappears from working tree (it only exists on feature branch).</p>
<ol start="6">
  <li>Classic syntax (still common):</li>
</ol>
<pre><code>git checkout -b feature/signup
git checkout main</code></pre>
<ul class="verify-list">
  <li>☐ Created branch with <code>git switch -c</code>.</li>
  <li>☐ <code>git branch</code> shows current branch with *.</li>
  <li>☐ Files on feature branch are absent on main after switch.</li>
</ul>
`,
    quiz: { q: "Create and switch to new branch?", options: ["git branch new && git go new", "git switch -c feature/x", "git remote add branch", "git init feature"], answer: 1 }
  });

  L("g10", {
    path: "branching", module: "gm03", title: "Merge — Fast-Forward vs 3-Way",
    level: "Intermediate", duration: "35 min",
    objectives: ["Perform fast-forward merge", "Perform 3-way merge", "Read merge output"],
    content: `
<h2>Fast-forward merge</h2>
<p>When <code>main</code> has no new commits since the branch diverged, Git moves the pointer forward.</p>
<ol>
  <li>On <code>feature/login</code> with one commit, switch to main and merge:</li>
</ol>
<pre><code>git switch main
git merge feature/login</code></pre>
<p>Expected (fast-forward):</p>
<pre><code>Updating a1b2c3d..b2c3d4e
Fast-forward
 login.txt | 1 +
 1 file changed, 1 insertion(+)
 create mode 100644 login.txt</code></pre>
<h2>3-way merge</h2>
<ol>
  <li>Create branch and commit:</li>
</ol>
<pre><code>git switch -c feature/footer
echo "footer" > footer.txt
git add footer.txt && git commit -m "Add footer"</code></pre>
<ol start="2">
  <li>On main, make a different commit:</li>
</ol>
<pre><code>git switch main
echo "header" > header.txt
git add header.txt && git commit -m "Add header"</code></pre>
<ol start="3">
  <li>Merge feature into main (3-way):</li>
</ol>
<pre><code>git merge feature/footer</code></pre>
<p>Expected:</p>
<pre><code>Merge made by the 'ort' strategy.
 footer.txt | 1 +
 1 file changed, 1 insertion(+)</code></pre>
<pre><code>git log --oneline --graph -5</code></pre>
<p>Shows a merge commit with two parents.</p>
<ul class="verify-list">
  <li>☐ You saw "Fast-forward" at least once.</li>
  <li>☐ You saw "Merge made by the 'ort' strategy".</li>
  <li>☐ Graph shows merge commit with two parents.</li>
</ul>
`,
    quiz: { q: "Fast-forward merge happens when:", options: ["Branches diverged with commits on both", "Target branch has no new commits since branch point", "You use --no-ff always", "Remote rejects push"], answer: 1 }
  });

  L("g11", {
    path: "branching", module: "gm03", title: "Resolve Merge Conflicts — File by File",
    level: "Intermediate", duration: "40 min",
    objectives: ["Trigger a conflict", "Edit conflict markers", "Complete the merge"],
    content: `
<h2>Step-by-step: intentional conflict</h2>
<ol>
  <li>On main, create <code>app.txt</code> with one line:</li>
</ol>
<pre><code>git switch main
echo "version 1" > app.txt
git add app.txt && git commit -m "Add app.txt v1"</code></pre>
<ol start="2">
  <li>Branch and change same line:</li>
</ol>
<pre><code>git switch -c feature/a
echo "version A" > app.txt
git add app.txt && git commit -m "Change to version A"</code></pre>
<ol start="3">
  <li>On main, change same line differently:</li>
</ol>
<pre><code>git switch main
echo "version B" > app.txt
git add app.txt && git commit -m "Change to version B"</code></pre>
<ol start="4">
  <li>Merge and get conflict:</li>
</ol>
<pre><code>git merge feature/a</code></pre>
<p>Expected:</p>
<pre><code>Auto-merging app.txt
CONFLICT (content): Merge conflict in app.txt
Automatic merge failed; fix conflicts and then commit the result.</code></pre>
<ol start="5">
  <li>Open <code>app.txt</code> — you'll see markers:</li>
</ol>
<pre><code>&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD
version B
=======
version A
&gt;&gt;&gt;&gt;&gt;&gt;&gt; feature/a</code></pre>
<ol start="6">
  <li>Edit to final content (pick one or combine), remove markers:</li>
</ol>
<pre><code>version merged</code></pre>
<ol start="7">
  <li>Stage resolved file and complete merge:</li>
</ol>
<pre><code>git add app.txt
git status</code></pre>
<p>Expected: <code>All conflicts fixed but you are still merging.</code></p>
<pre><code>git commit -m "Merge feature/a resolving app.txt conflict"</code></pre>
<ul class="verify-list">
  <li>☐ You resolved conflict markers manually.</li>
  <li>☐ <code>git status</code> clean after merge commit.</li>
  <li>☐ <code>app.txt</code> has intended final text only.</li>
</ul>
`,
    quiz: { q: "After fixing conflict markers you must:", options: ["git merge --abort only", "git add the file then git commit", "Delete .git folder", "git push --force"], answer: 1 }
  });

  L("g12", {
    path: "branching", module: "gm03", title: "Stash — Save Work in Progress",
    level: "Intermediate", duration: "25 min",
    objectives: ["Use git stash", "Apply and pop stashes", "List and drop stashes"],
    content: `
<h2>Step-by-step</h2>
<ol>
  <li>Start dirty working tree on main:</li>
</ol>
<pre><code>echo "wip" >> README.md
git status</code></pre>
<p>Expected: modified README.md, not staged.</p>
<ol start="2">
  <li>Stash changes with message:</li>
</ol>
<pre><code>git stash push -m "WIP readme edits"</code></pre>
<p>Expected:</p>
<pre><code>Saved working directory and index state On main: WIP readme edits</code></pre>
<ol start="3">
  <li>Working tree is clean — switch branches safely:</li>
</ol>
<pre><code>git status
git switch -c hotfix/typo</code></pre>
<ol start="4">
  <li>List stashes:</li>
</ol>
<pre><code>git stash list</code></pre>
<p>Expected:</p>
<pre><code>stash@{0}: On main: WIP readme edits</code></pre>
<ol start="5">
  <li>Return to main and pop stash (apply + remove):</li>
</ol>
<pre><code>git switch main
git stash pop</code></pre>
<p>Expected: changes restored; stash removed from list.</p>
<ol start="6">
  <li>Alternative — apply without removing:</li>
</ol>
<pre><code>git stash apply stash@{0}
git stash drop stash@{0}</code></pre>
<ul class="verify-list">
  <li>☐ Stash saved uncommitted work.</li>
  <li>☐ <code>stash pop</code> restored changes on main.</li>
  <li>☐ <code>git stash list</code> empty after pop.</li>
</ul>
`,
    quiz: { q: "git stash pop does what?", options: ["Deletes all branches", "Applies latest stash and removes it", "Pushes to remote", "Creates a tag"], answer: 1 }
  });

  L("g13", {
    path: "remotes", module: "gm04", title: "GitHub Repo & SSH vs HTTPS Setup",
    level: "Intermediate", duration: "45 min",
    objectives: ["Create GitHub repository", "Generate SSH keys", "Add key to GitHub and test"],
    content: `
<h2>Create GitHub repository</h2>
<ol>
  <li>Log in to <a href="https://github.com" target="_blank" rel="noopener">github.com</a>.</li>
  <li>Click <strong>+</strong> → <strong>New repository</strong>.</li>
  <li>Name: <code>hello-git</code>, visibility Public, <strong>do not</strong> initialize with README (you have local repo).</li>
  <li>Click <strong>Create repository</strong>.</li>
</ol>
<h2>HTTPS vs SSH</h2>
<ul>
  <li><strong>HTTPS</strong> — <code>https://github.com/user/repo.git</code>; uses credential manager / PAT.</li>
  <li><strong>SSH</strong> — <code>git@github.com:user/repo.git</code>; uses key pair, no password each push.</li>
</ul>
<h2>SSH setup — Windows (Git Bash)</h2>
<ol>
  <li>Generate Ed25519 key:</li>
</ol>
<pre><code>ssh-keygen -t ed25519 -C "alex@example.com"</code></pre>
<p>Press Enter for default path <code>~/.ssh/id_ed25519</code>, optional passphrase.</p>
<ol start="2">
  <li>Start ssh-agent and add key:</li>
</ol>
<pre><code>eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519</code></pre>
<ol start="3">
  <li>Copy public key:</li>
</ol>
<pre><code>cat ~/.ssh/id_ed25519.pub</code></pre>
<ol start="4">
  <li>GitHub → Settings → SSH and GPG keys → <strong>New SSH key</strong> → paste → Save.</li>
  <li>Test:</li>
</ol>
<pre><code>ssh -T git@github.com</code></pre>
<p>Expected:</p>
<pre><code>Hi username! You've successfully authenticated...</code></pre>
<h2>SSH setup — Linux/macOS</h2>
<pre><code>ssh-keygen -t ed25519 -C "alex@example.com"
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
cat ~/.ssh/id_ed25519.pub
ssh -T git@github.com</code></pre>
<ul class="verify-list">
  <li>☐ GitHub repo created.</li>
  <li>☐ SSH key added to GitHub account.</li>
  <li>☐ <code>ssh -T git@github.com</code> succeeds.</li>
</ul>
`,
    quiz: { q: "SSH remote URL format?", options: ["https://github.com/user/repo", "git@github.com:user/repo.git", "ftp://github.com/repo", "ssh://raw.github.com"], answer: 1 }
  });

  L("g14", {
    path: "remotes", module: "gm04", title: "git remote add & git push -u",
    level: "Intermediate", duration: "30 min",
    objectives: ["Add origin remote", "Push main branch", "Set upstream tracking"],
    content: `
<h2>Step-by-step: first push</h2>
<ol>
  <li>In local <code>hello-git</code>, add remote (replace USER):</li>
</ol>
<pre><code>git remote add origin git@github.com:USER/hello-git.git</code></pre>
<ol start="2">
  <li>Verify remote:</li>
</ol>
<pre><code>git remote -v</code></pre>
<p>Expected:</p>
<pre><code>origin  git@github.com:USER/hello-git.git (fetch)
origin  git@github.com:USER/hello-git.git (push)</code></pre>
<ol start="3">
  <li>Push main and set upstream:</li>
</ol>
<pre><code>git push -u origin main</code></pre>
<p>Expected:</p>
<pre><code>Enumerating objects: 5, done.
...
To github.com:USER/hello-git.git
 * [new branch]      main -> main
branch 'main' set up to track 'origin/main'.</code></pre>
<ol start="4">
  <li>Future pushes (upstream set):</li>
</ol>
<pre><code>git push</code></pre>
<ul class="verify-list">
  <li>☐ <code>git remote -v</code> shows origin.</li>
  <li>☐ Code visible on GitHub in browser.</li>
  <li>☐ <code>git status</code> shows "Your branch is up to date with 'origin/main'".</li>
</ul>
`,
    quiz: { q: "What does push -u origin main do?", options: ["Deletes remote", "Pushes and sets upstream tracking", "Creates SSH key", "Merges all branches"], answer: 1 }
  });

  L("g15", {
    path: "remotes", module: "gm04", title: "Clone, Pull & Fetch",
    level: "Intermediate", duration: "30 min",
    objectives: ["Clone a repository", "Pull remote changes", "Understand fetch vs pull"],
    content: `
<h2>git clone</h2>
<ol>
  <li>Clone to new folder:</li>
</ol>
<pre><code>cd ..
git clone git@github.com:USER/hello-git.git hello-git-clone
cd hello-git-clone
git log --oneline -3</code></pre>
<p>Expected: full history copied; <code>origin</code> remote configured automatically.</p>
<h2>git fetch vs git pull</h2>
<ul>
  <li><code>git fetch</code> — downloads commits, does not merge into your branch.</li>
  <li><code>git pull</code> — <code>fetch</code> + merge (or rebase if configured).</li>
</ul>
<h2>Step-by-step: pull workflow</h2>
<ol>
  <li>On GitHub, edit README in browser and commit.</li>
  <li>In original local repo:</li>
</ol>
<pre><code>git fetch origin
git status</code></pre>
<p>Expected: <code>Your branch is behind 'origin/main' by 1 commit</code></p>
<pre><code>git pull</code></pre>
<p>Expected:</p>
<pre><code>Updating abc1234..def5678
Fast-forward
 README.md | 1 +
 1 file changed, 1 insertion(+)</code></pre>
<ul class="verify-list">
  <li>☐ Clone created working copy with origin.</li>
  <li>☐ fetch showed behind status before pull.</li>
  <li>☐ pull brought remote commit locally.</li>
</ul>
`,
    quiz: { q: "git fetch alone:", options: ["Merges into current branch automatically", "Downloads refs without merging", "Deletes local commits", "Pushes to origin"], answer: 1 }
  });

  L("g16", {
    path: "remotes", module: "gm04", title: "Pull Requests & Merge on GitHub",
    level: "Intermediate", duration: "40 min",
    objectives: ["Push feature branch", "Open a pull request", "Review and merge on GitHub"],
    content: `
<h2>Step-by-step: full PR workflow</h2>
<ol>
  <li>Create feature branch locally:</li>
</ol>
<pre><code>git switch -c feature/docs
echo "## Docs" >> README.md
git add README.md
git commit -m "Add docs section"</code></pre>
<ol start="2">
  <li>Push branch to GitHub:</li>
</ol>
<pre><code>git push -u origin feature/docs</code></pre>
<ol start="3">
  <li>On GitHub repo page, click <strong>Compare & pull request</strong>.</li>
  <li>Title: "Add docs section", description: what changed and why.</li>
  <li>Click <strong>Create pull request</strong>.</li>
  <li>Review the <strong>Files changed</strong> tab.</li>
  <li>Click <strong>Merge pull request</strong> → <strong>Confirm merge</strong>.</li>
  <li>Optionally <strong>Delete branch</strong> on GitHub.</li>
  <li>Update local main:</li>
</ol>
<pre><code>git switch main
git pull
git branch -d feature/docs</code></pre>
<p>Expected after pull: docs section in README locally.</p>
<ul class="verify-list">
  <li>☐ PR opened from feature branch to main.</li>
  <li>☐ PR merged on GitHub.</li>
  <li>☐ Local main updated with <code>git pull</code>.</li>
</ul>
`,
    quiz: { q: "After merging PR on GitHub, locally you should:", options: ["git push --force main", "git switch main && git pull", "Delete .git", "git init again"], answer: 1 }
  });

  L("g17", {
    path: "pro", module: "gm05", title: "git restore & git checkout — Discard Changes",
    level: "Advanced", duration: "30 min",
    objectives: ["Discard unstaged changes", "Unstage files", "Restore files from commits"],
    content: `
<h2>Discard unstaged changes (modern)</h2>
<ol>
  <li>Edit a tracked file:</li>
</ol>
<pre><code>echo "mistake" >> README.md
git status</code></pre>
<ol start="2">
  <li>Restore working tree from last commit:</li>
</ol>
<pre><code>git restore README.md
git status</code></pre>
<p>Expected: <code>nothing to commit, working tree clean</code></p>
<h2>Unstage a file</h2>
<pre><code>echo "test" >> README.md
git add README.md
git restore --staged README.md
git status</code></pre>
<p>Expected: modified but not staged.</p>
<h2>Restore from specific commit</h2>
<pre><code>git restore --source=HEAD~1 README.md</code></pre>
<div class="callout warning"><code>git restore</code> is destructive for uncommitted work — double-check before running.</div>
<ul class="verify-list">
  <li>☐ Restored file discarded local edits.</li>
  <li>☐ <code>--staged</code> unstaged without losing working copy edits.</li>
</ul>
`,
    quiz: { q: "Discard unstaged changes to README.md?", options: ["git delete README.md", "git restore README.md", "git push --force", "git stash drop"], answer: 1 }
  });

  L("g18", {
    path: "pro", module: "gm05", title: "git reset — Soft, Mixed & Hard",
    level: "Advanced", duration: "35 min",
    objectives: ["Understand reset modes", "Use soft for recommit", "Know when hard is dangerous"],
    content: `
<h2>Three reset modes</h2>
<ul>
  <li><strong>--soft</strong> — move HEAD only; staging and working tree unchanged.</li>
  <li><strong>--mixed</strong> (default) — move HEAD, unstage; working tree unchanged.</li>
  <li><strong>--hard</strong> — move HEAD, unstage, discard working tree. Dangerous.</li>
</ul>
<h2>Step-by-step: soft reset (squash last 2 commits locally)</h2>
<pre><code>git log --oneline -3
git reset --soft HEAD~2
git status</code></pre>
<p>Expected: all changes from 2 commits still staged.</p>
<pre><code>git commit -m "Combined: single commit for both changes"</code></pre>
<h2>Mixed reset (unstage last commit, keep files)</h2>
<pre><code>git reset HEAD~1
git status</code></pre>
<p>Expected: changes present, not staged.</p>
<h2>Hard reset (destructive demo on throwaway branch)</h2>
<pre><code>git switch -c reset-demo
echo "x" > temp.txt && git add temp.txt && git commit -m "temp"
git reset --hard HEAD~1
ls temp.txt</code></pre>
<p>Expected: <code>temp.txt</code> gone.</p>
<div class="callout warning">Never <code>reset --hard</code> on shared branches that others pulled.</div>
<ul class="verify-list">
  <li>☐ You tried soft reset and recommitted.</li>
  <li>☐ You understand mixed vs hard difference.</li>
</ul>
`,
    quiz: { q: "git reset --hard HEAD~1:", options: ["Only moves branch pointer", "Discards commits and working tree changes", "Creates a new branch", "Pushes to remote"], answer: 1 }
  });

  L("g19", {
    path: "pro", module: "gm05", title: "git revert — Safe Undo on Shared History",
    level: "Advanced", duration: "25 min",
    objectives: ["Revert a bad commit", "Understand revert vs reset", "Push reverts safely"],
    content: `
<p><code>git revert</code> creates a <em>new</em> commit that undoes a previous one — safe for shared branches.</p>
<h2>Step-by-step</h2>
<ol>
  <li>Make a commit to undo:</li>
</ol>
<pre><code>echo "bad feature" > bad.txt
git add bad.txt && git commit -m "Add bad feature"</code></pre>
<ol start="2">
  <li>Revert it:</li>
</ol>
<pre><code>git revert HEAD --no-edit</code></pre>
<p>Expected:</p>
<pre><code>[main abc1234] Revert "Add bad feature"
 1 file changed, 1 deletion(-)</code></pre>
<ol start="3">
  <li>History still shows original commit plus revert:</li>
</ol>
<pre><code>git log --oneline -3</code></pre>
<pre><code>git push</code></pre>
<ul class="verify-list">
  <li>☐ Revert commit created without rewriting history.</li>
  <li>☐ <code>bad.txt</code> removed from working tree.</li>
  <li>☐ Safe to push after revert.</li>
</ul>
`,
    quiz: { q: "On shared main, undo a pushed commit safely with:", options: ["git reset --hard", "git revert", "Delete remote", "rm -rf .git"], answer: 1 }
  });

  L("g20", {
    path: "pro", module: "gm05", title: "Interactive Rebase Basics",
    level: "Advanced", duration: "40 min",
    objectives: ["Squash commits interactively", "Reword commit messages", "Know rebase golden rule"],
    content: `
<div class="callout warning"><strong>Golden rule:</strong> Do not rebase commits that exist on a shared remote others use.</div>
<h2>Step-by-step: squash 3 commits into 1</h2>
<ol>
  <li>Create 3 small commits on a local branch:</li>
</ol>
<pre><code>git switch -c cleanup/demo
echo "a" > f1.txt && git add f1.txt && git commit -m "wip 1"
echo "b" > f2.txt && git add f2.txt && git commit -m "wip 2"
echo "c" > f3.txt && git add f3.txt && git commit -m "wip 3"
git log --oneline -3</code></pre>
<ol start="2">
  <li>Interactive rebase last 3 commits:</li>
</ol>
<pre><code>git rebase -i HEAD~3</code></pre>
<p>Editor opens. Change to:</p>
<pre><code>pick abc1111 wip 1
squash def2222 wip 2
squash ghi3333 wip 3</code></pre>
<ol start="3">
  <li>Save and close. Edit combined commit message.</li>
  <li>Verify:</li>
</ol>
<pre><code>git log --oneline -3</code></pre>
<p>Expected: one commit with all three files.</p>
<ul class="verify-list">
  <li>☐ Squashed 3 commits into 1 locally.</li>
  <li>☐ You know not to rebase shared history.</li>
</ul>
`,
    quiz: { q: "Interactive rebase -i is used to:", options: ["Clone repos", "Reorder/squash/edit commits", "Generate SSH keys", "Create GitHub account"], answer: 1 }
  });

  L("g21", {
    path: "pro", module: "gm05", title: "Tags, Releases & Cherry-Pick",
    level: "Advanced", duration: "35 min",
    objectives: ["Create annotated tags", "Publish GitHub releases", "Cherry-pick a commit"],
    content: `
<h2>Annotated tags</h2>
<pre><code>git tag -a v1.0.0 -m "First stable release"
git tag -l
git show v1.0.0
git push origin v1.0.0</code></pre>
<p>On GitHub: Releases → Draft new release → choose tag <code>v1.0.0</code> → Publish.</p>
<h2>Cherry-pick</h2>
<ol>
  <li>On feature branch, make a fix commit:</li>
</ol>
<pre><code>git switch -c hotfix/patch
echo "fix" > fix.txt && git add fix.txt && git commit -m "Critical fix"
git log --oneline -1</code></pre>
<ol start="2">
  <li>Copy that commit hash, switch to main, cherry-pick:</li>
</ol>
<pre><code>git switch main
git cherry-pick &lt;commit-hash&gt;</code></pre>
<p>Expected: same change applied as new commit on main.</p>
<ul class="verify-list">
  <li>☐ Tag v1.0.0 created and pushed.</li>
  <li>☐ Cherry-pick applied fix to main.</li>
</ul>
`,
    quiz: { q: "Cherry-pick copies:", options: ["Entire branch history", "One specific commit onto current branch", "Remote URL", ".gitignore rules"], answer: 1 }
  });

  L("g22", {
    path: "pro", module: "gm05", title: "Branching Strategies — Git Flow vs Trunk",
    level: "Advanced", duration: "40 min",
    objectives: ["Compare Git Flow and trunk-based", "Follow daily team workflow", "Choose a model for your team"],
    content: `
<h2>Trunk-based development</h2>
<ul>
  <li>Short-lived feature branches (hours/days) merge to <code>main</code> frequently.</li>
  <li>Feature flags hide incomplete work.</li>
  <li>CI runs on every PR; main is always deployable.</li>
</ul>
<h2>Git Flow (classic)</h2>
<ul>
  <li><code>main</code> — production releases only.</li>
  <li><code>develop</code> — integration branch.</li>
  <li><code>feature/*</code> — branch from develop, merge back.</li>
  <li><code>release/*</code> — stabilize before production.</li>
  <li><code>hotfix/*</code> — emergency fixes from main.</li>
</ul>
<h2>Daily team workflow (trunk + PRs)</h2>
<ol>
  <li><code>git switch main && git pull</code></li>
  <li><code>git switch -c feature/ticket-123</code></li>
  <li>Small commits with clear messages.</li>
  <li><code>git push -u origin feature/ticket-123</code></li>
  <li>Open PR, request review, address feedback.</li>
  <li>CI green → merge PR → delete branch.</li>
  <li><code>git switch main && git pull</code> again.</li>
</ol>
<div class="callout"><strong>Recommendation:</strong> Most modern teams use trunk-based + PRs. Git Flow fits scheduled releases and multiple versions in the field.</div>
<ul class="verify-list">
  <li>☐ You can explain trunk-based vs Git Flow.</li>
  <li>☐ You know the daily pull → branch → PR → merge → pull loop.</li>
</ul>
`,
    quiz: { q: "Trunk-based development emphasizes:", options: ["Long-lived branches never merged", "Frequent small merges to main", "No version control", "Only tags on Fridays"], answer: 1 }
  });

  C.labs = [
    { id: "glab01", title: "Install & verify Git", path: "start", lesson: "g02", steps: "Install Git for your OS following every installer screen. Run git --version and confirm output. Open Git Bash or Terminal and run git config --global --list." },
    { id: "glab02", title: "First repository & first commit", path: "start", lesson: "g05", steps: "mkdir hello-git, git init, create README.md, git add, git commit -m with message, git log --oneline. Verify clean status." },
    { id: "glab03", title: ".gitignore in practice", path: "basics", lesson: "g07", steps: "Add .gitignore for node_modules, .env, dist/. Create those paths locally. Confirm git status ignores them. Commit .gitignore only." },
    { id: "glab04", title: "Branch and merge", path: "branching", lesson: "g10", steps: "Create feature branch, commit a file, merge to main with fast-forward. Create second scenario with divergent commits for 3-way merge. Graph with git log --graph." },
    { id: "glab05", title: "Resolve a merge conflict", path: "branching", lesson: "g11", steps: "Edit same line on main and feature branch. Merge, resolve conflict markers in editor, git add, git commit merge." },
    { id: "glab06", title: "SSH keys & GitHub remote", path: "remotes", lesson: "g13", steps: "Generate Ed25519 key, add to GitHub, ssh -T test. Create empty GitHub repo. git remote add origin, git push -u origin main." },
    { id: "glab07", title: "Clone, pull & fetch", path: "remotes", lesson: "g15", steps: "Clone your repo to second folder. Edit on GitHub. In original repo: git fetch, git status shows behind, git pull fast-forward." },
    { id: "glab08", title: "End-to-end pull request", path: "remotes", lesson: "g16", steps: "Push feature branch, open PR on GitHub, review Files changed, merge, delete branch, git pull on local main." },
    { id: "glab09", title: "Undo toolkit: restore, reset, revert", path: "pro", lesson: "g19", steps: "Practice git restore on dirty file. Soft reset and recommit. Revert a pushed-style commit with git revert. Document when each is appropriate." },
    { id: "glab10", title: "Rebase squash & team workflow", path: "pro", lesson: "g22", steps: "Create 3 wip commits on local branch. git rebase -i HEAD~3 squash to one. Write a one-page team workflow doc: trunk vs Git Flow for your project." }
  ];


  window.FORGE.register({
    id: "git",
    order: 3,
    title: "Git & GitHub",
    shortTitle: "Git",
    tagline: "Version control from zero to team workflows",
    level: "Beginner → Advanced",
    accent: "#f0b429",
    description: "Complete Git and GitHub course: install, first commit, branching, remotes, pull requests, undo, rebase, tags, and Git Flow.",
    audience: "Developers, students, and anyone shipping code",
    paths: C.paths,
    modules: C.modules,
    lessons: C.lessons,
    labs: C.labs
  });
})();
