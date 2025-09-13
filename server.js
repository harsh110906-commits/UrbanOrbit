const express = require('express');
const app = express();
const port = 3000;
app.use(express.json()); // Middleware to parse JSON bodies
let issues = [];
app.get('/', (req, res) => {
  res.send('Received GET request.');
});
app.post('/api/report-issue', (req, res) => {
  const newIssue = { id: Date.now(), ...req.body };
  issues.push(newIssue);
  res.status(201).json({ message: 'Issue reported!', issue: newIssue });
});
app.get('/api/issues', (req, res) => {
res.json(issues);
});
app.get('/api/issues/:id', (req, res) => {
  const issue = issues.find(i => i.id == req.params.id);
  if (issue) {
     res.json(issue);
   } else {
     res.status(404).json({ message: 'Issue not found' });
   }
 });
app.listen(port, () => {
  console.log(`Node Server running on http://localhost:${port}`);
});