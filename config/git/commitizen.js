module.exports = {
  // Types of the commits
  types: [
    { value: 'config', name: 'config: Configuration of the project' },
    { value: 'build', name: 'build: Build of the project or change of the dependencies' },
    { value: 'ci', name: 'ci: Setup of the CI' },
    { value: 'docs', name: 'docs: Update of the documentation' },
    { value: 'feat', name: 'feat: Add new functionality' },
    { value: 'fix', name: 'fix: Fix bugs' },
    { value: 'perf', name: 'perf: Changes for better performance' },
    { value: 'refactor', name: 'refactor: Refactoring of the codebase without adding new functionality' },
    { value: 'revert', name: 'revert: Revert previous commits' },
    { value: 'style', name: 'style: Code style changes' },
    { value: 'test', name: 'test: Adding new tests' }
  ],

  // Allow custom scope for commits
  allowCustomScopes: true,

  // Prefix for the footer part
  footerPrefix: 'Meta data:',

  // limit subject length
  subjectLimit: 72
};
