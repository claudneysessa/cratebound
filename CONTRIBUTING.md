# Contributing

Thank you for considering a contribution to **Cratebound**.

## Development workflow

1. Fork the repository and create a focused branch.
2. Add or update the smallest test that describes the desired behavior.
3. Run the test and confirm the expected failure.
4. Implement the minimum change required.
5. Refactor while keeping the suite green.
6. Update the documentation when behavior or decisions change.
7. Add a dated entry to `CHANGELOG.md`.
8. Run the complete validation:

```bash
npm test
```

The commit hook requires relevant project changes to be accompanied by a
changelog update.

## Design constraints

- Keep domain rules independent from the browser and TensorFlow.js.
- Route new input mechanisms through the application session.
- Prefer behavior-focused tests over implementation-detail assertions.
- Apply abstractions only when they clarify a real boundary.
- Keep the modular source and CodePen delivery behaviorally aligned.

## Pull requests

Describe the behavior being addressed, why the approach fits the architecture,
the tests used to validate it and any user-facing or privacy impact.
