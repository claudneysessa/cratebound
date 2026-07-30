# Security and privacy

## Camera data

Camera access is requested only after an explicit user action. Frames, extracted
features and gesture-training samples are processed in the browser and are not
uploaded to an application server by this project.

TensorFlow.js and MobileNet are loaded from jsDelivr, so the browser makes
network requests for those pinned third-party assets.

## Supported version

Security fixes are applied to the latest version on the default branch.

## Reporting a vulnerability

Please report suspected vulnerabilities privately through
[GitHub's private vulnerability reporting](https://github.com/claudneysessa/cratebound/security/advisories/new).
Include reproduction steps, affected browsers and the potential impact. Avoid
opening a public issue before the report has been reviewed.
